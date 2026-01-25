<template>
	<uni-nav-bar left-icon="left" @clickLeft="() => { uni.navigateBack() }" title="常见问题"></uni-nav-bar>
	<view class="wrap">
		<view class="item">
			<uni-collapse>
				<uni-collapse-item title="新手必读">
					<template v-slot:title>
						<view class="header">
							<text class="text">新手必读</text>
							<img class="icon" src="@/static/image/home/remind.png" alt="edit" />
						</view>
					</template>
					<view class="content">
						<text class="text">
							1.合约交易策略属于高频对冲交易，不判断行情，不猜涨跌，通过价格的波动持续套利，所以本金可能会有一定的浮动，浮动多少跟行情相关，持续运行本金会慢慢变多，新手能接受再开启。
							<text class="red">切勿经常手动操作会影响机器人运行导致收益降低还会增大风险。</text>
							另外购买点卡后不能退款，所以决定长期使用后再购买点卡，可以先充值到燃料账户启动运行。
							\n<text class="red">2.请谨慎在交易所手动挪用资金，</text>划转后会导致机器人交易异常，无法正常开单，严重情况会有爆仓风险。
							\n3.机器人累计仓位是复杂和缓慢的，系统会自动布局，周期较长，对利润也有精确计算，新手不要频繁删除机器人重新添加，没有浮亏不代表已经将盈利全部结算，仓位就是未来的利润，没有仓位就没有利润。当行情来时，失去更多盈利的仓位，利润就会降低许多。
						</text>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
		<view class="item">
			<uni-collapse>
				<uni-collapse-item title="UPro产品介绍">
					<view class="content">
						<text class="text">
							我们的产品就属于量化策略交易，全自动交易，不需要设置，不需要手动开平仓，将交易所API绑定到我们平台，授权交易权限就可以了。本金收益全在交易所，安全无风险。软件免费使用，收益时扣取利润分成，扣取每笔盈利的25%！我们没有直接扣取利润的权限，所以需要会员提前在APP充值一些USDT。充值的USDT可以用来充当燃料或是购买点卡。
						</text>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>
	</view>
</template>

<script setup>

</script>

<style lang="scss">
	.item {
		padding: 0 16px;
		background-color: #393948 !important;
		border-radius: 8px;
		overflow: hidden;
		& + .item {
			margin-top: 12px;
		}
	}
	.red {
		color: rgb(225, 32, 32);
	}
	.content{
		line-height: 1.8;
		font-size: 14px;
		opacity: 0.8;
	}
	.header {
		padding: 12px 0;
		.text {
			margin-right: 5px;
		}
		.icon {
			width: 16px;
			height: 16px;
		}
	}
</style>
