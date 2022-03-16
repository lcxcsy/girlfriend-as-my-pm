import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // 自动按需引入组件的样式
    styleImport({
      libs: [
        {
          libraryName: 'vant',
          esModule: true,
          resolveStyle: name => `../es/${name}/style/index`
        }
      ]
    })
  ],
  resolve: {
    alias: {
      '@': '/src/'
    }
  },
  css: {
    // global styles
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/index.scss";`
      }
    }
  },
  server: {
    port: 8080,
    proxy: {
      '/trip/api/v1': 'http://localhost:3000'
    }
  }
})
