// BackgroundEngine — imperative canvas engine for the scroll-driven background.
// Framework-agnostic: React only manages its lifecycle (start / destroy).
// This keeps all per-frame state OUT of React render, avoids StrictMode
// double-init hacks, and makes the engine independently testable.
//
// Faithful port of the original inline <script> (frame-sequence scrub,
// Ken Burns zoom, throttled preload, idle + tab hidden pause,
// reduced-motion static render). Only the scroll-driven frame preset is
// retained; the old Frame/Video/Still switcher was removed.

const TOTAL = 300;
const ZOOM_MAX = 0.15; // max zoom reached at page bottom (1.15x)
const START_PLAYBACK_AT = 12; // begin scrubbing after the first dozen frames
const MAX_IN_FLIGHT = 8; // cap concurrent image loads
const FAILSAFE_MS = 8000; // never leave the loader up forever

function base() {
  // Vite injects BASE_URL; './' keeps asset URLs relative for portable builds.
  return import.meta.env.BASE_URL || '/';
}

export default class BackgroundEngine {
  constructor(canvas, { reducedMotion = false } = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.reducedMotion = reducedMotion;

    this.frames = new Array(TOTAL);
    this.loaded = 0;
    this.errors = 0;
    this.inFlight = 0;
    this.queuePos = 0;

    this.current = 0;
    this.currentZoom = 1;
    this.lastDrawn = -1;
    this.running = false;
    this.lastScrollTime = Date.now();

    this.loader = null;
    this.progressBar = null;

    this._raf = 0;
    this._failTimer = 0;

    this._onScroll = this.wake.bind(this);
    this._onVisibility = () => { if (!document.hidden) this.wake(); };
    this._onResize = () => { this.lastDrawn = -1; this.resize(); this.wake(); };
    this._tick = this.tick.bind(this);
  }

  framePath(i) {
    let n = String(i + 1);
    while (n.length < 3) n = '0' + n;
    return base() + 'frames/ezgif-frame-' + n + '.jpg';
  }

  start() {
    this.loader = document.getElementById('loader');
    this.progressBar = document.getElementById('progress');
    this.resize();
    window.addEventListener('resize', this._onResize);
    window.addEventListener('scroll', this._onScroll, { passive: true });
    document.addEventListener('visibilitychange', this._onVisibility);
    this.preload();
    this._failTimer = setTimeout(() => this.hideLoader(), FAILSAFE_MS);
    this.wake();
  }

  destroy() {
    this.running = false;
    if (this._raf) cancelAnimationFrame(this._raf);
    if (this._failTimer) clearTimeout(this._failTimer);
    window.removeEventListener('resize', this._onResize);
    window.removeEventListener('scroll', this._onScroll);
    document.removeEventListener('visibilitychange', this._onVisibility);
  }

  showLoader() { if (this.loader) this.loader.classList.remove('hidden'); }
  hideLoader() { if (this.loader) this.loader.classList.add('hidden'); }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.canvas.width = Math.round(window.innerWidth * dpr);
    this.canvas.height = Math.round(window.innerHeight * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  preload() {
    while (this.inFlight < MAX_IN_FLIGHT && this.queuePos < TOTAL) {
      const idx = this.queuePos;
      this.queuePos++;
      this.inFlight++;
      const img = new Image();
      img.decoding = 'async';
      img.src = this.framePath(idx);
      img.onload = () => {
        this.loaded++;
        this.inFlight--;
        if (this.loaded === START_PLAYBACK_AT) this.hideLoader();
        if (this.loaded === TOTAL) this.hideLoader();
        this.preload();
      };
      img.onerror = () => {
        this.errors++;
        this.inFlight--;
        if (this.loaded + this.errors === TOTAL) this.hideLoader();
        this.preload();
      };
      this.frames[idx] = img;
    }
  }

  draw(img, zoom) {
    if (!img || !img.complete || img.naturalWidth === 0) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    // cover: fill viewport, crop on non-matching aspect (no letterbox bars)
    const scale = Math.max(vw / iw, vh / ih) * (zoom || 1);
    const w = iw * scale;
    const h = ih * scale;
    this.ctx.drawImage(img, (vw - w) / 2, (vh - h) / 2, w, h);
  }

  scrollProgress() {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    if (max <= 0) return 0;
    const p = window.scrollY / max;
    return p < 0 ? 0 : p > 1 ? 1 : p;
  }

  wake() {
    this.lastScrollTime = Date.now();
    if (this.reducedMotion) {
      this.renderStatic();
      return;
    }
    if (!this.running && !document.hidden) {
      this.running = true;
      this._raf = requestAnimationFrame(this._tick);
    }
  }

  renderStatic() {
    const p = this.scrollProgress();
    const idx = Math.round(p * (TOTAL - 1));
    const img = this.frames[idx];
    if (img && img.complete && img.naturalWidth) this.draw(img, 1);
  }

  tick() {
    if (document.hidden) { this.running = false; return; } // pause when tab hidden

    const p = this.scrollProgress();

    // Scroll-driven Ken Burns zoom: 1.0x at top -> (1 + ZOOM_MAX) at bottom
    const zoomTarget = 1 + ZOOM_MAX * p;
    this.currentZoom += (zoomTarget - this.currentZoom) * 0.12;
    if (Math.abs(zoomTarget - this.currentZoom) < 0.001) this.currentZoom = zoomTarget;

    // Eased scrub toward the target frame for the current scroll position.
    const target = p * (TOTAL - 1);
    this.current += (target - this.current) * 0.12;
    if (Math.abs(target - this.current) < 0.01) this.current = target;
    let idx = Math.round(this.current);
    // neighbor-fallback to the closest already-loaded frame
    if (!(this.frames[idx] && this.frames[idx].complete && this.frames[idx].naturalWidth)) {
      for (let off = 1; off < TOTAL; off++) {
        const a = idx - off;
        const b = idx + off;
        if (a >= 0 && this.frames[a] && this.frames[a].complete && this.frames[a].naturalWidth) { idx = a; break; }
        if (b < TOTAL && this.frames[b] && this.frames[b].complete && this.frames[b].naturalWidth) { idx = b; break; }
      }
    }
    this.draw(this.frames[idx], this.currentZoom);
    this.lastDrawn = idx;
    const settled = Math.abs(target - this.current) < 0.01;

    if (this.progressBar) this.progressBar.style.transform = 'scaleX(' + p + ')';

    // Stop once settled and idle (saves CPU/battery)
    if (settled && Math.abs(zoomTarget - this.currentZoom) < 0.001 && Date.now() - this.lastScrollTime > 500) {
      this.running = false;
      return;
    }
    this._raf = requestAnimationFrame(this._tick);
  }
}
