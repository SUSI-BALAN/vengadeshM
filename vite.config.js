import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' keeps asset URLs relative so the built dist works from any
// sub-path (static host, file server, GitHub Pages project site, etc.).
export default defineConfig({
  base: './',
  plugins: [react()],
  server: { host: true },
  preview: { host: true },
});
