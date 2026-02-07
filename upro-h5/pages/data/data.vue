<template>
	<u-navbar :height="34" :border-bottom="false" :is-back="false" title="">
		<template v-slot:left>
			<view class="logo_text">
				<text v-if="isLoggedIn">收益中心</text>
				<text v-else>收益中心</text>
			</view>
		</template>
		<template v-slot:right>
			<view class="logo_r" v-if="isLoggedIn">
				<u-icon size="44" name="bell"></u-icon>
			</view>
			<view class="logo_r" v-else @click="uni.navigateTo({ url: '/pages/user/login' })">
				<text class="txt">登录</text>
				<u-icon size="28" name="arrow-right"></u-icon>
			</view>
		</template>
	</u-navbar>
	<view class="wrap">
		<view class="card pie_wrap">
			<view class="run_wrap" :class="{ show: showTime }" @click="showTime = !showTime">
				<u-icon size="36" name="clock"></u-icon>
				<text class="txt">已运行0天0小时</text>
			</view>
			<u-image class="img_bg" width="73px" height="96px" src="/static/image/home/data_top_icon.png"></u-image>
			<view class="title">累计收益（USDT）</view>
			<view class="mony">
				<text class="num up">0.00</text>
				<text>≈¥ 0.00</text>
				<view class="pie up_bg">+0%</view>
			</view>
			<view class="footer">
				<view class="list warn">
					<u-icon size="30" name="order"></u-icon>
					<text class="txt">明细</text>
				</view>
				<view class="list">
					<u-icon size="30" name="share"></u-icon>
					<text class="txt">分享</text>
				</view>
				<view class="list warn">
					<u-icon size="30" name="reload"></u-icon>
					<text class="txt">重置</text>
				</view>
			</view>
		</view>
		<view class="card">
			<view class="head">
				<text class="title">收益统计</text>
				<view class="date">
					<u-dropdown active-color="#bf5fc1" inactive-color="#fff" :border-bottom="false">
						<u-dropdown-item v-model="value1" title="时间" :options="optionsDate"></u-dropdown-item>
					</u-dropdown>
				</view>
			</view>
			<view class="head">
				<view class="dropdown_wrap">
					<u-dropdown class="bg" height="26px" active-color="#bf5fc1" inactive-color="#fff" :border-bottom="false">
						<u-dropdown-item v-model="value2" title="距离" :options="optionsData"></u-dropdown-item>
					</u-dropdown>
				</view>
				<view class="date">
					<u-checkbox size="30" v-model="checked" label="隐藏0收益" />
				</view>
			</view>
			<view class="table">
				<view class="tr thead">
					<view class="td name">策略类型</view>
					<view class="td">成交(单)</view>
					<view class="td">收益(USDT)</view>
					<view class="td rate">收益率</view>
				</view>
				<view class="tr" v-for="item in incomeData" :key="item.strategyType">
					<view class="td name">{{ item.strategyType }}</view>
					<view class="td">{{ item.trades }}</view>
					<view class="td">{{ item.income }}</view>
					<view class="td rate">{{ item.incomeRate }}</view>
				</view>
				<view class="empty">暂无收益数据</view>
			</view>
		</view>
		<div class="card">
			<view class="head">
				<text class="title">收益图表</text>
				<picker mode="selector" :range="monthRangeData" :value="month" @change="bindDateChange">
					<view class="date">
						<text class="txt">{{ currentYear }}年{{ month }}月</text>
						<u-icon size="28" name="arrow-down"></u-icon>
					</view>
				</picker>
			</view>
			<div class="content">
				<u-empty text="暂无数据" :icon-size="200" src="/static/image/home/no_data.png" mode="list">
					<template v-slot:bottom>
						<view class="empty-txt">添加策略，开启高额收益</view>
					</template>
				</u-empty>
				<div class="btn_wrap">
					<view class="btn">看他人收益</view>
					<view class="btn primary">去创建策略</view>
				</div>
			</div>
		</div>
	</view>
</template>

<script setup>
import { ref } from 'vue'
import { onPullDownRefresh } from '@dcloudio/uni-app'
import { useUserStore } from '@/store/user.js';
import { optionsDate } from '../../utils/const';
import { dayjs } from '@/uni_modules/iRainna-dayjs/js_sdk/dayjs.min.js'
const showTime = ref(false)
const { isLoggedIn } = useUserStore()
onPullDownRefresh(() => {
	console.log('onPullDownRefresh', {
		month
	})
	console.log('isLoggedIn', isLoggedIn)
	uni.stopPullDownRefresh();
	// uni.navigateTo({ url: '/pages/mine/set' })
})

// 定义选项数据
const optionsData = ref([
	{
		label: '默认排序',
		value: 1,
	},
	{
		label: '距离优先',
		value: 2,
	},
	{
		label: '价格优先',
		value: 3,
	}
])

// 收益数据
const incomeData = ref([
	{
		strategyType: '网格交易',
		trades: 10,
		income: 5.00,
		incomeRate: '2%'
	},
	{
		strategyType: '现货交易',
		trades: 8,
		income: 3.50,
		incomeRate: '1.5%'
	},
	{
		strategyType: '杠杆交易',
		trades: 5,
		income: 4.20,
		incomeRate: '2.8%'
	}
])

const currentYear = new Date().toISOString().slice(0, 4)
const currentMonth = new Date().toISOString().slice(5, 7);
const month = ref(+currentMonth);
const monthRangeData = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].filter(item => item <= month.value).map(v => v + '月');
const bindDateChange = (e) => {
	month.value = e.detail.value + 1
}
</script>

<style lang="scss" scoped>
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

.card.pie_wrap {
	position: relative;
	background: linear-gradient(89.84deg, rgba(137, 130, 208, 0.3) 0.17%, rgba(122, 127, 208, 0.3) 50.55%, rgba(87, 106, 185, 0.3) 99.9%);
	overflow: hidden;

	.run_wrap {
		position: absolute;
		left: 100%;
		height: 26px;
		border-radius: 12px 0 0 12px;
		background: hsla(0, 0%, 100%, .18);
		box-shadow: 0 4px 4px 0 hsla(0, 0%, 100%, .25) inset, 0 -1px 1px 0 hsla(0, 0%, 100%, .35) inset;
		-webkit-backdrop-filter: blur(7px);
		backdrop-filter: blur(7px);
		display: flex;
		align-items: center;
		font-size: 13px;
		padding: 0 8px;
		transform: translateX(-26%);
		width: auto;
		transition: transform ease .3s;

		&.show {
			transform: translateX(-100%);

			.txt {
				opacity: 1;
			}
		}

		.txt {
			margin-left: 4px;
			white-space: nowrap;
			opacity: 0;
		}
	}

	.img_bg {
		position: absolute;
		right: 10%;
		top: 50%;
		transform: translateY(-50%);
	}

	.title {
		font-weight: bold;
	}

	.mony {
		margin: 18px 0;
		display: flex;
		align-items: center;

		.num {
			font-size: 20px;
			margin-right: 6px;
		}

		.pie {
			border-radius: 10px;
			font-size: 12px;
			padding: 0 6px;
			margin-left: 10px;
		}
	}

	.footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 13px;

		.list {
			border: 1px solid #eee;
			border-radius: 6px;
			display: flex;
			align-items: center;
			padding: 4px 22px;
			background-color: rgba(255, 255, 255, 0.18);

			.txt {
				margin-left: 4px;
			}

			&.warn {
				color: #ffef60;
				border-color: #ffef60;
			}
		}
	}
}

.empty {
	margin: 30px auto 20px;
	text-align: center;
	font-size: 15px;
}

.table {
	font-size: 13px;
	margin-top: 6px;

	.thead {
		font-size: 14px;
	}

	.tr {
		display: flex;
		padding: 6px 0;
		border-bottom: 1px solid var(--u-border-color);

		&:first-child {
			border-bottom: 1px solid var(--u-border-color);
		}

		.td {
			flex: 1;
			text-align: center;
			white-space: nowrap;

			&.name {
				text-align: left;
			}

			&.rate {
				text-align: right;
				font-size: 13px;
			}
		}
	}
}

.card {
	.head {
		display: flex;
		justify-content: space-between;
		align-items: center;

		.title {
			font-size: 16px;
			color: #FFFFFF;
			font-weight: bold;
		}

		.date {
			display: flex;
			align-items: center;

			.txt {
				font-size: 14px;
				color: #fff;
				margin-right: 4px;
			}
		}
	}

	.content {
		min-height: 320px;
		display: flex;
		flex-direction: column;
		justify-content: center;

		.empty-txt {
			color: var(--u-light-color);
			;
		}
	}
}

.btn_wrap {
	display: flex;
	align-items: center;
	justify-content: center;
	margin-top: 30px;

	.btn {
		margin: 0 20px;
		padding: 10px 20px;
		border: 1px solid #CCCCCC;
		border-radius: 8px;
		font-size: 15px;
		color: #fff;
		border: 1px solid $uni-color-primary;

		&.primary {
			background: linear-gradient(131.47deg, #fc5d9f -37.41%, #5863fc 111.11%);
			border-color: transparent;
		}
	}
}
</style>