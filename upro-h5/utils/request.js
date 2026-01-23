// utils/request.js
import { useUserStore } from '@/store/user.js'

// 全局配置
const globalConfig = {
  baseURL: '', // 接口基础地址
  timeout: 15000,
  // 其他全局配置...
}

/**
 * 设置全局配置
 * @param {object} config - 配置对象
 */
export function setConfig(config) {
  Object.assign(globalConfig, config)
}

/**
 * GET 请求
 * @param {string} url - 请求地址
 * @param {object} params - 请求参数
 * @param {object} options - 配置选项
 */
export function get(url, params = {}, options = {}) {
  return request(url, 'GET', params, options)
}

/**
 * POST 请求
 * @param {string} url - 请求地址
 * @param {object} data - 请求数据
 * @param {object} options - 配置选项
 */
export function post(url, data = {}, options = {}) {
  return request(url, 'POST', data, options)
}

/**
 * 统一的请求方法
 */
async function request(url, method = 'GET', data = {}, options = {}) {
  // 合并选项
  const opts = {
    showLoading: false,
    loadingText: '加载中...',
    timeout: globalConfig.timeout,
    header: {},
    ...options
  }
  
  // 显示loading
  if (opts.showLoading) {
    uni.showLoading({
      title: opts.loadingText,
      mask: true
    })
  }
  
  // 获取完整URL
  const fullUrl = getFullUrl(url)
  
  // 获取token
  const userStore = useUserStore()
  const token = userStore.token
  
  // 准备请求头
  const header = {
    'Content-Type': 'application/json',
    ...opts.header
  }
  
  if (token) {
    header['Authorization'] = `Bearer ${token}`
  }
  
  try {
    const res = await uni.request({
      url,
      method: method.toUpperCase(),
      data,
      header,
      timeout: opts.timeout
    })
    
    return handleResponse(res)
  } catch (error) {
    handleRequestError(error)
    throw error
  } finally {
    // 隐藏loading
    if (opts.showLoading) {
      uni.hideLoading()
    }
  }
}

/**
 * 获取完整URL
 */
function getFullUrl(url) {
  // 如果是完整URL，直接返回
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url
  }
  
  // 如果baseURL以/结尾且url以/开头，去掉一个/
  let baseURL = globalConfig.baseURL || ''
  if (baseURL.endsWith('/') && url.startsWith('/')) {
    baseURL = baseURL.slice(0, -1)
  } else if (!baseURL.endsWith('/') && !url.startsWith('/')) {
    url = '/' + url
  }
  
  return baseURL + url
}

/**
 * 处理响应
 */
function handleResponse(res) {
  const { statusCode, data: responseData } = res
  
  // HTTP状态码错误处理
  if (statusCode !== 200) {
    const errorMessage = getHttpErrorMessage(statusCode)
    uni.showToast({
      title: errorMessage,
      icon: 'none',
      duration: 3000
    })
    throw new Error(errorMessage)
  }
  
  // 业务逻辑错误处理（根据后端接口规范调整）
  // 假设成功返回格式为：{ code: 0, message: 'success', data: {} }
  const { code, message, data } = responseData
  
  // 处理token过期（假设401或10001为token过期）
  if (code === 401 || code === 10001) {
    return handleTokenExpired()
  }
  
  // 业务成功（假设0为成功）
  if (code === 0) {
    return data || responseData
  }
  
  // 业务失败
  uni.showToast({
    title: message || '请求失败',
    icon: 'none',
    duration: 3000
  })
  throw new Error(message || '请求失败')
}

/**
 * 处理token过期
 */
function handleTokenExpired() {
  const userStore = useUserStore()
  
  uni.showModal({
    title: '提示',
    content: '登录已过期，请重新登录',
    showCancel: false,
    success: () => {
      userStore.logout()
      uni.reLaunch({
        url: '/pages/login/login'
      })
    }
  })
  
  throw new Error('登录已过期')
}

/**
 * 处理请求错误
 */
function handleRequestError(error) {
  console.error('请求失败:', error)
  
  // 网络错误
  if (error.errMsg && error.errMsg.includes('request:fail')) {
    uni.showToast({
      title: '网络连接失败，请检查网络',
      icon: 'none',
      duration: 3000
    })
  }
}

/**
 * 获取HTTP错误消息
 */
function getHttpErrorMessage(statusCode) {
  const errorMap = {
    400: '请求参数错误',
    401: '未授权，请登录',
    403: '拒绝访问',
    404: '请求地址不存在',
    500: '服务器内部错误',
    502: '网关错误',
    503: '服务不可用',
    504: '网关超时'
  }
  
  return errorMap[statusCode] || `请求失败，状态码：${statusCode}`
}

// 导出
export default { get, post, setConfig }
