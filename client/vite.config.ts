import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import istanbul from 'vite-plugin-istanbul'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      react(),
      istanbul({
        cypress: true,
        requireEnv: false,
        extension: ['.ts', '.tsx'],
        include: 'src/*',
      }),
    ],
    build: {
      sourcemap: 'inline',
    },
    base: env['VITE_ASSETS_BASE'],
    test: {
      coverage: {
        reporter: ['html', 'text'],
      },
    },
  }
})
