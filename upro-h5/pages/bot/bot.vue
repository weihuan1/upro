<template>
	<u-navbar :height="38" back-text="量化中心" back-icon-name="" :border-bottom="false" title=""></u-navbar>
	<view class="wrap">
		<view class="api_wrap" @click="showContent = true">
			<view class="img_wrap">
				<img class="api_img" :src="configStore.selectApi.img" alt="api" />
				{{ configStore.selectApi.label }}
			</view>
			<u-dropdown ref="uDropdownRef" class="big" active-color="#bf5fc1" inactive-color="#fff" :border-bottom="false">
				<u-dropdown-item title="" :options="apiOptions">
					<view class="drop_main">
						<view class="select_item" v-for="item in apiOptions" :key="item.value" @click="changeHandle(item)">
							<img class="api_img" :src="item.img" alt="api" />
							<text :class="{ active: configStore.selectApi.value === item.value }">{{ item.label }}</text>
						</view>
					</view>
				</u-dropdown-item>
			</u-dropdown>
		</view>
		<view class="card robot_card">
			<img class="robot_img" src="@/static/image/home/robot_icon.png" alt="robot" />
			<view>立即开启智能合约交易</view>
			<view class="tips">适用于任意行情，高收益、低风险；让投资者在当下低迷的市场环境中仍可轻松持续的赚取USDT</view>
			<view class="ok-btn" @click="openHandle">开启机器人</view>
		</view>
		<view class="card bot_card">
			<view class="header">合约产品</view>
			<view class="bot_item">
				<img class="bot_img" src="@/static/image/home/contract.png" alt="contract" />
				<view class="bot_main">
					<view class="bot_head">
						<text>合约AI交易</text>
						<view class="tag">年800%+</view>
						<view class="tag">版本</view>
					</view>
					<view class="tips">多空对冲震荡套利，风险可控</view>
				</view>
				<img class="bot_btn" src="@/static/image/home/add_btn.svg" alt="contract" />
			</view>
			<u-line />
			<view class="bot_item">
				<img class="bot_img" src="@/static/image/home/contract.png" alt="contract" />
				<view class="bot_main">
					<view class="bot_head">
						<text>合约AI交易(闪电版)</text>
						<view class="tag">年2000%+</view>
					</view>
					<view class="tips">风险不敏感，追求高额收益，可忍受较多本金损失</view>
				</view>
				<img class="bot_btn" src="@/static/image/home/add_btn.svg" alt="contract" />
			</view>
			<u-line />
			<view class="bot_item">
				<img class="bot_img" src="@/static/image/home/contract.png" alt="contract" />
				<view class="bot_main">
					<view class="bot_head">
						<text>合约AI交易(单向版)</text>
						<view class="tag">年1000%+</view>
					</view>
					<view class="tips">建议做多方向</view>
				</view>
				<img class="bot_btn" src="@/static/image/home/add_btn.svg" alt="contract" />
			</view>
		</view>
		<view class="card bot_card">
			<view class="header">现货产品</view>
			<view class="bot_item">
				<img class="bot_img" src="@/static/image/home/btc.png" alt="btc" />
				<view class="bot_main">
					<view class="bot_head">
						<text>币币双向AI交易</text>
						<view class="tag">年100%+</view>
					</view>
					<view class="tips">双币种交易套利，适合横盘屯币</view>
				</view>
				<img class="bot_btn" src="@/static/image/home/add_btn.svg" alt="contract" />
			</view>
			<u-line />
			<view class="bot_item">
				<img class="bot_img" src="@/static/image/home/spot.png" alt="spot" />
				<view class="bot_main">
					<view class="bot_head">
						<text>现货网格交易</text>
					</view>
					<view class="tips">震荡行情中自动低买高卖，稳定套利</view>
				</view>
				<img class="bot_btn" src="@/static/image/home/add_btn.svg" alt="contract" />
			</view>
			<u-line />
			<view class="bot_item">
				<img class="bot_img" src="@/static/image/home/spot2.png" alt="spot2" />
				<view class="bot_main">
					<view class="bot_head">
						<text>现货马丁交易</text>
					</view>
					<view class="tips">单边加倍押注降低成本，回调止盈</view>
				</view>
				<img class="bot_btn" src="@/static/image/home/add_btn.svg" alt="contract" />
			</view>
		</view>
		<view class="card">
			<view class="header">
				<text>当前策略</text>
				<view class="more">历史策略 <u-icon name="arrow-right"></u-icon></view>
			</view>
			<view class="empty_main">
				<view class="bind ok-btn" @click="uni.navigateTo({ url: '/pages/set/api' })">绑定API</view>
				<view class="tips">开启高额收益</view>
			</view>
		</view>
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

	

	.drop_main {
		background: #414153;
	}
	.select_item {
		height: 50px;
		display: flex;
		justify-content: center;
		align-items: center;
		.active {
			color: var(--u-type-primary);
		}
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
.card {
	&.bot_card {
		padding-bottom: 0;
	}
	.header {
		margin-bottom: 8px;
		display: flex;
		justify-content: space-between;
		.more {
			font-size: 14px;
			color: rgba(255, 255, 255, .4);
		}
	}
	.tips {
		font-size: 13px;
		color: rgba(255, 255, 255, .4);
		margin-top: 4px;
	}
	.bot_item {
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 12px;
		padding: 12px 0;
		.bot_img {
			width: 38px;
			height: 38px;
		}
		.bot_main {
			flex: 1;
		}
		.bot_head {
			display: flex;
			align-items: center;
		}
		.tag {
			border: 1px solid #2cc197;
			color: #2cc197;
			font-size: 12px;
			border-radius: 4px;
			margin-left: 6px;
			padding: 0px 4px;
		}
		.bot_btn {
			width: 25px;
			height: 25px;
		}
	}
}
.empty_main {
	width: 120px;
	text-align: center;
	margin: 60px auto;
	.tips {
		margin-top: 12px;
	}
}
</style>