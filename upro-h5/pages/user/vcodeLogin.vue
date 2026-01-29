<template>
	<u-navbar title=""></u-navbar>
	<view class="title">
		登录
	</view>
	<view class="content dialog-bg">
		<view class="label">邮箱</view>
		<view class="input-bg">
			<input class="uni-input" name="input" placeholder="请输入邮箱" />
		</view>
		<view class="input-bg input2">
			<input class="uni-input" name="input" placeholder="请输入验证码" />
			<text class="code">发送验证码</text>
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