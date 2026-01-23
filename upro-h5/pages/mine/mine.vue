<template>
	<view>
		我的
	</view>
</template>

<script setup>
	import { onPullDownRefresh } from '@dcloudio/uni-app'
  import { useUserStore } from '@/store/user.js';
import { post } from '@/utils/request';
	
	const { isLoggedIn } = useUserStore()
	onPullDownRefresh(() => {
		console.log('onPullDownRefresh')
		console.log('isLoggedIn', isLoggedIn)
		post('/login').catch(err => {
			console.log(err)
		})
		uni.stopPullDownRefresh();
	})
</script>

<style lang="scss">

</style>