// main.js - Vue 3
import { createSSRApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import uViewPro, { httpPlugin } from "@/uni_modules/uview-pro"
import themes from '@/common/uview-pro.theme'
import { httpInterceptor, httpRequestConfig } from './common/http.interceptor'

export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()
  
  // 1. 安装 Pinia
  app.use(pinia)
  app.use(uViewPro, { themes, defaultTheme: 'dark', defaultThemeMode: 'dark' })
  
  app.use(httpPlugin, { interceptor: httpInterceptor, config: httpRequestConfig })
  
  return {
    app
  }
}
