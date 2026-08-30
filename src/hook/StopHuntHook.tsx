import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from 'remotion';
import { loadFont as loadInter } from '@remotion/google-fonts/Inter';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { GlassPanel } from './GlassPanel';
import { FilmGrain } from './FilmGrain';
import { ScreenShake } from './ScreenShake';
import { GlitchText } from './GlitchText';
import { ParticleBurst } from './ParticleBurst';
import {
  CandlestickChart,
  CHART_TOTAL_DURATION,
  SWEEP_SHAKE_FRAME,
  getStopLossScreenPoint,
} from './CandlestickChart';

const { fontFamily } = loadInter();

// ---------------------------------------------------------------
// Global timeline (frames @ 30fps)
// ---------------------------------------------------------------
const INTRO1_DUR = 45;
const INTRO2_DUR = 55;
const CHART_START = INTRO1_DUR + INTRO2_DUR; // 100
const CHART_END = CHART_START + CHART_TOTAL_DURATION; // 540
const QUOTE_DUR = 260;
const OUTRO_DUR = 40;

export const TOTAL_DURATION = CHART_END + QUOTE_DUR + OUTRO_DUR; // 840 (~28s)

// Chart-local offsets for overlay text (see CandlestickChart.tsx for the
// matching chart events these are timed against)
const ENTRY_FROM = 130;
const ENTRY_DUR = 60;
const STOP_FROM = 190;
const STOP_DUR = 70;
const AFTERMATH_FROM = 305;
const AFTERMATH_DUR = 55;
const RECOVERY_FROM = 370;
const RECOVERY_DUR = 70;

const CHART_OFFSET_X = 110;
const CHART_OFFSET_Y = 210;

// A simple centered "beat" of text — fade + scale + soft glow
const BeatText: React.FC<{ text: string; size?: number; color?: string }> = ({
  text,
  size = 78,
  color = 'white',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const scale = spring({ frame, fps, config: { damping: 12, stiffness: 160 } });
  const opacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
      <div
        style={{
          fontFamily,
          fontWeight: 800,
          fontSize: size,
          color,
          textAlign: 'center',
          maxWidth: 1400,
          opacity,
          transform: `scale(${scale})`,
          textShadow: '0 0 40px rgba(255,90,54,0.3)',
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};

const LiveTicker: React.FC = () => {
  const frame = useCurrentFrame();
  const pulse = 0.5 + Math.sin(frame / 6) * 0.5;
  return (
    <div style={{ position: 'absolute', top: 60, left: 100 }}>
      <GlassPanel accent="#00D97E">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 5,
              background: '#00D97E',
              opacity: pulse,
              boxShadow: '0 0 10px #00D97E',
            }}
          />
          <span style={{ fontFamily, color: 'white', fontWeight: 700, fontSize: 22 }}>
            NQ1! · 1m
          </span>
        </div>
      </GlassPanel>
    </div>
  );
};

export const StopHuntHook: React.FC = () => {
  const stopPoint = getStopLossScreenPoint();

  return (
    <AbsoluteFill style={{ backgroundColor: '#07070A' }}>
      <AnimatedBackground variant="dark" />
      <Audio src={staticFile('audio/drone.wav')} volume={0.18} loop />

      {/* INTRO 1 */}
      <Sequence from={0} durationInFrames={INTRO1_DUR}>
        <BeatText text="Imagine this." size={90} />
      </Sequence>

      {/* INTRO 2 */}
      <Sequence from={INTRO1_DUR} durationInFrames={INTRO2_DUR}>
        <Audio src={staticFile('audio/whoosh.wav')} volume={0.4} />
        <BeatText text="You open your chart." size={72} />
      </Sequence>

      {/* CHART STAGE */}
      <Sequence from={CHART_START} durationInFrames={CHART_TOTAL_DURATION}>
        <ChartStage stopPoint={stopPoint} />
      </Sequence>

      {/* QUOTE */}
      <Sequence from={CHART_END} durationInFrames={QUOTE_DUR}>
        <QuoteStage />
      </Sequence>

      {/* OUTRO FADE */}
      <Sequence from={CHART_END + QUOTE_DUR} durationInFrames={OUTRO_DUR}>
        <FadeOut />
      </Sequence>

      <FilmGrain opacity={0.045} />
    </AbsoluteFill>
  );
};

const ChartStage: React.FC<{ stopPoint: { x: number; y: number } }> = ({
  stopPoint,
}) => {
  const frame = useCurrentFrame();
  const zoom = interpolate(frame, [0, CHART_TOTAL_DURATION], [1, 1.05]);

  return (
    <ScreenShake impactFrame={SWEEP_SHAKE_FRAME} intensity={16} decayFrames={18}>
      <AbsoluteFill style={{ transform: `scale(${zoom})` }}>
        <LiveTicker />

        <div
          style={{
            position: 'absolute',
            left: CHART_OFFSET_X,
            top: CHART_OFFSET_Y,
          }}
        >
          <CandlestickChart frame={frame} />
          <svg
            width={1700}
            height={700}
            style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}
          >
            <ParticleBurst
              x={stopPoint.x}
              y={stopPoint.y}
              impactFrame={SWEEP_SHAKE_FRAME}
            />
          </svg>
        </div>

        {/* Impact flash */}
        <ImpactFlash impactFrame={SWEEP_SHAKE_FRAME} />
        <Sequence from={SWEEP_SHAKE_FRAME - 2} durationInFrames={20}>
          <Audio src={staticFile('audio/impact.wav')} volume={0.55} />
        </Sequence>

        {/* Entry order ticket */}
        <Sequence from={ENTRY_FROM} durationInFrames={ENTRY_DUR}>
          <OrderTicket
            label="LONG ENTRY"
            sub="Market order"
            accent="#00D97E"
            side="left"
          />
          <BottomCaption text="You enter long..." />
        </Sequence>

        {/* Stop-loss order ticket */}
        <Sequence from={STOP_FROM} durationInFrames={STOP_DUR}>
          <OrderTicket
            label="STOP LOSS SET"
            sub="Below swing low"
            accent="#FF4757"
            side="right"
          />
          <BottomCaption text="...stop loss just below that low." />
        </Sequence>

        {/* Aftermath */}
        <Sequence from={AFTERMATH_FROM} durationInFrames={AFTERMATH_DUR}>
          <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
            <GlitchText text="YOU'RE OUT." glitchFrame={0} />
          </AbsoluteFill>
        </Sequence>

        {/* Recovery */}
        <Sequence from={RECOVERY_FROM} durationInFrames={RECOVERY_DUR}>
          <Audio src={staticFile('audio/whoosh.wav')} volume={0.35} />
          <BottomCaption text="...price immediately shoots back up." accent="#00D97E" />
        </Sequence>
      </AbsoluteFill>
    </ScreenShake>
  );
};

const ImpactFlash: React.FC<{ impactFrame: number }> = ({ impactFrame }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(
    frame,
    [impactFrame - 1, impactFrame, impactFrame + 8],
    [0, 0.55, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  return (
    <AbsoluteFill style={{ backgroundColor: '#FF4757', opacity, pointerEvents: 'none' }} />
  );
};

const OrderTicket: React.FC<{
  label: string;
  sub: string;
  accent: string;
  side: 'left' | 'right';
}> = ({ label, sub, accent, side }) => {
  const frame = useCurrentFrame();
  const slideX = interpolate(frame, [0, 15], [side === 'left' ? -60 : 60, 0], {
    extrapolateRight: 'clamp',
  });
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        top: 140,
        [side]: 100,
        transform: `translateX(${slideX}px)`,
        opacity,
      } as React.CSSProperties}
    >
      <GlassPanel accent={accent}>
        <div style={{ fontFamily, color: accent, fontWeight: 800, fontSize: 24 }}>
          {label}
        </div>
        <div style={{ fontFamily, color: '#ccc', fontWeight: 500, fontSize: 16, marginTop: 2 }}>
          {sub}
        </div>
      </GlassPanel>
    </div>
  );
};

const BottomCaption: React.FC<{ text: string; accent?: string }> = ({
  text,
  accent = 'white',
}) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 12], [0, 1], { extrapolateRight: 'clamp' });
  const y = interpolate(frame, [0, 12], [16, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        bottom: 90,
        left: 0,
        right: 0,
        textAlign: 'center',
        fontFamily,
        fontWeight: 700,
        fontSize: 46,
        color: accent,
        opacity,
        transform: `translateY(${y}px)`,
        textShadow: '0 4px 20px rgba(0,0,0,0.6)',
      }}
    >
      {text}
    </div>
  );
};

const QuoteStage: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1], { extrapolateRight: 'clamp' });
  const scale = interpolate(frame, [0, 20], [0.94, 1], { extrapolateRight: 'clamp' });
  const zoom = interpolate(frame, [0, 260], [1, 1.04]);

  return (
    <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center', transform: `scale(${zoom})` }}>
      <AnimatedBackground variant="dark" />
      <Audio src={staticFile('audio/chime.wav')} volume={0.5} />
      <div style={{ opacity, transform: `scale(${scale})`, maxWidth: 1300 }}>
        <GlassPanel accent="#FF5A36" style={{ padding: '50px 70px' }}>
          <div
            style={{
              fontFamily,
              fontWeight: 800,
              fontSize: 72,
              color: 'white',
              textAlign: 'center',
              lineHeight: 1.3,
              textShadow: '0 0 50px rgba(255,90,54,0.35)',
            }}
          >
            "They hunted my stop."
          </div>
        </GlassPanel>
      </div>
    </AbsoluteFill>
  );
};

const FadeOut: React.FC = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 40], [0, 1], { extrapolateRight: 'clamp' });
  return <AbsoluteFill style={{ backgroundColor: 'black', opacity }} />;
};
