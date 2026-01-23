
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAppStore = defineStore('app', () => {
	const lang = ref('zh-CN')

	// Getters
	const currentLang = computed(() => lang.value)
	const isChinese = computed(() => lang.value === 'zh-CN')
	const isEnglish = computed(() => lang.value === 'en-US')

	// Actions
	const setLang = (newLang) => {
		lang.value = newLang
		// 可以在这里添加其他逻辑
		uni.setStorageSync('app-lang', newLang)
	}

	const toggleLang = () => {
		lang.value = lang.value === 'zh-CN' ? 'en-US' : 'zh-CN'
	}

	const initLang = () => {
		const storedLang = uni.getStorageSync('app-lang')
		if (storedLang) {
			lang.value = storedLang
		}
	}

	return {
		// State
		lang,

		// Getters
		currentLang,
		isChinese,
		isEnglish,

		// Actions
		setLang,
		toggleLang,
		initLang
	}
}, {
	persist: {
		key: 'app-store',
		paths: ['lang']
	}
})
