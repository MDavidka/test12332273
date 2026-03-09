import { defineConfig } from 'vite';

export default defineConfig({
  // Configure the build output directory for Cloudflare Pages
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
    target: 'esnext',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
  },
  // Configure the development server
  server: {
    port: 5173,
    strictPort: true,
    open: true,
  },
  // Configure the preview server
  preview: {
    port: 4173,
    strictPort: true,
  },
});