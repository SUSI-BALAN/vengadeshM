import { useRef } from 'react';
import { useBackgroundEngine } from '../hooks/useBackgroundEngine';
import { backgrounds } from '../data/content';

// Fixed scroll-animation background: <canvas> + the Frame/Video/Still switcher.
// The canvas engine lives in BackgroundEngine (imperative); this component only
// wires the canvas ref, the switcher UI, and reports the active preset up to App.
export default function Background({ reducedMotion, activeBg, onSwitch }) {
  const canvasRef = useRef(null);
  const setMode = useBackgroundEngine(canvasRef, reducedMotion);

  const handleClick = (id) => {
    setMode(id); // tell the engine to switch presets
    onSwitch(id); // keep React state (button highlight) in sync
  };

  return (
    <>
      <canvas id="stage" ref={canvasRef} aria-hidden="true" />

      <div className="bg-switch" role="group" aria-label="Background style">
        {backgrounds.map((b) => (
          <button
            key={b.id}
            type="button"
            className={'bg-btn' + (activeBg === b.id ? ' active' : '')}
            data-bg={b.id}
            aria-pressed={activeBg === b.id}
            onClick={() => handleClick(b.id)}
          >
            {b.label}
          </button>
        ))}
      </div>
    </>
  );
}
