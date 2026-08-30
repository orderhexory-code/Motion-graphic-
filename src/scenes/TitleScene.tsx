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
import { loadFont } from '@remotion/google-fonts/Inter';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { ChartLineBackground } from '../components/ChartLineBackground';

const { fontFamily } = loadFont();

export const TitleScene: React.FC<{ text: string; subtext?: string }> = ({
  text,
  subtext,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 14 } });
  const lineWidth = interpolate(frame, [10, 30], [0, 340], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const subOpacity = interpolate(frame, [25, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const glow = 0.35 + Math.sin(frame / 12) * 0.15;

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#0A0A0B',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <AnimatedBackground variant="dark" />
      <ChartLineBackground opacity={0.1} />
      <Audio src={staticFile('audio/whoosh.wav')} volume={0.45} />

      <div
        style={{
          fontFamily,
          fontWeight: 800,
          fontSize: 96,
          color: 'white',
          letterSpacing: 6,
          transform: `scale(${scale})`,
          textShadow: `0 0 60px rgba(255,90,54,${glow})`,
        }}
      >
        {text}
      </div>
      <div
        style={{
          height: 4,
          width: lineWidth,
          backgroundColor: '#FF5A36',
          marginTop: 24,
          borderRadius: 2,
          boxShadow: '0 0 20px rgba(255,90,54,0.6)',
        }}
      />
      {subtext && (
        <div
          style={{
            fontFamily,
            fontWeight: 400,
            fontSize: 34,
            color: '#B0B0B0',
            marginTop: 24,
            opacity: subOpacity,
          }}
        >
          {subtext}
        </div>
      )}
    </AbsoluteFill>
  );
};
