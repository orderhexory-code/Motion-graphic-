import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
} from 'remotion';
import { loadFont } from '@remotion/google-fonts/Inter';
import { AnimatedBackground } from '../components/AnimatedBackground';
import { ChartLineBackground } from '../components/ChartLineBackground';

const { fontFamily } = loadFont();

export const KineticScene: React.FC<{ text: string; subtext?: string }> = ({
  text,
  subtext,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = text.split(' ');
  const subtextStart = words.length * 4 + 10;

  const angle = interpolate(frame, [0, fps * 6], [0, 60]);

  // Slow camera drift for a premium "handheld zoom" feel
  const zoom = interpolate(frame, [0, 150], [1, 1.045], {
    extrapolateRight: 'clamp',
  });

  const subOpacity = interpolate(
    frame,
    [subtextStart, subtextStart + 15],
    [0, 1],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );
  const subY = interpolate(
    frame,
    [subtextStart, subtextStart + 15],
    [20, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(${angle}deg, #0A0A0B 0%, #17171A 50%, #0A0A0B 100%)`,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        transform: `scale(${zoom})`,
      }}
    >
      <AnimatedBackground variant="dark" />
      <ChartLineBackground opacity={0.08} />

      {/* SFX */}
      <Audio src={staticFile('audio/click.wav')} volume={0.35} />
      {subtext && (
        <Sequence from={subtextStart} durationInFrames={20}>
          <Audio src={staticFile('audio/impact.wav')} volume={0.3} />
        </Sequence>
      )}

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          maxWidth: 1450,
          fontFamily,
          fontWeight: 800,
          fontSize: 88,
          color: 'white',
          textAlign: 'center',
          gap: '0 24px',
          textShadow: '0 0 40px rgba(255,90,54,0.25)',
        }}
      >
        {words.map((word, i) => {
          const start = i * 4;
          const wordOpacity = interpolate(frame, [start, start + 12], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const wordBlur = interpolate(frame, [start, start + 12], [10, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const wordY = interpolate(frame, [start, start + 12], [30, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <span
              key={i}
              style={{
                opacity: wordOpacity,
                filter: `blur(${wordBlur}px)`,
                transform: `translateY(${wordY}px)`,
                display: 'inline-block',
              }}
            >
              {word}
            </span>
          );
        })}
      </div>
      {subtext && (
        <div
          style={{
            fontFamily,
            fontWeight: 500,
            fontSize: 40,
            color: '#FF5A36',
            marginTop: 28,
            opacity: subOpacity,
            transform: `translateY(${subY}px)`,
            textShadow: '0 0 24px rgba(255,90,54,0.5)',
          }}
        >
          {subtext}
        </div>
      )}
    </AbsoluteFill>
  );
};
