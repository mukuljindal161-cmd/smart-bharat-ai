import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor chunks for better caching
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['framer-motion'],
          'vendor-forms': ['react-hook-form', '@hookform/resolvers', 'zod'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
    // Enable source maps for debugging (disable in production for smaller bundle)
    sourcemap: false,
    // Minification options
    minify: 'esbuild',
    // Target modern browsers for smaller bundle size
    target: 'esnext',
  },
  // Enable faster dev server
  server: {
    host: true,
    port: 5173,
  },
});
