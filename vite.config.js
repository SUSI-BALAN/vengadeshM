import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' keeps asset URLs relative so the built dist works from any
// sub-path (static host, file server, GitHub Pages project site, etc.).
// host: 'localhost' binds both dev and preview to 127.0.0.1 only — the
// project is intentionally NOT exposed on LAN/Wi-Fi network interfaces.
export default defineConfig({
  base: './',
  plugins: [react()],
  server: { host: 'localhost', strictPort: true },
  preview: { host: 'localhost', strictPort: true },
});
