<template>
	<u-navbar :height="38" :border-bottom="false" title="API"></u-navbar>
	<view class="wrap">
		<view class="api_list" v-for="item in apiOptions" :key="item.value">
			<view class="head">
				<img class="api_img" :src="item.img" alt="api" />
				<view class="txt">{{ item.apiName }}</view>
				<view class="status">未绑定</view>
			</view>
			<view class="signup u-flex" v-show="item.signup">
				<view class="link_wrap">
					注册链接: <u-link :href="item.signup" under-line color="#fff">{{ item.signup }}</u-link>
				</view>
				<view class="copy" @click="copyHandle(item.signup)">复制</view>
			</view>
			<view class="btn_wrap">
				<view class="ok-btn" @click="bindHandle(item.value)">绑定API</view>
			</view>
			<u-line />
		</view>
		<view class="help_wrap">不会设置? 
			<view class="help" @click="uni.navigateTo({ url: '/pages/set/bind' })">点我查看教程 <u-icon name="arrow-right" size="24"></u-icon></view>
		</view>
		<view class="tips_wrap">提示：以上专属链接注册用户享受限时85%折扣</view>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { useConfigStore } from '@/store/config.js'
const { apiOptions } = useConfigStore();

const copyHandle = (text) => {
	uni.setClipboardData({
		data: text,
		success: () => {
			uni.$u.toast('复制成功')
		},
		fail: () => {
			uni.$u.toast('复制失败')
		}
	})
}

const bindHandle = (apiName) => {
	uni.navigateTo({ url: '/pages/set/bind?api=' + apiName })
}

</script>

<style lang="scss" scoped>
.api_list {
	padding-top: 16px;

	.u-line {
		padding-top: 16px;
	}

	.head {
		display: flex;
		align-items: center;
		gap: 12px;

		.api_img {
			width: 22px;
		}

		.status {
			border: 1px solid rgba(255, 255, 255, .4);
			border-radius: 6px;
			font-size: 12px;
			padding: 0 4px 2px;
			color: rgba(255, 255, 255, .4);
		}
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

	.btn_wrap {
		display: flex;
		justify-content: flex-end;

		.ok-btn {
			margin-top: 0;
			font-size: 13px;
			height: 32px;
			line-height: 32px;
			width: 140px;
		}
	}
}
.help_wrap {
	display: flex;
	justify-content: flex-end;
	font-size: 13px;
	color: rgba(255, 255, 255, .4);
	margin: 14px 0;
	.help {
		color: $uni-color-primary;
		margin-left: 6px;
	}
}
.tips_wrap {
	font-size: 15px;
}
</style>
