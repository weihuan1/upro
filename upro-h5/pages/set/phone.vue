<template>
	<u-navbar title="更换登录手机"></u-navbar>
	<view class="wrap set-phone">
		<view class="title">手机号</view>
		<view class="input-bg">
			<u-input v-model="phone" :disabled="isPedding" placeholder="请输入手机号码" :maxlength="11" type="number" />
		</view>
		<view class="input-bg">
			<u-input v-model="code" :clearable="false" placeholder="请输入手机验证码" :maxlength="6" type="number" />
			<view class="code_wrap" :class="{ 'isPedding': isPedding }">
				<u-verification-code :seconds="60" @end="end" @start="start" ref="uCodeRef"
					@change="codeChange"></u-verification-code>
				<u-button @tap="getCode">{{ tips }}</u-button>
			</view>
		</view>
		<u-button type="primary" class="bind-btn">绑定</u-button>
	</view>
</template>

<script setup>
import { ref, computed  } from 'vue'

// 定义响应式数据
const phone = ref('')
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
	if (!uni.$u.test.mobile(phone.value)) {
		uni.$u.toast('请输入正确的手机号码')
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
</script>

<style lang="scss" scoped>
.title {
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
.code_wrap {
	.u-btn {
		background: transparent !important;
		padding: 0px;
		font-size: 14px;
		color: $uni-color-primary;
		&::after {
			display: none;
		}
	}
	&.isPedding {
		.u-btn {
			color: #999;
		}
	}
}
</style>