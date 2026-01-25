<template>
	<uni-nav-bar left-icon="left" @clickLeft="() => {uni.navigateBack()}" title=""></uni-nav-bar>
	<view class="title">
		登录
	</view>
	<view class="content dialog-bg">
		<view class="label"></view>
		<view class="input-bg">
			<input class="uni-input" type="text" name="input" placeholder="请输入邮箱/手机号" />
			<uni-icons type="closeempty" size="20"></uni-icons>
		</view>
		<view class="input-bg input2">
			<input class="uni-input" :password="!showPass" type="numeric" name="input" placeholder="请输入密码" />
			<uni-icons v-if="!showPass" size="20" type="eye" @click="togglePass"></uni-icons>
			<uni-icons v-else type="eye-slash" size="20" @click="togglePass"></uni-icons>
		</view>
		<view class="tips flex">
			<view class="left">忘记密码</view>
			<view class="flex">
				<view>还没有账号？</view>
				<view class="light">注册</view>
			</view>
		</view>
		<view class="save">
			<checkbox
				value="cb"
				style="transform:scale(0.8)"
				iconColor="rgb(191, 95, 193)"
				backgroundColor="#393948"
				borderColor="#ffffff"
				activeBackgroundColor="#393948"
				:checked="true"
			/>记住密码
		</view>
	</view>
	<view class="login">
		<img src="@/static/image/user/login.svg" alt="login" />
	</view>
	
	<view class="toggle" @click="toggleHandle">
		验证码登录
	</view>
</template>

<script setup>
import { ref } from 'vue'

	const showPass = ref(false)
	const togglePass = () => {
		showPass.value = !showPass.value
	}
	
	const formSubmit = () => {
		console.log('formSubmit')
	}
	const toggleHandle = () => {
		uni.navigateTo({
			url: '/pages/user/vcodeLogin'
		})
	}
</script>

<style lang="scss">
	@import url("./user.scss");
</style>