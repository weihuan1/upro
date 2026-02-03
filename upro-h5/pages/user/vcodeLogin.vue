<template>
	<u-navbar title=""></u-navbar>
	<view class="title">
		登录
	</view>
	<view class="content dialog-bg">
		<view class="label">邮箱</view>
		<view class="input-bg">
			<u-input v-model="email" placeholder="请输入邮箱"></u-input>
		</view>
		<view class="input-bg input2">
			<u-input v-model="code" placeholder="请输入验证码"></u-input>
			<view class="code_wrap" :class="{ 'isPedding': isPedding }">
				<u-verification-code :seconds="60" @end="end" @start="start" ref="uCodeRef"
					@change="codeChange"></u-verification-code>
				<u-button @tap="getCode">{{ tips }}</u-button>
			</view>
		</view>
		<view class="tips flex">
			<view class="left light"></view>
			<view class="flex">
				<view>还没有账号？</view>
				<view class="light">注册</view>
			</view>
		</view>
	</view>
	<view class="login">
		<img src="@/static/image/user/login.svg" alt="login" />
	</view>

	<view class="toggle" @click="toggleHandle">
		密码登录
	</view>
</template>

<script setup>
import { ref, computed } from 'vue'
const email = ref('')
const code = ref('')
const tips = ref('')
const uCodeRef = ref()

const isPedding = computed(() => {
	return !['获取验证码', '重新获取'].includes(tips.value)
})

function codeChange(text) {
	tips.value = text
}

function getCode() {
	if (!uni.$u.test.email(email.value)) {
		uni.$u.toast('请输入正确的邮箱地址')
		return
	}
	if (uCodeRef.value?.canGetCode) {
		// 模拟向后端请求验证码
		uni.showLoading({
			title: '正在获取验证码'
		})
		setTimeout(() => {
			uni.hideLoading()
			// 这里此提示会被start方法中的提示覆盖
			uni.$u.toast('验证码已发送')
			// 通知验证码组件内部开始倒计时
			uCodeRef.value?.start()
		}, 2000)
	} else {
		uni.$u.toast('倒计时结束后再发送')
	}
}

function end() {
	uni.$u.toast('倒计时结束')
}

function start() {
	uni.$u.toast('倒计时开始')
}
const formSubmit = () => {
	console.log('formSubmit')
}
const toggleHandle = () => {
	uni.navigateTo({
		url: '/pages/user/login'
	})
}
</script>

<style lang="scss">
@import url("./user.scss");
</style>