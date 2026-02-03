<template>
	<u-navbar title="个人资料"></u-navbar>
	<view class="wrap set">
		<view class="list">
			<text class="txt">更改头像</text>
			<img class="avatar" src="@/static/image/user/avatar.png" alt="avatar" />
			<u-icon size="28" name="arrow-right"></u-icon>
		</view>
		<view class="list" @click="uni.navigateTo({ url: '/pages/set/nickname' })">
			<text class="txt">昵称</text>
			<text>昵称1</text>
			<u-icon size="28" name="arrow-right"></u-icon>
		</view>
		<view class="tips">安全与隐私</view>
		<view class="list">
			<text class="txt">出生日期</text>
			<picker mode="date" :value="date" @change="bindDateChange">
				<view class="uni-input">{{date}}</view>
			</picker>
			<u-icon size="28" name="arrow-right"></u-icon>
		</view>
		<view class="list" @click="uni.navigateTo({ url: '/pages/set/phone' })">
			<text class="txt">我的手机</text>
			<text>123456</text>
			<u-icon size="28" name="arrow-right"></u-icon>
		</view>
		<view class="list" @click="uni.navigateTo({ url: '/pages/set/email' })">
			<text class="txt">我的邮箱</text>
			<text>132@qq.com</text>
			<u-icon size="28" name="arrow-right"></u-icon>
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

const date = ref(uni.$u.date());
const bindDateChange = (e) => {
	date.value = e.detail.value;
};

</script>

<style lang="scss">
.set {
	.avatar {
		height: 50px;
		width: 50px;
		border-radius: 50%;
	}
	.list {
		display: flex;
		align-items: center;
		padding: 12px 0;
		gap: 6px;
		color: #999;

		&+.list {
			border-top: 1px solid #444459;
		}

		.txt {
			flex: 1;
			color: #fff;
		}

		.u-icon {
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
}
</style>
