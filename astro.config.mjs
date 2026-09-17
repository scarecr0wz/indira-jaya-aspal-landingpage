import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: process.env.SITE_URL ?? 'https://indirajayaaspal.example',
  output: 'static',
  integrations: [sitemap()],
});
