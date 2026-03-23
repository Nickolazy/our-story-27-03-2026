import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import github from '@astrojs/github-pages';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://Nickolazy.github.io',
  base: '/our-story-27-03-2026',
  integrations: [react()],
  adapter: github(),
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
    server: {
      host: true,
      allowedHosts: 'all',
      hmr: {
        protocol: 'wss',
        clientPort: 443
      },
      origin: 'https://localhost:4321'
    },
    preview: {
      host: true,
      allowedHosts: 'all'
    }
  }
});
