import React from 'react';
import { useCurrentFrame } from 'remotion';

export const ScreenShake: React.FC<{
  children: React.ReactNode;
  impactFrame: number;
  intensity?: number;
  decayFrames?: number;
}> = ({ children, impactFrame, intensity = 14, decayFrames = 20 }) => {
  const frame = useCurrentFrame();
  const delta = frame - impactFrame;

  let x = 0;
  let y = 0;

  if (delta >= 0 && delta < decayFrames) {
    const decay = 1 - delta / decayFrames;
    // Pseudo-random but deterministic per-frame jitter
    x = Math.sin(delta * 9.1) * intensity * decay;
    y = Math.cos(delta * 13.7) * intensity * decay;
  }

  return (
    <div style={{ transform: `translate(${x}px, ${y}px)`, width: '100%', height: '100%' }}>
      {children}
    </div>
  );
};
