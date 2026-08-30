import React from 'react';
import {
  AbsoluteFill,
  Audio,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
} from 'remotion';
import { loadFont } from '@remotion/google-fonts/Kalam';
import { AnimatedBackground } from '../components/AnimatedBackground';

const { fontFamily } = loadFont();

const UNDERLINE_PATH = 'M10,25 C150,10 470,35 610,15';
const PATH_LENGTH = 640;

export const WhiteboardScene: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 140, mass: 0.6 },
  });

  const opacity = interpolate(frame, [0, 10], [0, 1], {
    extrapolateRight: 'clamp',
  });

  const underlineProgress = interpolate(frame, [12, 32], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const dashoffset = PATH_LENGTH - PATH_LENGTH * underlineProgress;

  // Marker tip position travels roughly along the underline's x-range
  const markerX = 10 + underlineProgress * 600;
  const markerVisible = underlineProgress > 0 && underlineProgress < 1;

  const jitterX = Math.sin(frame / 4) * 1.2;
  const jitterY = Math.cos(frame / 5) * 1.2;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#FAFAF7',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <AnimatedBackground variant="light" />

      <Audio src={staticFile('audio/click.wav')} volume={0.25} />
      <Audio src={staticFile('audio/marker.wav')} volume={0.3} />

      <div
        style={{
          position: 'relative',
          transform: `scale(${scale}) translate(${jitterX}px, ${jitterY}px)`,
          opacity,
        }}
      >
        <div
          style={{
            fontFamily,
            fontSize: 130,
            fontWeight: 700,
            color: '#1a1a1a',
            letterSpacing: 2,
            padding: '0 20px',
          }}
        >
          {text}
        </div>
        <svg
          width="640"
          height="60"
          style={{ position: 'absolute', bottom: -20, left: 0, overflow: 'visible' }}
          viewBox="0 0 640 60"
        >
          <path
            d={UNDERLINE_PATH}
            fill="none"
            stroke="#FF5A36"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={PATH_LENGTH}
            strokeDashoffset={dashoffset}
          />
          {markerVisible && (
            <g transform={`translate(${markerX}, 22)`}>
              <circle r="7" fill="#FF5A36" opacity={0.9} />
              <circle r="14" fill="#FF5A36" opacity={0.2} />
            </g>
          )}
        </svg>
      </div>
    </AbsoluteFill>
  );
};
