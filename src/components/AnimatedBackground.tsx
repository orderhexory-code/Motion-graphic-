import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

const PARTICLE_COUNT = 22;

const particles = new Array(PARTICLE_COUNT).fill(0).map((_, i) => ({
  x: (i * 97) % 100,
  y: (i * 53) % 100,
  size: 2 + (i % 4),
  speed: 0.15 + (i % 5) * 0.06,
  phase: i * 12.3,
}));

export const AnimatedBackground: React.FC<{ variant: 'dark' | 'light' }> = ({
  variant,
}) => {
  const frame = useCurrentFrame();
  const isDark = variant === 'dark';

  return (
    <AbsoluteFill style={{ overflow: 'hidden' }}>
      {/* Moving grid */}
      <AbsoluteFill
        style={{
          backgroundImage: isDark
            ? 'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)'
            : 'linear-gradient(rgba(0,0,0,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.035) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          transform: `translate(${(frame * 0.15) % 64}px, ${(frame * 0.08) % 64}px)`,
        }}
      />

      {/* Floating particles */}
      {particles.map((p, i) => {
        const y = (p.y + frame * p.speed * 0.3) % 110;
        const drift = Math.sin((frame + p.phase) / 40) * 12;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: `${p.x + drift * 0.1}%`,
              top: `${y - 5}%`,
              width: p.size,
              height: p.size,
              borderRadius: '50%',
              backgroundColor: isDark
                ? 'rgba(255,90,54,0.35)'
                : 'rgba(26,26,26,0.15)',
              filter: 'blur(0.5px)',
            }}
          />
        );
      })}

      {/* Vignette */}
      <AbsoluteFill
        style={{
          background: isDark
            ? 'radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.55) 100%)'
            : 'radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(0,0,0,0.08) 100%)',
        }}
      />
    </AbsoluteFill>
  );
};
