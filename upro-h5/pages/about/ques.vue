<template>
	<u-navbar title="常见问题"></u-navbar>
	<view class="wrap">
		<view class="item">
			<u-collapse>
				<u-collapse-item title="新手必读">
					<template v-slot:title>
						<view class="header">
							<text class="txt">新手必读</text>
							<img class="icon" src="@/static/image/home/remind.png" alt="edit" />
						</view>
					</template>
					<view class="content">
						<text class="txt">
							1.合约交易策略属于高频对冲交易，不判断行情，不猜涨跌，通过价格的波动持续套利，所以本金可能会有一定的浮动，浮动多少跟行情相关，持续运行本金会慢慢变多，新手能接受再开启。
							<text class="red">切勿经常手动操作会影响机器人运行导致收益降低还会增大风险。</text>
							另外购买点卡后不能退款，所以决定长期使用后再购买点卡，可以先充值到燃料账户启动运行。
							<br><text class="red">2.请谨慎在交易所手动挪用资金，</text>划转后会导致机器人交易异常，无法正常开单，严重情况会有爆仓风险。
							<br>3.机器人累计仓位是复杂和缓慢的，系统会自动布局，周期较长，对利润也有精确计算，新手不要频繁删除机器人重新添加，没有浮亏不代表已经将盈利全部结算，仓位就是未来的利润，没有仓位就没有利润。当行情来时，失去更多盈利的仓位，利润就会降低许多。
						</text>
					</view>
				</u-collapse-item>
			</u-collapse>
		</view>
		<view class="item">
			<u-collapse>
				<u-collapse-item title="UPro产品介绍">
					<view class="content">
						<text class="txt">
							我们的产品就属于量化策略交易，全自动交易，不需要设置，不需要手动开平仓，将交易所API绑定到我们平台，授权交易权限就可以了。本金收益全在交易所，安全无风险。软件免费使用，收益时扣取利润分成，扣取每笔盈利的25%！我们没有直接扣取利润的权限，所以需要会员提前在APP充值一些USDT。充值的USDT可以用来充当燃料或是购买点卡。
						</text>
					</view>
				</u-collapse-item>
			</u-collapse>
		</view>
		<view class="item">
			<u-collapse>
				<u-collapse-item title="专属用户介绍">
					<view class="content">
						<text class="txt">
							Okx专属用户：通过OKX专属链接（https://www.ouxyi.io/ul/6CngT5?channelId=UPLUS3）或邀请码（UPLUS3）注册的交易所会员。%！我们没有直接扣取利润的权限，所以需要会员提前在APP充值一些USDT。充值的USDT可以用来充当燃料或是购买点卡。
							<br> 币安专属用户：2020年5月1日以后注册的币安账户并且未绑定其它平台邀请码，即可校验成功成为UPLUS专属用户；如未通过验证，请用此链接注册：（https://accounts.marketwebb.net/register?ref=37664683）或注册时填写平台邀请码:（37664683），即可通过验证。 
							<br> 专属用户权益：专属用户享受限时85%燃料费折扣。
						</text>
					</view>
				</u-collapse-item>
			</u-collapse>
		</view>
		<view class="item">
			<u-collapse>
				<u-collapse-item title="启动机器人需要什么条件">
					<view class="content">
						<text class="txt">
							燃料或是点卡必须要大于等于本金的10%才可以启动机器人
						</text>
					</view>
				</u-collapse-item>
				<u-collapse-item title="机器人非正常运行的情况">
					<template v-slot:title>
						<view class="header">
							<text class="txt">机器人非正常运行的情况</text>
							<img class="icon" src="@/static/image/home/remind.png" alt="edit" />
						</view>
					</template>
					<view class="content">
						<text class="txt">
							1.随市场行情的波动，策略会出现浮亏，此时保证金占比增加，仓位可用资金减少，会导致资金不足，从而机器人无法正常运行，减少收益；请密切关注交易情况，必要时建议及时增加保证金，避免爆仓。
							<br>2.机器人进行交易过程中，如手动在交易所转移资金，会导致仓位不足不能开单，那么机器人无法正常运行，严重情况会有爆仓风险；需尽快将转移的资金转回交易所，保证机器人正常运行。
							<br>3.UPlus从数学层面，在黄金分割、Monsky定理的基础上设计了止损规则，对盈亏关系完美平衡，跳出短期盈亏的纠结，从更长远的时间角度来实现超额收益；为此，止损是机器人的正常操作机制，而止损后仓位不足导致的收益降低、机器人无法正常运行这些问题可通过补齐仓位来解决。
						</text>
					</view>
				</u-collapse-item>
				<u-collapse-item title="机器人和网格交易、马丁交易有什么区别">
					<view class="content">
						<text class="txt">
							假如说UP的策略是个木屋 ，那么网格和马丁仅仅是搭建木屋的木材之一，并非全部。 网格策略无法实现收益和风险的统一。如果要降低风险，就需要设置更多的网格，但收益也会相应降低。 马丁策略非常危险。如果市场波动较小，只能用5%的仓位交易，以保留加仓空间，这导致大部分仓位闲置。如果初始仓位过高，即使小波动也会导致全仓交易，风险巨大。 真正的量化交易并不仅仅是简单的网格和马丁策略，而是一个完整闭环的系统。这个系统包括仓位管理系统、风险控制系统、动态参数系统、均衡锁仓系统等等，各个组件之间相互配合，应对复杂多变的市场行情。此外，还需要进行许多数学计算和方程式，以确保每一笔交易都能盈利。 
						</text>
					</view>
				</u-collapse-item>
			</u-collapse>
		</view>
		<view class="item">
			<u-collapse>
				<u-collapse-item title="策略选择说明">
					<view class="content">
						<text class="txt">
							策略分为合约和现货两种，合约赚USDT，现货赚币量。合约量化考虑策略的稳定性暂时只上线了部分币种，不过交易赚取的是USDT，选哪个交易对关系不大。现货适用于全部币种！%！我们没有直接扣取利润的权限，所以需要会员提前在APP充值一些USDT。充值的USDT可以用来充当燃料或是购买点卡。
						</text>
					</view>
				</u-collapse-item>
				<u-collapse-item title="合约策略交易概括说明">
					<view class="content">
						<text class="txt">
							交易策略简单理解属于多空对冲套利，通过“独家数学模型”来精准把握买进及卖出机会，从而实现精细化的仓位管理、强大的风险控制和灵活的行情捕捉。从宏观角度看，策略可适应绝大部分行情，通过在大部分行情里的高收益覆盖小概率行情中的亏损，以保证长期运行中的高收益率。%！我们没有直接扣取利润的权限，所以需要会员提前在APP充值一些USDT。充值的USDT可以用来充当燃料或是购买点卡。
						</text>
					</view>
				</u-collapse-item>
				<u-collapse-item title="合约策略的浮亏说明">
					<template v-slot:title>
						<view class="header">
							<text class="txt">合约策略的浮亏说明</text>
							<img class="icon" src="@/static/image/home/remind.png" alt="edit" />
						</view>
					</template>
					<view class="content">
						<text class="txt">
							合约策略2.9.5版本及闪电版都优化了交易逻辑，为了抵抗风险增加了组合订单，初始会亏损平一部分，到后期会补齐亏损后盈利结束，过程中也会导致交易账户浮亏较大，初期盈利抵不过浮亏，所以机器人需要长期使用，不能随意操作、关停。
						</text>
					</view>
				</u-collapse-item>
				<u-collapse-item title="修改策略仓位说明">
					<template v-slot:title>
						<view class="header">
							<text class="txt">修改策略仓位说明</text>
							<img class="icon hot" src="@/static/image/home/hot.png" alt="edit" />
						</view>
					</template>
					<view class="content">
						<text class="txt">
							当前修改仓位只可以增加不能减少。在当前策略找到修改策略，点击修改策略，输入新的USDT金额，点击确认修改即可！。修改后新仓位可能不会立即生效，而是保证策略正常运行的情况下逐步更新完成。
						</text>
					</view>
				</u-collapse-item>
				<u-collapse-item title="止损说明">
					<template v-slot:title>
						<view class="header">
							<text class="txt">止损说明</text>
							<img class="icon hot" src="@/static/image/home/hot.png" alt="edit" />
						</view>
					</template>
					<view class="content">
						<text class="txt">
							策略设置不止损：
							<br>想要扛单至行情回调可选择不止损。策略使用的是全仓保证金，可能会亏掉交易账户仓位设置以外的保证金，需留意风险。
							策略设置止损：
							<br>部分止损：策略风险较高时会平掉部分持仓，平掉的浮亏会转为实亏。可能会发生多次止损，最大止损75%的持仓。止损后程序还会继续运行开单，剩余持仓也有继续亏损的可能性。
							<br>止损：策略风险较高时会平掉部分持仓，平掉的浮亏会转为实亏。可能会发生多次止损，最大止损100%的持仓。全部止损可有效防止爆仓，运行时间越长止损后剩余的仓位越多。
						</text>
					</view>
				</u-collapse-item>
				<u-collapse-item title="合约机器人补亏损的情况说明">
					<view class="content">
						<text class="txt">
							用户设置止损后，系统默认用每笔盈利资金的70%去补亏损。当然，用户也可自行设置补亏损比例。若您设置补亏损为0，产生实际亏损后系统就不会再去补亏损，后期需要手动补齐。%！我们没有直接扣取利润的权限，所以需要会员提前在APP充值一些USDT。充值的USDT可以用来充当燃料或是购买点卡。
						</text>
					</view>
				</u-collapse-item>
				<u-collapse-item title="合约机器人风险等级设置的情况说明">
					<view class="content">
						<text class="txt">
							风险等级越高，收益和风险越高，风险等级越低，收益越低越稳定；<br>若仓位足够则默认风险等级为70%，仓位越大可调的风险等级范围越大，仓位越小可调的风险等级越小；<br>请注意，当前策略风险等级设置后不可修改，如需修改需创建新的策略 !
						</text>
					</view>
				</u-collapse-item>
				<u-collapse-item title="关于用户对策略问题误解的解释说明">
					<view class="content">
						<text class="txt">
							1. 策略就是网格加马丁 ？
							<br>策略是有很多层级的，包含网格和马丁这两个元素，如果策略是个木屋，那么网格和马丁仅仅是搭建木屋的木材之一。
							<br>2. 稍微单边波动大一点就要爆仓 ？
							<br>交易所看到的爆仓价不是策略实际的爆仓价，系统检测到风险会止损的，止损后会释放保证金，策略也有斩仓机制，会慢慢消化风险的，并不会在交易所显示的爆仓价爆仓。
							<br>3. 策略什么时候止损什么时候均衡锁仓 ？
							<br>策略检测到风险会触发风控机制：为了保证长期的盈亏比，风控机制不会过于频繁的触发；风控系统有很多层级和阶段，不同的风险警报会触发不同的风控功能。比如止损会有很多次，贯穿于策略大部分的运行周期，均衡锁仓通常发生在策略的尾部周期。
							<br>4. 策略的详细说明 ？
							<br>U+策略自上线以来不断的有同行打探，我们不能任由团队多年的心血被他人窃取，所以对策略的核心机制进行了保密。用户可能会由于对策略的不理解而手动操作影响了策略的正常运行，对此我们感到很抱歉。我们也在听取用户意见不断完善客服和运营系统，有任何疑问欢迎随时与我们取得联系。
							<br>5. 机器人怎么每次还没涨多少就开那么多空单，很容易爆仓啊 ？
							<br>策略盈利的核心是创造赢大于亏的盈亏比，在一级行情（大多数的行情波动区间）里要频繁开单创造高收益，如果超出一级行情会进行止损和斩仓，虽然止损会产生亏损，但是一级行情里的盈利会覆盖掉这部分亏损，微观上是亏损了，但策略追求的是宏观上的长期盈利。
							<br>6. 策略只能适应震荡行情不能适应单边行情 ？
							<br>同一套参数确实难以匹配全部行情，研发团队会根据行情特点不断调整优化参数，策略在任何行情都可以运行。
						</text>
					</view>
				</u-collapse-item>
				<u-collapse-item title="机器人开启后如果有浮亏多久可以抹平">
					<template v-slot:title>
						<view class="header">
							<text class="txt">机器人开启后如果有浮亏多久可以抹平</text>
							<img class="icon" src="@/static/image/home/remind.png" alt="edit" />
						</view>
					</template>
					<view class="content">
						<text class="txt">
							一般根据所选的币种行情来决定，不是所有账户启动时都有浮亏，启动时在上涨行情中，必然是浮盈的。 只有处于下波动时会看见浮亏，可能启动了一段时间以后有5%利润，但这两个星期处于下行趋势，浮亏可能会超过5%，但由于我们一股启动的币种均为主流币或者币种市值较大，支撑性强，流动性好，所以浮亏不会无限扩大，通过在行情的震荡之中依然可以实现套利。 不管是上涨还是下跌，资金账户等于利润账户，这里面是一直在增长的，可以简单理解为我们的利润就在K线的波动之中，如果没有波动，那么自然也就不会有利润。 按照实际使用的结果来说，一般运行3个月左右以后，即使遇见持续下跌3个月，仓位也几乎属于持平的状态，因为3个月收益总计为30%左右，那么行情需要下跌80%-110%(期现2.0版本/期现闪电版本)以上才会超过覆盖范围，这几乎很难达到，实际情况一般都不会持续下跌超过30%。 跌有底，涨无限，中间是震荡的，有震荡就有利润，所以整个策略的安全性和持续性非常强！ 放眼整个加密领域的发展和推进，我们的策略程序能预见已知或者潜在的风险，将风险从未知搬到台面上来，让用户能够直观的看见，做到心中有数。 
						</text>
					</view>
				</u-collapse-item>
				<u-collapse-item title="总资金是亏损的，为什么机器人显示盈利">
					<template v-slot:title>
						<view class="header">
							<text class="txt">总资金是亏损的，为什么机器人显示盈利</text>
							<img class="icon" src="@/static/image/home/remind.png" alt="edit" />
						</view>
					</template>
					<view class="content">
						<text class="txt">
							只要做交易就必然有浮亏，他不是银行理财把本金放在那不动 它是用软件在交易，有交易必然就有持仓，有持仓就会有价格浮动，价格浮动本金肯定是浮动的。 浮亏是反映了市场价格的波动。投资者应该认识到，浮亏并不等同于实际亏损，只有当交易结束时，才能确定最终的盈亏情况。 
						</text>
					</view>
				</u-collapse-item>
			</u-collapse>
		</view>
		<view class="item">
			<u-collapse>
				<u-collapse-item title="交易所持仓没有浮亏就一定没有浮亏吗？">
					<template v-slot:title>
						<view class="header">
							<text class="txt">交易所持仓没有浮亏就一定没有浮亏吗？</text>
							<img class="icon hot" src="@/static/image/home/hot.png" alt="edit" />
						</view>
					</template>
					<view class="content">
						<text class="txt">
							不是的。交易所的计算方式跟策略的不一样，交易所按均价算，机器人按每一单算。 比如，10元时开1张，跌至5元时再补1张，这时交易所均价7.5，价格涨至6元卖出后补的5元那1张。等到价格涨至7.5时交易所就显示没有浮亏了，但是实际成本价是在10元，要涨至10元才等于是回本。 所以交易所没有浮亏也不一定真的是没有浮亏。这也是交易所资金账户余额加上浮亏不等于初始本金的原因。交易中的浮亏是正常的，它反映了市场价格的波动。投资者应该认识到，浮亏并不等同于实际亏损，只有当交易结束时，才能确定最终的盈亏情况。
						</text>
					</view>
				</u-collapse-item>
				<u-collapse-item title="">
					<template v-slot:title>
						<view class="header">
							<text class="txt">交易所历史订单里为什么会有亏损平仓，<br>是不是多扣费了？</text>
							<img class="icon" src="@/static/image/home/remind.png" alt="edit" />
						</view>
					</template>
					<view class="content">
						<text class="txt">
							交易所的计算方式跟策略的计算方式不一样。 交易所是把所有的机器人仓位合在了一起，它不会细致的去区分我们每个单子，只是笼统的去计算均价，按均价去进行计算我们的平仓价； 而策略细分了很多机器人在跑，每个都是独立的。所有的订单都是由程序在自动记录，每个订单自动独立处置，虽然交易所出售的订单在历史记录显示亏损了，但实际的结果我们是盈利的，机器人保证每一单都是赚钱的，所以用户会看见每笔订单成交以后都会自动将利润划转到资金账户，每个标的每天少则100-200单多则200-600单的交易/利润划转次数。 因此，机器人收费不计算浮盈或者浮亏，按订单收费，每一单都赚钱，所以是不会多收费的。 
						</text>
					</view>
				</u-collapse-item>
			</u-collapse>
		</view>
		<view class="item">
			<u-collapse>
				<u-collapse-item title="扣费说明">
					<template v-slot:title>
						<view class="header">
							<text class="txt">扣费说明</text>
							<img class="icon hot" src="@/static/image/home/hot.png" alt="edit" />
						</view>
					</template>
					<view class="content">
						<text class="txt">
							软件免费使用，收益时扣取利润分成，扣取每笔盈利的25%！我们没有直接扣取利润的权限，所以需要会员提前在APP充值一些USDT。充值的USDT可以用来充当燃料或是购买点卡。点卡跟燃料都是用来扣取利润分成的！
						</text>
					</view>
				</u-collapse-item>
				<u-collapse-item title="点卡和燃料费说明">
					<template v-slot:title>
						<view class="header">
							<text class="txt">点卡和燃料费说明</text>
							<img class="icon hot" src="@/static/image/home/hot.png" alt="edit" />
						</view>
					</template>
					<view class="content">
						<text class="txt">
							点卡和燃料都是用来扣取利润分成的。收益时扣取点卡或是燃料费来抵扣利润。区别在于购买点卡时有折扣，但如果有剩余是不能提走，而燃料没有折扣有剩余可以提走!
						</text>
					</view>
				</u-collapse-item>
				<u-collapse-item title="提现说明">
					<view class="content">
						<text class="txt">
							提现需要人工审核及多次验证，再通过邮箱回复确认信息，回复“确认”后7个工作日内到账，节假日顺延！
						</text>
					</view>
				</u-collapse-item>
			</u-collapse>
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
		.text {
			white-space: pre-wrap;
			position: relative;
			top: -5px;
		}
	}
	.header {
		padding: 4px 0;
		.txt {
			margin-right: 5px;
		}
		.icon {
			width: 15px;
		}
		.hot {
			width: 12px !important;
		}
	}
	.wrap {
		padding-bottom: 50px;
	}
</style>
