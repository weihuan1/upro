<template>
	<view class="wrap">
		<view class="no_login flex" @click="clickHandle">
			<img class="logo_text" src="@/static/image/logo_text.svg" alt="logo" />
			<view>
				<text class="text">登录</text>
				<u-icon size="28" name="arrow-right"></u-icon>
			</view>
		</view>
		<u-swiper :list="list"></u-swiper>
		<view class="grid_wrap">
			<u-grid :col="4" :border="false">
				<u-grid-item bg-color="transparent">
					<u-badge :is-dot="true" :offset="[30, 44]" type="error"></u-badge>
					<img class="grid_icon" src="@/static/image/home/gift.png" alt="">
					<view class="grid_text">活动</view>
				</u-grid-item>
				<u-grid-item bg-color="transparent">
					<img class="grid_icon" src="@/static/image/home/rank.png" alt="">
					<view class="grid_text">排行榜</view>
				</u-grid-item>
				<u-grid-item bg-color="transparent">
					<img class="grid_icon" src="@/static/image/home/profit.png" alt="">
					<view class="grid_text">全网收益</view>
				</u-grid-item>
				<u-grid-item bg-color="transparent">
					<img class="grid_icon" src="@/static/image/home/recharge.png" alt="">
					<view class="grid_text">充值</view>
				</u-grid-item>
				<u-grid-item bg-color="transparent">
					<img class="grid_icon" src="@/static/image/home/buy.png" alt="">
					<view class="grid_text">购买点卡</view>
				</u-grid-item>
				<u-grid-item bg-color="transparent">
					<img class="grid_icon" src="@/static/image/home/tutorial.png" alt="">
					<view class="grid_text">新手教程</view>
				</u-grid-item>
				<u-grid-item bg-color="transparent">
					<u-badge :is-dot="true" :offset="[30, 44]" type="error"></u-badge>
					<img class="grid_icon" src="@/static/image/home/agent.png" alt="">
					<view class="grid_text">节点返佣</view>
				</u-grid-item>
				<u-grid-item bg-color="transparent">
					<img class="grid_icon" src="@/static/image/home/points.png" alt="">
					<view class="grid_text">积分</view>
				</u-grid-item>
			</u-grid>
		</view>
		<u-notice-bar mode="horizontal" @click="clickNotice" type="none" :list="noticeList"></u-notice-bar>
		<img class="agent_img" @click="uni.navigateTo({ url: '/pages/activity/join' })" src="@/static/image/activity/agent_img.jpg" alt=""></img>
		<view class="card_wrap">
			<view class="card">
				<view class="line"></view>
				<text class="label">今日收益</text>
				<view class="today">0.00 <text class="unit">USDT</text></view>
				<text class="yst">昨日 &nbsp;&nbsp;&nbsp;0.00USDT</text>
			</view>
			<view class="card card2">
				<view class="line"></view>
				<text class="label">今日收益率</text>
				<view class="today">0.00 <text class="unit">%</text></view>
				<text class="yst">昨日 &nbsp;&nbsp;&nbsp;0.00 %</text>
			</view>
		</view>
		<img class="agent_img" @click="uni.navigateTo({ url: '/pages/activity/risk' })" src="@/static/image/activity/risk.png" alt=""></img>
		<view class="list_wrap">
			<view class="list">
				<img class="list_icon" src="@/static/icons/buy.png" alt="">
				<text class="text">购买点卡</text>
				<u-icon size="28" name="arrow-right"></u-icon>
			</view>
		</view>
	</view>
</template>
<script setup>
import { ref } from 'vue'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { useUserStore } from '@/store/user.js';

// 定义响应式数据
const list = ref([
	{
		image: "https://uplus200.oss-ap-southeast-1.aliyuncs.com/img/24bd8ceebea94a5ca5c9316c316327b6金融保险节点营销喜庆公众号首图1.png",
		title: "昨夜星辰昨夜风，画楼西畔桂堂东",
	},
	{
		image: "https://uplus200.oss-ap-southeast-1.aliyuncs.com/img/ce37057dbffc419dace76a4ec4b7434bkaicnagba.jpg",
		title: "身无彩凤双飞翼，心有灵犀一点通",
	},
	{
		image: "https://uplus200.oss-ap-southeast-1.aliyuncs.com/img/0634e711b112495fa77fe741e9f02ef0金融银行理财产品营销公众号首图套装.jpg",
		title: "谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳",
	},
])

const noticeList = ref([
	'寒雨连江夜入吴',
	'平明送客楚山孤',
	'洛阳亲友如相问',
	'一片冰心在玉壶'
])

const { isLoggedIn } = useUserStore()
onPullDownRefresh(() => {
	console.log('onPullDownRefresh')
	console.log('isLoggedIn', isLoggedIn)
	uni.stopPullDownRefresh();
	// uni.navigateTo({ url: '/pages/mine/set' })
})
const clickHandle = () => {
	if (isLoggedIn) {
		uni.navigateTo({ url: '/pages/mine/set' })
	} else {
		uni.navigateTo({ url: '/pages/user/login' })
	}
}

const clickNotice = (index) => {
	console.log('clickNotice', index)
	// uni.showToast({
	// 	title: noticeList.value[index],
	// 	icon: 'none'
	// })
}
</script>

<style lang="scss">
.no_login {
	gap: 8px;
	justify-content: space-between;
	position: sticky;
  top: 0;
	height: 32px;
  z-index: 100;
	background: #383848;

	.logo_text {
		height: 20px;
	}

	.text {
		flex: 1;
	}

	.edit {
		height: 20px;
		width: 20px;
	}
}
.grid_wrap {
	margin-top: 8px;
	.grid_icon {
		width: 42px;
		height: 42px;
	}

	.grid_text {
		margin-top: 6px;
	}
}
.agent_img {
	width: 100%;
	margin: 12px 0;
	border-radius: 8px;
}
.card_wrap {
	display: flex;
	justify-content: space-between;
	.card{
		flex: 1;
		background: url('@/static/image/home/b_icon.svg') no-repeat;
		background-size: 120% 120%;
		background-position: 0% 120%;
		border-radius: 0 0 8px 8px;
		font-size: 14px;
		border-top: 1px solid linear-gradient(131.47deg,#fc5d9f -37.41%,#5863fc 111.11%);
		background-color: #393948;
		padding-bottom: 12px;
		.line {
			height: 1px;
			background: linear-gradient(131.47deg,#fc5d9f -37.41%,#5863fc 111.11%);
		}
		.label {
			color: #fff;
			display: flex;
			align-items: center;
			margin-left: 16px;
			margin-top: 8px;
		}

		.today {
			color: #2cc197;
			font-size: 22px;
			margin: 4px 0 6px;
			margin-left: 16px;
		}

		.unit {
			font-size: 14px;
		}

		.yst {
			font-size: 12px;
			color: #9ba4b7;
			margin-left: 16px;
		}

		&.card2 {
			background: url('@/static/image/home/t_icon.svg') no-repeat top right;
			background-size: 120% 120%;
			background-position: -20% 120%;
			background-color: #393948;
			margin-left: 14px;
		}
	}
}
.list_wrap {
	border-radius: 8px;
	overflow: hidden;
	padding: 0 20px;
	background: rgb(57, 57, 72);

	.list {
		padding: 14px 0;
		display: flex;
		align-items: center;

		&+.list {
			border-top: 1px solid #444459;
		}

		.text {
			flex: 1;
		}

		.list_icon {
			height: 20px;
			margin-right: 10px;
		}

		.u-icon {
			color: #999 !important;
		}

		.sum {
			margin-left: 8px;
		}

		.min {
			height: 14px;
		}
	}
}
</style>