// store/app.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  // 设备窗口尺寸 - 核心数据
  const windowWidth = ref(375) // 默认值，uniapp 标准宽度
  const windowHeight = ref(667) // 默认值，uniapp 标准高度
  
  // ========== Actions ==========
  
  /**
   * 初始化设备信息 (最简单版本)
   * 在应用启动时调用一次即可
   */
  const initDeviceInfo = () => {
    try {
      const systemInfo = uni.getSystemInfoSync()
      windowWidth.value = systemInfo.windowWidth
      windowHeight.value = systemInfo.windowHeight
      
      console.log('设备尺寸初始化:', {
        width: windowWidth.value,
        height: windowHeight.value
      })
    } catch (error) {
      console.warn('获取设备信息失败，使用默认值:', error)
    }
  }
  
  /**
   * 直接设置自定义尺寸 (可选，用于特殊场景)
   */
  const setCustomSize = (width, height) => {
    if (width) windowWidth.value = width
    if (height) windowHeight.value = height
  }
  
  /**
   * 获取 CSS 高度值 (方便模板使用)
   */
  const getWindowHeightCSS = () => {
    return `${windowHeight.value}px`
  }
  
  /**
   * 判断是否为竖屏
   */
  const isPortrait = () => {
    return windowHeight.value >= windowWidth.value
  }

  return {
    // State
    windowWidth,
    windowHeight,
    
    // Actions
    initDeviceInfo,
    setCustomSize,
    getWindowHeightCSS,
    isPortrait
  }
}, {
  persist: {
    key: 'app-store',
    paths: ['windowWidth', 'windowHeight'] // 持久化存储，避免每次刷新重新获取
  }
})