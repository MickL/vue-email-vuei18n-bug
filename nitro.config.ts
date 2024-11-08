import vue from '@vitejs/plugin-vue'

export default defineNitroConfig({
  rollupConfig: {
    plugins: [
      vue()
    ]
  },

  compatibilityDate: '2024-11-08',
});