import { useRef } from 'react';
import { useBackgroundEngine } from '../hooks/useBackgroundEngine';

// Fixed scroll-driven background: a single <canvas> wired to BackgroundEngine.
// The imperative engine owns all frame-sequence rendering; this component only
// provides the canvas ref and starts the engine on mount.
export default function Background({ reducedMotion }) {
  const canvasRef = useRef(null);
  useBackgroundEngine(canvasRef, reducedMotion);

  return <canvas id="stage" ref={canvasRef} aria-hidden="true" />;
}
