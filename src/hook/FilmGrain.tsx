import React from 'react';
import { AbsoluteFill, useCurrentFrame } from 'remotion';

export const FilmGrain: React.FC<{ opacity?: number }> = ({
  opacity = 0.05,
}) => {
  const frame = useCurrentFrame();
  const seed = frame % 6; // cycles through a few noise seeds for a flicker feel

  return (
    <AbsoluteFill style={{ pointerEvents: 'none', mixBlendMode: 'overlay' }}>
      <svg width="100%" height="100%">
        <filter id={`grain-${seed}`}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="2"
            seed={seed}
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect
          width="100%"
          height="100%"
          filter={`url(#grain-${seed})`}
          opacity={opacity}
        />
      </svg>
    </AbsoluteFill>
  );
};
