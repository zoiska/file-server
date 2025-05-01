import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/uploads': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
      '/login': 'http://localhost:5000',
      '/logout': 'http://localhost:5000',
      '/status': 'http://localhost:5000'
    }
  }
});
