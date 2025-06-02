// @ts-check
import { defineConfig } from 'astro/config'

import tailwindcss from '@tailwindcss/vite'

import netlify from '@astrojs/netlify'

import react from '@astrojs/react'

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    ssr: {
      external: ['@prisma/client']
    },
    optimizeDeps: {
      exclude: ['@prisma/client']
    },
    define: {
      global: 'globalThis'
    }
  },

  adapter: netlify(),
  output: 'server',
  integrations: [react()]
})
