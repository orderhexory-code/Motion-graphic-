import React from 'react';
import {
  AbsoluteFill,
  Audio,
  staticFile,
  useCurrentFrame,
  interpolate,
} from 'remotion';
import { loadFont } from '@remotion/google-fonts/Kalam';
import { AnimatedBackground } from '../components/AnimatedBackground';

const { fontFamily } = loadFont();

export const QuoteScene: React.FC<{ text: string }> = ({ text }) => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });
  const scale = interpolate(frame, [0, 20], [0.94, 1], {
    extrapolateRight: 'clamp',
  });
  const markOpacity = interpolate(frame, [0, 15], [0, 0.15], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#F4F1EC',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 180px',
      }}
    >
      <AnimatedBackground variant="light" />
      <Audio src={staticFile('audio/chime.wav')} volume={0.4} />

      <div
        style={{
          fontFamily,
          fontWeight: 800,
          fontSize: 260,
          color: '#FF5A36',
          position: 'absolute',
          top: 60,
          left: 120,
          opacity: markOpacity,
          lineHeight: 1,
        }}
      >
        "
      </div>

      <div
        style={{
          fontFamily,
          fontSize: 68,
          fontWeight: 600,
          color: '#1a1a1a',
          textAlign: 'center',
          lineHeight: 1.4,
          opacity,
          transform: `scale(${scale})`,
        }}
      >
        {text}
      </div>
    </AbsoluteFill>
  );
};
