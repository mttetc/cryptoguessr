/// <reference types="vitest" />
/// <reference types="vite/client" />
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from 'tailwindcss';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0', // Change this to a valid IP address if needed
    port: 5173, // Optional otherwise your app will start on default port
  },
  test: {
    setupFiles: ['./setup-vitest.ts'],
    globals: true,
    environment: 'jsdom',
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
  },
});
