import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? ''
const isGitHubActions = process.env.GITHUB_ACTIONS === 'true'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use repo-based base path only during GitHub Pages deploy.
  // Keep "/" for local development.
  base: isGitHubActions && repoName ? `/${repoName}/` : '/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: undefined,
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  },
  preview: {
    open: true,
    strictPort: false
  }
})