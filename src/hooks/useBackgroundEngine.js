import { useEffect, useRef } from 'react';
import BackgroundEngine from '../engine/BackgroundEngine';

// Thin React wrapper around the imperative BackgroundEngine.
// React only owns the lifecycle: create + start on mount, destroy on unmount.
// Because destroy() fully tears down listeners / rAF / video, React 18
// StrictMode's mount→unmount→mount is safe (no didInit hack, no double load).
export function useBackgroundEngine(canvasRef, reducedMotion) {
  const engineRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return undefined;
    const engine = new BackgroundEngine(canvasRef.current, { reducedMotion });
    engineRef.current = engine;
    engine.start();
    return () => {
      engine.destroy();
      engineRef.current = null;
    };
  }, [canvasRef, reducedMotion]);

  // Expose a stable setMode for the background switcher pills.
  return (id) => {
    if (engineRef.current) engineRef.current.setMode(id);
  };
}
