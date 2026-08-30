import React from 'react';
import { createRoot } from 'react-dom/client';
import { Player } from '@remotion/player';
import { StopHuntHook, TOTAL_DURATION } from '../../src/hook/StopHuntHook';

// Makes remotion's staticFile() resolve audio correctly when the Player
// runs outside of Remotion Studio (e.g. on GitHub Pages under a subpath).
(window as any).remotion_staticBase = import.meta.env.BASE_URL.replace(/\/$/, '');

const App: React.FC = () => {
  return (
    <div className="wrap">
      <h1>🎬 Beyond Minds — Stop Hunt Hook (Preview)</h1>
      <div className="player-shell">
        <Player
          component={StopHuntHook}
          durationInFrames={TOTAL_DURATION}
          fps={30}
          compositionWidth={1920}
          compositionHeight={1080}
          controls
          loop
          style={{ width: '100%', height: '100%' }}
        />
      </div>
      <p style={{ color: '#888', fontSize: 13, textAlign: 'center', marginTop: 14 }}>
        Live preview — koi video file download nahi ho rahi. Script/scene edit
        karke push karo, ye page automatically update ho jaayega.
      </p>
    </div>
  );
};

createRoot(document.getElementById('root')!).render(<App />);
