<template>
	<u-navbar :height="38" :border-bottom="false" title="绑定API"></u-navbar>
	<view class="wrap bind_wrap">
		<view class="title">Api信息</view>
		<view class="input-bg">
			<u-input placeholder="Api Key"></u-input>
		</view>
		<view class="input-bg">
			<u-input placeholder="Api Secret"></u-input>
		</view>
		<view class="input-bg" v-show="apiName === 'Okx'">
			<u-input placeholder="密码短语"></u-input>
		</view>
		<view class="tips red" v-show="apiName === 'Okx'">*密码短语必须要与OKX保持一致(不包含汉字)</view>
		<u-line></u-line>
		<view class="title">验证信息 (xbing9173@gmail.com)</view>
		<view class="input-bg">
			<u-input placeholder="请输入验证码"></u-input>
			<view class="code_wrap" :class="{ 'isPedding': isPedding }">
				<u-verification-code :seconds="60" @end="end" @start="start" ref="uCodeRef"
					@change="codeChange"></u-verification-code>
				<u-button @tap="getCode">{{ tips }}</u-button>
			</view>
		</view>
		<view class="ok-btn big">绑定</view>
		<div class="title">** 专属链接注册用户享受限时85%折扣，点击下方注册地址去浏览器注册</div>
		<view class="signup u-flex">
				<view class="link_wrap">
					注册链接: <u-link :href="currentApi?.signup" under-line color="#fff">{{ currentApi?.signup }}</u-link>
				</view>
				<view class="copy" @click="copyHandle(currentApi?.signup)">复制</view>
			</view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useConfigStore } from '@/store/config.js'
import { copyHandle } from '@/utils/index.js';
import { onLoad } from '@dcloudio/uni-app'

const apiName = ref('')
onLoad(options => {
	apiName.value = options.api
})

const { apiOptions } = useConfigStore();
const currentApi = computed(() => {
	return apiOptions.find(item => item.value === apiName.value)
})

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
.bind_wrap {

	.title {
		margin: 14px 0;
	}

	.u-line {
		padding: 12px 0;
	}
	.signup {
		white-space: nowrap;
		justify-content: space-between;
		margin: 12px 0;

		.link_wrap {
			width: 80%;
			word-break: break-all;
			font-size: 14px;

			.u-link {
				font-size: 14px !important;
			}
		}

		.copy {
			color: $uni-color-primary;
			font-size: 15px;
		}
	}
}
</style>
