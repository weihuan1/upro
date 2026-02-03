<script>
import { useAppStore } from '@/store/app.js'
export default {
	onLaunch: function () {
		const appStore = useAppStore()
		appStore.initDeviceInfo()
		console.log('App Launch')
	},
	onShow: function () {
		console.log('App Show')
	},
	onHide: function () {
		console.log('App Hide')
	}
}
</script>

<style lang="scss">
@import "./uni.scss";
@import "@/uni_modules/uview-pro/index.scss";
@import "common/style.scss";
</style>
