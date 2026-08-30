import React from 'react';
import { AbsoluteFill, Audio, staticFile } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { scenes, FPS } from './data/script';
import { SceneRenderer } from './scenes/SceneRenderer';

const TRANSITION_FRAMES = 14;

export const MainVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#000' }}>
      {/* Ambient background bed, loops under the whole video */}
      <Audio src={staticFile('audio/drone.wav')} volume={0.22} loop />

      <TransitionSeries>
        {scenes.map((scene, i) => (
          <React.Fragment key={i}>
            <TransitionSeries.Sequence
              durationInFrames={Math.round(scene.durationInSeconds * FPS)}
            >
              <SceneRenderer scene={scene} />
            </TransitionSeries.Sequence>
            {i < scenes.length - 1 && (
              <TransitionSeries.Transition
                presentation={fade()}
                timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
              />
            )}
          </React.Fragment>
        ))}
      </TransitionSeries>
    </AbsoluteFill>
  );
};

// Total duration in frames, accounting for the overlap that transitions consume
export const getTotalDurationInFrames = () => {
  const rawTotal = scenes.reduce(
    (sum, scene) => sum + Math.round(scene.durationInSeconds * FPS),
    0
  );
  const overlap = (scenes.length - 1) * TRANSITION_FRAMES;
  return rawTotal - overlap;
};
