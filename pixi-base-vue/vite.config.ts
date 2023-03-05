import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
// https://vitejs.dev/config/
export default defineConfig({
  mode: 'process',
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 将所有带短横线的标签名都视为自定义元素
          isCustomElement: (tag) => tag.includes('-')
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
