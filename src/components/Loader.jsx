// Loading overlay. Visibility is toggled by the BackgroundEngine via the
// `.hidden` class on this element's id — it intentionally holds no React state
// so React never clobbers the engine-driven class.
export default function Loader() {
  return (
    <div id="loader" role="status" aria-label="Loading">
      <div className="ring" aria-hidden="true" />
    </div>
  );
}
