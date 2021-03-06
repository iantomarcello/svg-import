import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/svg-import.ts',
      formats: ['es', 'umd'],
      name: "SVGImport",
      fileName: (format) => `svg-import.${format}.js`
    },
    rollupOptions: {
      external: /^lit/,
    }
  }
})
