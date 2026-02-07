<template>
	<u-navbar :height="38" back-text="量化中心" back-icon-name="" :border-bottom="false" title=""></u-navbar>
	<view class="wrap">
		<view class="api_wrap" @click="showContent = true">
			<div class="img_wrap">
				<img class="api_img" :src="configStore.selectApi.img" alt="api" />
				{{ configStore.selectApi.label }}
			</div>
			<u-dropdown ref="uDropdownRef" active-color="#bf5fc1" inactive-color="#fff" :border-bottom="false">
				<u-dropdown-item title="" :options="apiOptions">
					<view class="drop_main">
						<view class="select_item" v-for="item in apiOptions" :key="item.value" @click="changeHandle(item)">
							<img class="api_img" :src="item.img" alt="api" />
							{{ item.label }}
						</view>
					</view>
				</u-dropdown-item>
			</u-dropdown>
		</view>
		<div class="card robot_card">
			<img class="robot_img" src="@/static/image/home/robot_icon.png" alt="robot" />
			<view>立即开启智能合约交易</view>
			<view class="tips">适用于任意行情，高收益、低风险；让投资者在当下低迷的市场环境中仍可轻松持续的赚取USDT</view>
			<view class="ok-btn" @click="openHandle">开启机器人</view>
		</div>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { useConfigStore } from '@/store/config.js'
const configStore = useConfigStore()
const { setSelectApi, apiOptions } = configStore;

const uDropdownRef = ref(null)
const changeHandle = item => {
	setSelectApi(item)
	uDropdownRef.value.close()
}

const openHandle = () => {
	console.log('openHandle')
}

</script>

<style lang="scss">
.api_wrap {
	height: 45px;
	display: flex;
	flex: 1;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	background: linear-gradient(178.36deg, #69697d -359.21%, #666679 -320.98%, #3c3c4b 205.45%);
	box-shadow: 0 0 33px 0 rgba(34, 34, 44, .24705882352941178);
	border-radius: 6px;
	z-index: 5;

	.u-dropdown__menu__item {
		margin-right: 16px !important;
	}

	.drop_main {
		background: #414153;
	}
	.select_item {
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.img_wrap {
		position: absolute;
		display: flex;
	}

	.api_img {
		width: 20px;
		height: 20px;
		border-radius: 4px;
		margin-right: 12px;
	}
}
.robot_card {
	text-align: center;
	font-size: 16px;
	.robot_img{
		height: 60px;
		margin: 16px 0;
	}
	.tips {
		font-size: 13px;
		color: rgba(255, 255, 255, .4);
		margin: 12px 0;
	}
	.ok-btn {
		margin: 18px auto 8px;
		width: 60%;
	}
}
</style>