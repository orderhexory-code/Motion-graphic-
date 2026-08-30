import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';

const { fontFamily } = loadFont();

export const GlitchText: React.FC<{ text: string; glitchFrame?: number }> = ({
  text,
  glitchFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, config: { damping: 10, stiffness: 180 } });
  const opacity = interpolate(frame, [0, 8], [0, 1], { extrapolateRight: 'clamp' });

  const delta = frame - glitchFrame;
  const glitchActive = delta >= 0 && delta < 10;
  const offset = glitchActive ? (10 - delta) * 1.4 : 0;

  const baseStyle: React.CSSProperties = {
    position: 'absolute',
    fontFamily,
    fontWeight: 800,
    fontSize: 110,
    letterSpacing: 2,
  };

  return (
    <div
      style={{
        position: 'relative',
        transform: `scale(${scale})`,
        opacity,
      }}
    >
      <div style={{ ...baseStyle, color: '#00E5FF', transform: `translateX(${-offset}px)`, opacity: glitchActive ? 0.7 : 0 }}>
        {text}
      </div>
      <div style={{ ...baseStyle, color: '#FF1744', transform: `translateX(${offset}px)`, opacity: glitchActive ? 0.7 : 0 }}>
        {text}
      </div>
      <div style={{ ...baseStyle, position: 'relative', color: 'white' }}>{text}</div>
    </div>
  );
};
