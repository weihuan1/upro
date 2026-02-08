// store/config.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

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
        { label: 'Binance', apiName: 'Binance API', value: 'Binance', img: '/static/image/api/binance.png', signup: 'https://www.bmwweb.club/zh-CN/referral/earn-together/refer2earn-usdc/claim?hl=zh-CN&ref=GRO_28502_7ONUK&utm_source=default' },
        { label: 'OKx', apiName: 'Okx API V5', value: 'Okx', img: '/static/image/api/okx.png', signup: 'https://www.nocmjsdty.com/join/6CngT5?channelId=xxx' },
        { label: 'Gate.io', apiName: 'Gate.io API V4', value: 'Gate', img: '/static/image/api/gate.png', signup: 'https://www.gatenode.xyz/signup/BlgXUFhY?ref_type=xxx' },
        { label: 'Bybit', apiName: 'Bybit API V5', value: 'Bybit', img: '/static/image/api/bybit.png', signup: 'https://partner.bybit.com/b/sss' }
      ]
    }
    apiOptions.value = result.apiOptions
    if (result.apiOptions.length > 0) {
      setSelectApi(result.apiOptions[0])
    }
  }

  const setSelectApi = (val) => {
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