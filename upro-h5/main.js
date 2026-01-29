// main.js - Vue 3
import { createSSRApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import uViewPro from 'uview-pro'

export function createApp() {
  const app = createSSRApp(App)
  const pinia = createPinia()
  
  // 1. 安装 Pinia
  app.use(pinia)
  app.use(uViewPro)
  
  // 2. 配置全局属性
  app.config.globalProperties.$adpid = "1111111111"
  app.config.globalProperties.$backgroundAudioData = {
    playing: false,
    playTime: 0,
    formatedPlayTime: '00:00:00'
  }
  
  return {
    app
  }
}
