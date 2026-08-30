import React from 'react';
import { Scene } from '../data/script';
import { WhiteboardScene } from './WhiteboardScene';
import { KineticScene } from './KineticScene';
import { TitleScene } from './TitleScene';
import { QuoteScene } from './QuoteScene';

export const SceneRenderer: React.FC<{ scene: Scene }> = ({ scene }) => {
  switch (scene.type) {
    case 'whiteboard':
      return <WhiteboardScene text={scene.text} />;
    case 'kinetic':
      return <KineticScene text={scene.text} subtext={scene.subtext} />;
    case 'title':
      return <TitleScene text={scene.text} subtext={scene.subtext} />;
    case 'quote':
      return <QuoteScene text={scene.text} />;
    default:
      return null;
  }
};
