import React from 'react';
import { Composition } from 'remotion';
import { MainVideo, getTotalDurationInFrames } from './MainVideo';
import { FPS } from './data/script';
import { StopHuntHook, TOTAL_DURATION } from './hook/StopHuntHook';

export const Root: React.FC = () => {
  return (
    <>
      <Composition
        id="StopHuntHook"
        component={StopHuntHook}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="MainVideo"
        component={MainVideo}
        durationInFrames={getTotalDurationInFrames()}
        fps={FPS}
        width={1920}
        height={1080}
      />
    </>
  );
};
