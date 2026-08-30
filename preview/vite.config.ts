import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  // Reuse the main project's public/ folder (audio files) instead of duplicating it
  publicDir: path.resolve(__dirname, '../public'),
  build: {
    outDir: 'dist',
  },
}));
