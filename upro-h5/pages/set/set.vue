<template>
	<uni-nav-bar left-icon="left" @clickLeft="() => { uni.navigateBack() }" title="设置"></uni-nav-bar>
	<view class="wrap">
		<view class="list">
			<text class="txt">汇率设置</text>
			<text>CNY</text>
		</view>
		<view class="list">
			<text class="txt">语言设置</text>
			<text>简体中文</text>
			<uni-icons size="18" type="right"></uni-icons>
		</view>
		<view class="tips">安全与隐私</view>
		<view class="list">
			<text class="txt">登陆手机</text>
			<uni-icons size="18" type="right"></uni-icons>
		</view>
		<view class="list">
			<text class="txt">绑定邮箱</text>
			<uni-icons size="18" type="right"></uni-icons>
		</view>
		<view class="list">
			<text class="txt">登陆密码</text>
			<uni-icons size="18" type="right"></uni-icons>
		</view>
		<view class="logout" @click="show = true">退出登录</view>
		<u-modal v-model="show" @confirm="logout" :show-title="false" show-cancel-button content="确定要退出登录吗？"></u-modal>
	</view>
	
</template>

<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/user'

const show = ref(false);
const { logout } = useUserStore();

</script>

<style>
.list {
	display: flex;
	align-items: center;
	padding: 12px 0;
	color: #999;
	gap: 6px;

	&+.list {
		border-top: 1px solid #444459;
	}

	.txt {
		flex: 1;
		color: #fff;
	}

	.uni-icons {
		color: #999 !important;
	}
}

.tips {
	color: #999;
	padding: 12px 0;
	font-size: 16px;
	border-top: 1px solid #444459;
}

.logout {
	font-size: 15px;
	color: #fff;
	height: 50px;
	background: linear-gradient(131.47deg, #fc5d9f -37.41%, #5863fc 111.11%);
	border-radius: 8px;
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	width: 90%;
	bottom: 80px;
}
</style>
