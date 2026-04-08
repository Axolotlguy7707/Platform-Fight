import { defineConfig } from 'vite'

export default defineConfig({
  // Ensure assets are processed
  assetsInclude: ['**/*.png', '**/*.json', '**/*.mp3'],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        game: 'game.html'
      }
    }
  }
})