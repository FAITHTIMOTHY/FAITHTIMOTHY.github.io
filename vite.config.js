import { resolve } from 'path';
import { defineConfig } from 'vite';
import fs from 'fs';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        notFound: resolve(__dirname, '404.html'),
      },
    },
  },
  plugins: [
    {
      name: 'copy-root-static-files',
      closeBundle() {
        const filesToCopy = [
          'robots.txt',
          'sitemap.xml',
          'favicon.svg',
          'og-preview.png',
          'CV.md',
        ];
        for (const file of filesToCopy) {
          if (fs.existsSync(file)) {
            fs.copyFileSync(file, resolve(__dirname, 'dist', file));
          }
        }
      },
    },
  ],
});
