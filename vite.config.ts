import { defineConfig } from 'vite'

export default defineConfig({
  base: './',
  // Ensure assets are processed
  assetsInclude: ['**/*.png', '**/*.json', '**/*.mp3', '**/*.wav'],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        game: 'game.html',
        tutorial: 'tutorial.html',
        win: 'win.html'
      }
    }
  }
})