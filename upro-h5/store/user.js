// store/user.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // State
  const hasLogin = ref(false)
  const isUniverifyLogin = ref(false)
  const loginProvider = ref('')
  const univerifyErrorMsg = ref('')
  
  // Getters
  const isLoggedIn = computed(() => hasLogin.value)
  const loginStatus = computed(() => ({
    hasLogin: hasLogin.value,
    provider: loginProvider.value,
    isUniverify: isUniverifyLogin.value
  }))
  
  // Actions
  const login = (provider) => {
    hasLogin.value = true
    loginProvider.value = provider
  }
  
  const logout = () => {
    hasLogin.value = false
    isUniverifyLogin.value = false
    loginProvider.value = ''
    univerifyErrorMsg.value = ''
    
    // 清除相关存储
    uni.removeStorageSync('token')
    uni.removeStorageSync('userInfo')
    uni.navigateTo({ url: '/pages/user/login' })
  }
  
  
  const setUniverifyLogin = (payload) => {
    isUniverifyLogin.value = !!payload
  }
  
  const setUniverifyErrorMsg = (msg = '') => {
    univerifyErrorMsg.value = msg
  }
  
 
  // 获取手机号
  const getPhoneNumber = (univerifyInfo) => {
    return new Promise((resolve, reject) => {
      uni.request({
        url: 'https://97fca9f2-41f6-449f-a35e-3f135d4c3875.bspapp.com/http/univerify-login',
        method: 'POST',
        data: univerifyInfo,
        success: (res) => {
          const data = res.data
          if (data.success) {
            resolve(data.phoneNumber)
          } else {
            reject(res)
          }
        },
        fail: (err) => {
          reject(err)
        }
      })
    })
  }
  
  return {
    // State
    hasLogin,
    isUniverifyLogin,
    loginProvider,
    univerifyErrorMsg,
    
    // Getters
    isLoggedIn,
    loginStatus,
    
    // Actions
    login,
    logout,
    setUniverifyLogin,
    setUniverifyErrorMsg,
    getPhoneNumber
  }
})