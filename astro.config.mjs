import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://nickolazy.github.io',
  base: '/our-story-27-03-2026',
  integrations: [react()],
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
    server: {
      host: true,
      allowedHosts: 'all'
    },
    preview: {
      host: true,
      allowedHosts: 'all'
    }
  }
});
