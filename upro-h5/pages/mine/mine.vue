<template>
	<view class="wrap">
		<view class="no_login flex">
			<img class="avatar" src="@/static/image/user/avatar.png" alt="avatar" />
			<text class="text">Hi, 登录或者注册</text>
			<img class="edit" src="@/static/icons/edit.png" alt="edit" />
		</view>
		<view class="card">
			<view class="header">
				<text>账户总资产 0.00 USDT</text>
				<view class="link">
					明细
					<uni-icons size="14" type="right"></uni-icons>
				</view>
			</view>
			<view class="main">
				<view class="item">
					<text class="label">资金账户</text>
					<text class="num">0.00</text>
				</view>
				<view class="item">
					<view class="label">
						<text>点卡账户</text>
						<uni-icons size="18" type="help" @click="togglePass"></uni-icons>
					</view>
					<text class="num">0.00</text>
				</view>
			</view>
		</view>
		<view class="list_wrap">
			<view class="list">
				<img class="list_icon" src="@/static/icons/buy.png" alt="">
				<text class="text">购买点卡</text>
				<uni-icons size="18" type="right"></uni-icons>
			</view>
			<view class="list">
				<img class="list_icon" src="@/static/icons/rake_back.png" alt="">
				<text class="text">节点返佣</text>
				<uni-icons size="18" type="right"></uni-icons>
			</view>
			<view class="list">
				<img class="list_icon" src="@/static/icons/invite.png" alt="">
				<text class="text">邀请好友</text>
				<uni-icons size="18" type="right"></uni-icons>
			</view>
			<view class="list">
				<img class="list_icon" src="@/static/icons/msg.png" alt="">
				<text class="text">消息中心</text>
				<uni-icons size="18" type="right"></uni-icons>
			</view>
			<view class="list">
				<img class="list_icon min" src="@/static/icons/coupon.png" alt="">
				<text class="text">优惠券</text>
				<uni-icons size="18" type="right"></uni-icons>
			</view>
			<view class="list">
				<img class="list_icon" src="@/static/icons/api.png" alt="">
				<text class="text">交易所API授权</text>
				<uni-icons size="18" type="right"></uni-icons>
			</view>
			<view class="list">
				<img class="list_icon min" src="@/static/icons/serve.png" alt="">
				<text class="text">服务</text>
				<uni-icons size="18" type="right"></uni-icons>
			</view>
			<view class="list">
				<img class="list_icon" src="@/static/icons/ques.png" alt="">
				<text class="text">常见问题<img class="list_icon sum" src="@/static/image/home/sum.png" alt=""></img></text>
				<uni-icons size="18" type="right"></uni-icons>
			</view>
		</view>
	</view>
</template>
<script setup>
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { useUserStore } from '@/store/user.js';
import { post } from '@/utils/request';

const { isLoggedIn } = useUserStore()
onPullDownRefresh(() => {
	console.log('onPullDownRefresh')
	console.log('isLoggedIn', isLoggedIn)
	post('/login').catch(err => {
		console.log(err)
	})
	uni.stopPullDownRefresh();
})
</script>

<style lang="scss">
.no_login {
	gap: 8px;
	margin-top: 8px;
	justify-content: flex-start;

	.avatar {
		height: 50px;
		width: 50px;
		border-radius: 12px;
	}

	.text {
		flex: 1;
	}

	.edit {
		height: 20px;
		width: 20px;
	}
}

.card {
	padding: 10px 20px;
	background: url('@/static/image/home/assets_bg.png') no-repeat center center;
	background-size: cover;
	margin: 12px 0;
	font-size: 14px;
	border-radius: 8px;

	.header {
		display: flex;
		justify-content: space-between;
	}

	.main {
		margin-top: 24px;
		display: flex;
		justify-content: space-around;

		.item {
			display: flex;
			flex-direction: column;
			align-items: center;

			.label {
				font-size: 13px;
				color: #CCCCCC;
				display: flex;
				align-items: center;
				gap: 2px;
			}

			.num {
				margin-top: 6px;
				font-size: 18px;
				font-weight: bold;
				background-image: linear-gradient(180deg, #fc5d9f -37.41%, #5863fc 111.11%);
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
			}

			.uni-icons {
				color: #CCCCCC !important;
			}
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
		& + .list {
			border-top: 1px solid #444459;
		}
		.text {
			flex: 1;
		}
		.list_icon {
			height: 20px;
			margin-right: 10px;
		}
		.uni-icons {
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