<template>
	<view class="wrap">
		<!-- <view class="no_login flex" @click="clickHandle">
			<img class="logo_text" src="@/static/image/logo_text.svg" alt="logo" />
			<view>
				<text class="text">登录</text>
				<u-icon size="28" name="arrow-right"></u-icon>
			</view>
		</view> -->
		<u-navbar :height="30" :is-back="false" title="">
			<template v-slot:left>
				<img class="logo_text" src="@/static/image/logo_text.svg" alt="logo" />
			</template>
			<template v-slot:right>
				<view class="logo_r">
					<text class="txt">登录</text>
					<u-icon size="28" name="arrow-right"></u-icon>
				</view>
			</template>
		</u-navbar>
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
		<img class="agent_img" @click="uni.navigateTo({ url: '/pages/activity/join' })"
			src="@/static/image/activity/agent_img.jpg" alt=""></img>
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
		<img class="agent_img" @click="uni.navigateTo({ url: '/pages/activity/risk' })"
			src="@/static/image/activity/risk.png" alt=""></img>
		<view class="rank_wrap">
			<view class="header">
				<text>主流币</text>
				<text>币种排行 <u-icon name="arrow-right" size="24"></u-icon></text>
			</view>
			<view class="rank_label">
				<text>名称</text>
				<text>最新价</text>
				<text>24h涨幅</text>
			</view>
			<view class="rank_item">
				<view class="name">
					<img class="rank_img" src="@/static/image/user/avatar.png" alt=""></img>
					<text class="txt">BTC</text>
				</view>
				<view class="price">$30,000</view>
				<view class="change up">+5.00%</view>
			</view>
			<view class="rank_item">
				<view class="name">
					<img class="rank_img" src="@/static/image/user/avatar.png" alt=""></img>
					<text class="txt">BTC</text>
				</view>
				<view class="price">$30,000</view>
				<view class="change up">+5.00%</view>
			</view>
			<view class="rank_item">
				<view class="name">
					<img class="rank_img" src="@/static/image/user/avatar.png" alt=""></img>
					<text class="txt">BTC</text>
				</view>
				<view class="price">$30,000</view>
				<view class="change up">+5.00%</view>
			</view>
			<view class="rank_item">
				<view class="name">
					<img class="rank_img" src="@/static/image/user/avatar.png" alt=""></img>
					<text class="txt">BTC</text>
				</view>
				<view class="price">$30,000</view>
				<view class="change up">+5.00%</view>
			</view>
			<view class="rank_item">
				<view class="name">
					<img class="rank_img" src="@/static/image/user/avatar.png" alt=""></img>
					<text class="txt">BTC</text>
				</view>
				<view class="price">$30,000</view>
				<view class="change down">-5.00%</view>
			</view>
		</view>
		<view class="notice_wrap">
			<view class="header">
				<text class="signals" :class="{ active: currentSelect === 'signal' }"
					@click="currentSelect = 'signal'">行情信号</text>
				<text class="notice" :class="{ active: currentSelect === 'notice' }" @click="currentSelect = 'notice'">公告</text>
				<text class="active">
					<!-- 查看更多 <u-icon name="arrow-right" size="24"></u-icon> -->
				</text>
			</view>
			<view class="content" v-if="currentSelect === 'notice'">
				<view class="item" v-for="item in noticeData" :key="item.notice_id">
					<view class="title">{{ item.title }}</view>
					<view class="time">{{ uni.$u.timeFormat(item.timestamp, 'mm-dd hh:MM:ss') }}</view>
				</view>
			</view>
			<view class="content" v-else-if="currentSelect === 'signal'">
				<view class="item" v-for="item in signalsData" :key="item.signal_id">
					<view>
						<text class="tips">[行情]</text>
						<text>{{ item.symbol }}</text>
					</view>
					<view class="fields">
						<view v-for="list in item.metadata.fields" :key="list.field_key"
							:class="['list', list.position === 'top' ? 'top' : 'bottom']">
							{{ list.label }}: {{ list.value }}
							<text :style="{ color: list.position === 'top' ? '#2cc197' : '#ff5c5c' }">{{ list.position === 'top' ? '↑'
								: '↓' }}</text>
						</view>
					</view>
					<view class="title">{{ item.detail_text }}</view>
					<view class="time">
						{{ uni.$u.timeFormat(item.timestamp, 'mm-dd hh:MM:ss') }}
						<text class="ago">{{ formatRelativeTime(item.timestamp) }}</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script setup>
import { ref } from 'vue'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { useUserStore } from '@/store/user.js';
import { formatRelativeTime } from '@/utils/index.js';

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

const signalsData = ref([
	{
		"signal_id": "signal_1770212764763_DOGE_sentiment_0",
		"signal_type": "market",
		"timestamp": 1770212764763,
		"symbol": "DOGE",
		"is_member_signal": 0,
		"detail_text": "DOGE情绪数据KOL达到极值，看涨，建议做多（做多）",
		"metadata": {
			"field_type": "sentiment",
			"fields": [
				{
					"field_key": "sentiment_score_kol",
					"label": "看涨",
					"value": 8.25,
					"position": "top",
					"direction": "LONG"
				}
			],
			"turnover24h": null,
			"direction": "LONG"
		},
		"time_ago": "27分钟前"
	},
	{
		"signal_id": "signal_1770212764763_CHZ_sentiment_1",
		"signal_type": "market",
		"timestamp": 1770212764763,
		"symbol": "CHZ",
		"is_member_signal": 0,
		"detail_text": "CHZ情绪数据新闻达到极值，看涨，建议做多（做多）",
		"metadata": {
			"field_type": "sentiment",
			"fields": [
				{
					"field_key": "sentiment_score_news",
					"label": "看涨",
					"value": 8.75,
					"position": "top",
					"direction": "LONG"
				}
			],
			"turnover24h": null,
			"direction": "LONG"
		},
		"time_ago": "27分钟前"
	},
	{
		"signal_id": "signal_1770212764763_TRX_technical_2",
		"signal_type": "market",
		"timestamp": 1770212764763,
		"symbol": "TRX",
		"is_member_signal": 0,
		"detail_text": "TRX技术指标动能处于极值，动能疲软，建议做空（做空）",
		"metadata": {
			"field_type": "technical",
			"fields": [
				{
					"field_key": "technical_score_momentum_1h",
					"label": "动能疲软",
					"value": 3.95,
					"position": "bottom",
					"direction": "SHORT"
				}
			],
			"turnover24h": null,
			"direction": "SHORT"
		},
		"time_ago": "27分钟前"
	},
	{
		"signal_id": "signal_1770212764763_GIGGLE_technical_3",
		"signal_type": "market",
		"timestamp": 1770212764763,
		"symbol": "GIGGLE",
		"is_member_signal": 0,
		"detail_text": "GIGGLE技术指标布林线、吸筹信号、强烈看多、动能、ATR波动、量价达到极值，上穿上轨、吸筹信号、看多、超买、波动剧烈、吸筹信号，建议做多（做多）",
		"metadata": {
			"field_type": "technical",
			"fields": [
				{
					"field_key": "technical_ind_bbands_signal_1h",
					"label": "上穿上轨",
					"value": 9,
					"position": "top",
					"direction": "LONG"
				},
				{
					"field_key": "technical_ind_volprice_signal_1h",
					"label": "吸筹信号",
					"value": 8.4,
					"position": "top",
					"direction": "LONG"
				},
				{
					"field_key": "technical_score_1h",
					"label": "看多",
					"value": 8.37,
					"position": "top",
					"direction": "LONG"
				},
				{
					"field_key": "technical_score_momentum_1h",
					"label": "超买",
					"value": 10,
					"position": "top",
					"direction": "LONG"
				},
				{
					"field_key": "technical_ind_atr_signal_1h",
					"label": "波动剧烈",
					"value": 10,
					"position": "top",
					"direction": "LONG"
				},
				{
					"field_key": "technical_score_volprice_1h",
					"label": "吸筹信号",
					"value": 8.4,
					"position": "top",
					"direction": "LONG"
				}
			],
			"turnover24h": null,
			"direction": "LONG"
		},
		"time_ago": "27分钟前"
	},
	{
		"signal_id": "signal_1770212764763_ZKP_technical_4",
		"signal_type": "market",
		"timestamp": 1770212764763,
		"symbol": "ZKP",
		"is_member_signal": 0,
		"detail_text": "ZKP技术指标RSI、波动率达到极值，超买、价格波动大，建议做多（做多）",
		"metadata": {
			"field_type": "technical",
			"fields": [
				{
					"field_key": "technical_ind_rsi_signal_1h",
					"label": "超买",
					"value": 10,
					"position": "top",
					"direction": "LONG"
				},
				{
					"field_key": "technical_score_volatility_1h",
					"label": "价格波动大",
					"value": 8.68,
					"position": "top",
					"direction": "LONG"
				}
			],
			"turnover24h": null,
			"direction": "LONG"
		},
		"time_ago": "27分钟前"
	},
	{
		"signal_id": "signal_1770212764763_ZIL_technical_5",
		"signal_type": "market",
		"timestamp": 1770212764763,
		"symbol": "ZIL",
		"is_member_signal": 0,
		"detail_text": "ZIL技术指标随机震荡达到极值，动能向上，建议做多（做多）",
		"metadata": {
			"field_type": "technical",
			"fields": [
				{
					"field_key": "technical_ind_stoch_signal_1h",
					"label": "动能向上",
					"value": 8,
					"position": "top",
					"direction": "LONG"
				}
			],
			"turnover24h": null,
			"direction": "LONG"
		},
		"time_ago": "27分钟前"
	},
	{
		"signal_id": "signal_1770212764763_ZAMA_sentiment_6",
		"signal_type": "market",
		"timestamp": 1770212764763,
		"symbol": "ZAMA",
		"is_member_signal": 0,
		"detail_text": "ZAMA情绪数据社交媒体、社交声量达到极值，看涨、8757，建议做多（做多）",
		"metadata": {
			"field_type": "sentiment",
			"fields": [
				{
					"field_key": "sentiment_score_volume",
					"label": "看涨",
					"value": 9.87,
					"position": "top",
					"direction": "LONG"
				},
				{
					"field_key": "sentiment_24h_social_volume",
					"label": "8757",
					"value": 8757,
					"position": "top",
					"direction": "LONG"
				}
			],
			"turnover24h": null,
			"direction": "LONG"
		},
		"time_ago": "27分钟前"
	},
	{
		"signal_id": "signal_1770212764763_FIL_sentiment_7",
		"signal_type": "market",
		"timestamp": 1770212764763,
		"symbol": "FIL",
		"is_member_signal": 0,
		"detail_text": "FIL情绪数据新闻处于极值，看跌，建议做空（做空）",
		"metadata": {
			"field_type": "sentiment",
			"fields": [
				{
					"field_key": "sentiment_score_news",
					"label": "看跌",
					"value": 0,
					"position": "bottom",
					"direction": "SHORT"
				}
			],
			"turnover24h": null,
			"direction": "SHORT"
		},
		"time_ago": "27分钟前"
	},
	{
		"signal_id": "signal_1770212764763_G_technical_8",
		"signal_type": "market",
		"timestamp": 1770212764763,
		"symbol": "G",
		"is_member_signal": 0,
		"detail_text": "G技术指标趋势达到极值，上升趋势，建议做多（做多）",
		"metadata": {
			"field_type": "technical",
			"fields": [
				{
					"field_key": "technical_score_trend_1h",
					"label": "上升趋势",
					"value": 8.28,
					"position": "top",
					"direction": "LONG"
				}
			],
			"turnover24h": null,
			"direction": "LONG"
		},
		"time_ago": "27分钟前"
	}
])

const noticeData = ref([
	{
		"notice_id": "notice_1770209164651_0",
		"timestamp": 1770209164651,
		"title": "系统维护公告",
		"detail_text": "尊敬的用户，您好！为了提升您的使用体验，我们计划于2024年10月1日凌晨2:00至4:00进行系统维护。在此期间，部分服务可能会受到影响。感谢您的理解与支持！",
		"time_ago": "1小时前"
	},
	{
		"notice_id": "notice_1770209164651_1",
		"timestamp": 1770209164651,
		"title": "新功能上线通知",
		"detail_text": "我们很高兴地宣布，平台已上线全新的交易分析工具，帮助您更好地把握市场动态。欢迎前往体验，并期待您的宝贵反馈！",
		"time_ago": "2小时前"
	},
	{
		"notice_id": "notice_1770209164651_2",
		"timestamp": 1770209164651,
		"title": "安全提醒",
		"detail_text": "为了保障您的账户安全，请定期更改密码，并开启双重认证功能。如发现任何异常活动，请立即联系我们的客服团队。",
		"time_ago": "3小时前"
	}
])

const currentSelect = ref('signal');

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
.wrap {
	padding-bottom: 20px;
}

.logo_text {
	margin-left: 20px;
	height: 20px;
}
.logo_r {
	margin-right: 20px;
	.txt {
		margin-right: 6px;
	}
}

.grid_wrap {
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
	margin: 12px 0 10px 0;
	border-radius: 8px;
}

.card_wrap {
	display: flex;
	justify-content: space-between;

	.card {
		flex: 1;
		background: url('@/static/image/home/b_icon.svg') no-repeat;
		background-size: 120% 120%;
		background-position: 0% 120%;
		border-radius: 0 0 8px 8px;
		font-size: 14px;
		border-top: 1px solid linear-gradient(131.47deg, #fc5d9f -37.41%, #5863fc 111.11%);
		background-color: #393948;
		padding-bottom: 12px;

		.line {
			height: 1px;
			background: linear-gradient(131.47deg, #fc5d9f -37.41%, #5863fc 111.11%);
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

.rank_wrap {
	border-radius: 8px;
	overflow: hidden;
	background: #393948;
	padding-bottom: 12px;

	.header {
		padding: 14px 20px;
		display: flex;
		justify-content: space-between;
		font-weight: bold;
		font-size: 16px;
		color: #fff;
	}

	.rank_label {
		padding: 0 20px;
		display: flex;
		justify-content: space-between;
		font-size: 14px;
		color: #999;
	}

	.rank_item {
		padding: 0 20px;
		display: flex;
		justify-content: space-between;
		font-size: 16px;
		align-items: center;
		color: #fff;
		margin-top: 16px;

		.name {
			display: flex;
			align-items: center;
		}

		.txt {
			position: relative;
			left: 6px;
		}

		.rank_img {
			width: 22px;
			height: 22px;
			border-radius: 50%;
		}

		.change.up {
			border-radius: 2px;
			padding: 2px 10px;
			color: #fff;
			background-color: #2cc197;
			font-size: 13px;
		}

		.change.down {
			color: #fff;
			background-color: #ff5c5c;
			border-radius: 2px;
			padding: 2px 10px;
			font-size: 13px;
		}
	}
}

.notice_wrap {
	margin-top: 16px;
	border-radius: 8px;
	overflow: hidden;
	background: #393948;
	padding: 14px 20px;

	.header {
		display: flex;
		align-items: center;
		font-size: 16px;
		color: #999;
		font-weight: bold;

		.active {
			color: #fff;
		}
	}

	.notice {
		flex: 1;
		margin: 0 20px;
	}

	.content {
		min-height: 400px;

		.item {
			padding: 12px 0;
			& + .item {
				border-top: 1px solid #4b4b55;
			}
			.tips {
				background: rgba(26, 123, 202, 0.3);
				color: #0e9cee;
				display: inline-block;
				font-size: 13px;
				padding: 0px 6px;
				height: 24px;
				line-height: 24px;
				border-radius: 4px;
				margin-right: 10px;
			}

			.title {
				color: #fff;
				font-size: 14px;
			}

			.time {
				color: #666f83;
				font-size: 13px;
				margin-top: 4px;

				.ago {
					margin-left: 10px;
				}
			}
		}
	}

	.fields {
		margin: 8px 0;
		display: flex;
		flex-wrap: wrap;
		gap: 8px;

		.list {
			font-size: 13px;
			color: #fff;
			margin-top: 4px;
			padding: 2px 6px;
			border-radius: 4px;

			&.top {
				background-color: rgba(44, 193, 151, 0.2);
			}

			&.bottom {
				background-color: rgba(255, 92, 92, 0.2);
			}
		}
	}
}
</style>