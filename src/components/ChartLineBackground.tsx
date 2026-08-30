import React from 'react';
import { useCurrentFrame } from 'remotion';

// A jagged price-line path, tiled twice so it can scroll infinitely.
const SEGMENT_WIDTH = 1200;
const POINTS = [
  0, 140, 60, 110, 120, 160, 180, 90, 240, 130, 300, 180, 360, 100, 420, 150,
  480, 70, 540, 130, 600, 60, 660, 120, 720, 180, 780, 100, 840, 160, 900, 90,
  960, 140, 1020, 80, 1080, 150, 1140, 110, 1200, 140,
];

const buildPath = (offsetX: number) => {
  let d = '';
  for (let i = 0; i < POINTS.length; i += 2) {
    const x = POINTS[i] + offsetX;
    const y = POINTS[i + 1];
    d += i === 0 ? `M${x},${y}` : ` L${x},${y}`;
  }
  return d;
};

export const ChartLineBackground: React.FC<{ opacity?: number }> = ({
  opacity = 0.1,
}) => {
  const frame = useCurrentFrame();
  const scrollX = -((frame * 1.4) % SEGMENT_WIDTH);

  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 1920 1080"
      style={{ position: 'absolute', top: 0, left: 0, opacity }}
      preserveAspectRatio="xMidYMid slice"
    >
      <g transform={`translate(${scrollX}, 460)`}>
        <path
          d={buildPath(0)}
          fill="none"
          stroke="#FF5A36"
          strokeWidth={3}
        />
        <path
          d={buildPath(SEGMENT_WIDTH)}
          fill="none"
          stroke="#FF5A36"
          strokeWidth={3}
        />
      </g>
    </svg>
  );
};
