// @ts-check
import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'

import netlify from '@astrojs/netlify'

import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      exclude: ['@prisma/client']
    },
    build: {
      rollupOptions: {
        external: ['@prisma/client']
      }
    },
    ssr: {
      external: ['@prisma/client']
    },
    resolve: {
      alias: {
        '.prisma/client/index-browser':
          './node_modules/.prisma/client/index-browser.js'
      }
    }
  },

  adapter: netlify(),
  output: 'server',
  integrations: [react()]
})
