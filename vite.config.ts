import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true
  },
  server: {
    open: true,
    port: 3000
  },
  preview: {
    port: 8080
  }
});