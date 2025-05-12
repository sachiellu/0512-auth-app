import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  root: './', // 指定根目錄
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src', // 別名設定，讓你的 import 路徑更簡潔
    },
  },
})
