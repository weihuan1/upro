<template>
	<u-navbar title="修改登录密码"></u-navbar>
	<view class="wrap set-phone">
		<view class="label">旧密码</view>
		<view class="input-bg">
			<u-input v-model="pass" placeholder="请输入旧密码" :maxlength="20" type="password" />
		</view>
		<view class="label">新密码</view>
		<view class="input-bg">
			<u-input v-model="newPass" placeholder="请输入新密码" :maxlength="20" type="password" />
		</view>
		<view class="label">确认新密码</view>
		<view class="input-bg">
			<u-input v-model="confirmPass" placeholder="请再次输入新密码" :maxlength="20" type="password" />
		</view>
		<u-button type="primary" @click="submit" class="bind-btn">确定修改</u-button>
	</view>
</template>

<script setup>
import { ref } from 'vue'

const pass = ref('')
const newPass = ref('')
const confirmPass = ref('')

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