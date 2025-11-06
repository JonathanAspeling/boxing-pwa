import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    VitePWA({
      registerType: 'prompt',
      injectRegister: false,
      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: 'Boxing Timer',
        short_name: 'Boxing Timer',
        description: 'A professional boxing timer app for training sessions',
        theme_color: '#18181b', // zinc-900 to match app theme
        background_color: '#09090b', // zinc-950 to match app background
        display: 'fullscreen', // Hide status bar and browser UI
        orientation: 'portrait', // Lock to portrait mode
        start_url: '/',
        scope: '/',
        categories: ['sports', 'fitness', 'health'],
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled: false,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    }),
  ],
  base: '/boxing-pwa',
});
