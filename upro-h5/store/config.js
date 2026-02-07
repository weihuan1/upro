// store/config.js
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfigStore = defineStore('config', () => {
  // 交易所api 支持
  const apiOptions = ref([])
  const selectApi = ref({})
  
  /**
   * 获取项目配置
   */
  const getConfigData = () => {
    // 接口获取配置
    const result = {
      apiOptions: [
        { label: 'Binance', value: 'Binance', img: '/static/image/user/avatar.png' },
        { label: 'OKx', value: 'OKx', img: '/static/image/user/avatar.png' }
      ]
    }
    apiOptions.value = result.apiOptions
    if (result.apiOptions.length > 0) {
      setSelectApi(result.apiOptions[0])
    }
  }

  const setSelectApi = (val) => {
    console.log('setSelectApi', val)
    selectApi.value = val
  }

  return {
    // State
    apiOptions,
    selectApi,
    
    // Actions
    setSelectApi,
    getConfigData,
  }
})