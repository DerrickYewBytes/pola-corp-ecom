// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // Modules
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
    '@vueuse/nuxt',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/test-utils',
  ],

  // Runtime config for environment variables
  runtimeConfig: {
    public: {
      apiBaseUrl:
        process.env.NUXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    },
  },

  // App configuration
  app: {
    head: {
      title: 'Pola Corp - Drone Parts',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Specialist supplier of drone components - motors, propellers, flight controllers, batteries, and more.',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  // Build configuration
  build: {
    transpile: ['@headlessui/vue'],
  },

  // Nitro configuration for Vercel deployment
  nitro: {
    preset: 'vercel',
  },

  // TypeScript configuration
  typescript: {
    strict: true,
    typeCheck: true,
  },

  // Auto-imports
  imports: {
    dirs: ['composables/**', 'stores/**'],
  },

  // Tailwind CSS configuration
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  },
});
