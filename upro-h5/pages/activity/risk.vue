<template>
	<view class="wrap" :style="{ height: appStore.windowHeight + 'px' }">
		<view class="main">
			<u-icon @click="uni.navigateBack()" name="arrow-leftward" color="#333" size="50"></u-icon>
		</view>
	</view>
</template>

<script setup>
import { useAppStore } from '@/store/app.js'
const appStore = useAppStore()
</script>

<style lang="scss" scoped>
.wrap {
	background: url('@/static/image/activity/risk_bg.png') no-repeat center top;
	background-color: #2a88e6;
	background-size: contain;
}
.main {
	padding-top: 20px;
}
</style>
