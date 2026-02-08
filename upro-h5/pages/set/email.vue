<template>
	<u-navbar title="修改登录邮箱"></u-navbar>
	<view class="wrap set-phone">
		<view class="label">旧邮箱地址 (123@qq.com)</view>
		<view class="input-bg">
			<u-input v-model="emailCode" placeholder="旧邮箱验证码" :maxlength="6" type="number" />
			<view class="code_wrap" :class="{ 'isPedding': isPedding }">
				<u-verification-code :seconds="60" @end="end" @start="start" ref="uCodeRef"
					@change="codeChange"></u-verification-code>
				<u-button @tap="getCode">{{ tips }}</u-button>
			</view>
		</view>
		<view class="gaps"></view>
		<view class="label">新邮箱地址</view>
		<view class="input-bg">
			<u-input v-model="newEmail" :disabled="isNewPedding" placeholder="新邮箱地址" :maxlength="11" type="email" />
		</view>
		<view class="input-bg">
			<u-input v-model="newEmailCode" placeholder="新邮箱验证码" :maxlength="6" type="number" />
			<view class="code_wrap" :class="{ 'isPedding': isNewPedding }">
				<u-verification-code :seconds="60" @end="newEnd" @start="newStart" ref="newCodeRef"
					@change="newCodeChange"></u-verification-code>
				<u-button @tap="getNewCode">{{ newTips }}</u-button>
			</view>
		</view>
		<u-button type="primary" @click="submit" class="bind-btn">确定修改</u-button>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue'

const emailCode = ref('')
const newEmail = ref('')
const newEmailCode = ref('')
const newTips = ref('')
const newCodeRef = ref()
const tips = ref('')
const uCodeRef = ref()

const isPedding = computed(() => {
	return !['获取验证码', '重新获取'].includes(tips.value)
})

const isNewPedding = computed(() => {
	return !['获取验证码', '重新获取'].includes(newTips.value)
})

function codeChange(text) {
	tips.value = text
}

function getCode() {
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

function newCodeChange(text) {
	newTips.value = text
}

function getNewCode() {
	if (!uni.$u.test.email(newEmail.value)) {
		uni.$u.toast('请输入正确的邮箱地址')
		return
	}
	if (newCodeRef.value?.canGetCode) {
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

function newEnd() {
	uni.$u.toast('倒计时结束')
}

function newStart() {
	uni.$u.toast('倒计时开始')
}

function submit() {
	if (newPass.value !== confirmPass.value) {
		uni.$u.toast('两次输入的密码不一致')
		return
	}
	uni.$u.toast('密码修改成功')
}	
</script>

<style lang="scss" scoped>
.label {
	margin: 16px 0 8px 0;
}

.send-code {
	color: $uni-color-primary;
}

.bind-btn {
	position: fixed;
	height: 50px;
	bottom: 80px;
	width: 90%;
	background: linear-gradient(131.47deg, #fc5d9f -37.41%, #5863fc 111.11%);
}

</style>