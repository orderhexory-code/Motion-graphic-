import React from 'react';
import { useCurrentFrame, interpolate } from 'remotion';

const PARTICLES = new Array(16).fill(0).map((_, i) => ({
  angle: (i / 16) * Math.PI * 2,
  speed: 6 + (i % 4) * 3,
  size: 3 + (i % 3) * 2,
}));

export const ParticleBurst: React.FC<{
  x: number;
  y: number;
  impactFrame: number;
  color?: string;
}> = ({ x, y, impactFrame, color = '#FF1744' }) => {
  const frame = useCurrentFrame();
  const delta = frame - impactFrame;

  if (delta < 0 || delta > 25) return null;

  const opacity = interpolate(delta, [0, 5, 25], [0, 1, 0]);

  return (
    <g>
      {PARTICLES.map((p, i) => {
        const dist = p.speed * delta;
        const px = x + Math.cos(p.angle) * dist;
        const py = y + Math.sin(p.angle) * dist;
        return (
          <circle
            key={i}
            cx={px}
            cy={py}
            r={p.size}
            fill={color}
            opacity={opacity}
          />
        );
      })}
      <circle cx={x} cy={y} r={delta * 8} fill="none" stroke={color} strokeWidth={2} opacity={opacity * 0.6} />
    </g>
  );
};
