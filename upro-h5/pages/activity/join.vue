<template>
	<view class="wrap" :style="{ height: appStore.windowHeight + 'px' }">
		<view class="main">
			<u-icon @click="uni.navigateBack()" name="arrow-leftward" color="#ffffff" size="50"></u-icon>
			<view class="row">
				<text>暴力产品</text>
				<text>超高返佣</text>
			</view>
			<img width="100%" src="@/static/image/activity/ad_franchisee_title.png" alt="ad_franchisee_title"></img>
			<view class="txt_wrap">
				<view class="txt">三年困境坐以待毙</view>
				<view class="txt">不如破局 加入uplus创业团队</view>
				<view class="txt">即可获得平台扶持以及加盟商套餐</view>
			</view>
			<view class="row tel">
				<text>零门槛加盟</text>
				<text>联系方式: qq123</text>
			</view>
			<view class="btn">加入UPlus团队</view>
		</view>
	</view>
</template>

<script setup>
import { useAppStore } from '@/store/app.js'
const appStore = useAppStore()
</script>

<style lang="scss" scoped>
.wrap {
	background: url('@/static/image/activity/join_bg.png') no-repeat center center;
	background-color: #02134b;
	background-size: cover;
}

.main {
	padding-top: 20px;
}

.row {
	display: flex;
	justify-content: space-between;
	margin: 30px 0;
}

.txt_wrap {
	margin: 40px 0;
}
.txt {
	color: #ffffff;
	font-size: 16px;
	margin-top: 8px;
	text-align: center;
}

.tel {
	font-size: 14px;
}

.btn {
	width: 50%;
	height: 42px;
	background: #00a9e2;
	border-radius: 21px;
	font-weight: 600;
	position: absolute;
	bottom: 8.6%;
	z-index: 1;
	line-height: 42px;
	color: rgb(254, 254, 254);
	left: 50%;
	transform: translate(-50%, 0px);
	text-align: center;
}
</style>
