<template>
	<uni-nav-bar left-icon="left" @clickLeft="() => {uni.navigateBack()}" title=""></uni-nav-bar>
	<view class="title">
		邮箱
	</view>
	<view class="content dialog-bg">
		<view class="label"></view>
		<view class="input-bg">
			<input class="uni-input" type="email" name="input" placeholder="请输入邮箱" />
		</view>
		<view class="input-bg input2">
			<input class="uni-input" type="numeric" name="input" placeholder="请输入验证码" />
			<text class="code">发送验证码</text>
		</view>
		<view class="tips flex">
			<view class="left light">忘记密码</view>
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
		验证码登录
	</view>
</template>

<script setup>
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