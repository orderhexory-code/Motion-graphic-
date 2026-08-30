import React from 'react';
import { interpolate } from 'remotion';
import {
  candles,
  SWING_LOW_PRICE,
  STOP_LOSS_PRICE,
  SWEEP_CANDLE_INDEX,
  PRICE_MIN,
  PRICE_MAX,
} from './chartData';

// ---- Timeline constants (all in frames, relative to chart-local frame 0) ----
export const CANDLE_STEP = 10;
export const SWING_LINE_START = 98;
export const SWING_LINE_END = 118;

export const LATE_CANDLE_10 = 140;
export const LATE_CANDLE_11 = 155;

export const STOP_LINE_START = 200;
export const STOP_LINE_END = 220;
export const LATE_CANDLE_12 = 195;
export const LATE_CANDLE_13 = 225;
export const LATE_CANDLE_14 = 250;

export const SWEEP_APPEAR = 260;
export const SWEEP_WICK_START = 265;
export const SWEEP_WICK_END = 295;
export const SWEEP_SHAKE_FRAME = 286; // frame the wick crosses the stop-loss line

export const RECOVERY_16 = 365;
export const RECOVERY_17 = 385;
export const RECOVERY_18 = 405;

export const CHART_TOTAL_DURATION = 440;

// Per-candle appear frame lookup
const appearFrame = (i: number): number => {
  if (i <= 9) return i * CANDLE_STEP;
  if (i === 10) return LATE_CANDLE_10;
  if (i === 11) return LATE_CANDLE_11;
  if (i === 12) return LATE_CANDLE_12;
  if (i === 13) return LATE_CANDLE_13;
  if (i === 14) return LATE_CANDLE_14;
  if (i === SWEEP_CANDLE_INDEX) return SWEEP_APPEAR;
  if (i === 16) return RECOVERY_16;
  if (i === 17) return RECOVERY_17;
  if (i === 18) return RECOVERY_18;
  return i * CANDLE_STEP;
};

const CHART_W = 1700;
const CHART_H = 620;
const CANDLE_W = 46;
const CANDLE_GAP = 44;

const priceToY = (price: number) =>
  interpolate(price, [PRICE_MIN, PRICE_MAX], [CHART_H, 0]);

export const CandlestickChart: React.FC<{ frame: number }> = ({ frame }) => {
  return (
    <svg
      width={CHART_W}
      height={CHART_H + 80}
      viewBox={`0 0 ${CHART_W} ${CHART_H + 80}`}
      style={{ overflow: 'visible' }}
    >
      {/* Swing low dashed line */}
      {frame >= SWING_LINE_START && (
        <SwingLine frame={frame} />
      )}

      {/* Stop-loss dashed line */}
      {frame >= STOP_LINE_START && <StopLine frame={frame} />}

      {/* Candles */}
      {candles.map((c, i) => {
        const af = appearFrame(i);
        if (frame < af) return null;

        const entrance = interpolate(frame, [af, af + 8], [0, 1], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        });

        let low = c.low;
        if (i === SWEEP_CANDLE_INDEX) {
          const shallowLow = c.high - 1; // starts shallow, then wick digs down
          low = interpolate(
            frame,
            [SWEEP_WICK_START, SWEEP_WICK_END],
            [shallowLow, c.low],
            { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
          );
        }

        const isGreen = c.close >= c.open;
        const color = isGreen ? '#00D97E' : '#FF4757';
        const x = i * (CANDLE_W + CANDLE_GAP);
        const bodyTop = priceToY(Math.max(c.open, c.close));
        const bodyBottom = priceToY(Math.min(c.open, c.close));
        const wickTop = priceToY(c.high);
        const wickBottom = priceToY(low);

        return (
          <g key={i} opacity={entrance} transform={`translate(${x}, 0)`}>
            <line
              x1={CANDLE_W / 2}
              x2={CANDLE_W / 2}
              y1={wickTop}
              y2={wickBottom}
              stroke={color}
              strokeWidth={3}
            />
            <rect
              x={0}
              y={bodyTop}
              width={CANDLE_W}
              height={Math.max(4, bodyBottom - bodyTop)}
              fill={color}
              rx={3}
            />
          </g>
        );
      })}
    </svg>
  );
};

const SwingLine: React.FC<{ frame: number }> = ({ frame }) => {
  const progress = interpolate(frame, [SWING_LINE_START, SWING_LINE_END], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = priceToY(SWING_LOW_PRICE);
  const width = CHART_W * progress;
  const labelOpacity = interpolate(frame, [SWING_LINE_END - 5, SWING_LINE_END + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <g>
      <line
        x1={0}
        x2={width}
        y1={y}
        y2={y}
        stroke="#FFD54A"
        strokeWidth={2.5}
        strokeDasharray="10 8"
      />
      <text
        x={12}
        y={y - 12}
        fill="#FFD54A"
        fontSize={22}
        fontFamily="Inter, sans-serif"
        fontWeight={700}
        opacity={labelOpacity}
      >
        SWING LOW
      </text>
    </g>
  );
};

const StopLine: React.FC<{ frame: number }> = ({ frame }) => {
  const progress = interpolate(frame, [STOP_LINE_START, STOP_LINE_END], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const y = priceToY(STOP_LOSS_PRICE);
  const width = CHART_W * progress;
  const labelOpacity = interpolate(frame, [STOP_LINE_END - 5, STOP_LINE_END + 10], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const pulse = 0.6 + Math.sin(frame / 4) * 0.4;

  return (
    <g>
      <line
        x1={0}
        x2={width}
        y1={y}
        y2={y}
        stroke="#FF4757"
        strokeWidth={2.5}
        strokeDasharray="10 8"
        opacity={pulse}
      />
      <text
        x={12}
        y={y + 30}
        fill="#FF4757"
        fontSize={22}
        fontFamily="Inter, sans-serif"
        fontWeight={700}
        opacity={labelOpacity}
      >
        STOP LOSS
      </text>
    </g>
  );
};

// Exported so the parent composition can place the particle burst exactly
// at the point where the wick crosses the stop-loss line.
export const getStopLossScreenPoint = () => {
  const sweepIndex = SWEEP_CANDLE_INDEX;
  const x = sweepIndex * (46 + 44) + 23;
  const y = priceToY(STOP_LOSS_PRICE);
  return { x, y };
};
