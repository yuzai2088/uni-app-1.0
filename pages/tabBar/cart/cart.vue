<template>
	<!-- 购物列表 -->
	<view class="goods-list">
		<view v-if="cartList.length==0" class="empty">
			购物车空空如也~
		</view>
		<view class="row" v-for="(item,index) in cartList" :key="index">
			<!-- 删除按钮 -->
			<view class="menu" @tap="handleDelete(item)">
				<view class="icon iconfont">
					&#xe759;
				</view>
			</view>
			<!-- 商品列表 -->
			<view class="production" @touchstart="handleTouchStart(index,$event)" @touchmove="handleTouchMove(index,$event)"
			 @touchend="handleTouchEnd(index,$event)" :class="[theIndex == index ? 'open' : oldIndex == index ? 'close' : '']">
				<view class="container" @tap="handleCheckbox(item)">
					<!-- 单选框 -->
					<view class="checkbox">
						<view :class="{'on':item.selected}"></view>
					</view>
				</view>
				<!-- 商品详情 -->
				<view class="goods-info" @tap="handleGoodsinfo(item)">
					<view class="img">
						<image :src="item.img" mode=""></image>
					</view>
					<view class="info">
						<view class="title">
							{{item.name}}
						</view>
						<view class="spec">{{item.spec}}</view>
						<view class="price-number">
							<view class="price">￥{{item.price}}</view>
							<counter @sub="sub(item)" @add="add(item)" :goodsinfo="item" @change="sum" />
						</view>
					</view>
				</view>
			</view>
			<!-- 底部footer -->
			<view class="footer" :style="{bottom:footerbottom}">
				<view class="container" @tap="handleSeletedAll">
					<!-- 单选框 -->
					<view class="checkbox">
						<view :class="{'on':isAllselected}"></view>
					</view>
					<view class="text">全选</view>
				</view>
				<view @tap="handleDeleteAll" class="delBtn" v-if="selectedList.length>0">
					删除
				</view>
				<view class="settlement">
					<view class="sum">
						合计：<view class="money">
							{{sumPrice}}
						</view>
					</view>
					<view @tap="account" class="btn">
						结算{{selectedList.length}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import counter from "../../../components/counter.vue"
	export default {
		components: {
			counter,
		},
		data() {
			return {
				footerbottom: 0,
				cartList: [],
				theIndex: null, // 控制滑动效果 当前滑动下标
				oldIndex: null, // 上一个左滑下标
				selectedList: [],
				isAllselected: false,
				sumPrice: 0.00
			}
		},
		onShow() {
			// 获取本地缓存
			uni.getStorage({
				key: "cartList",
				success: (res => {
					// console.log(res)
					for (let i = 0; i < res.data.length; i++) {
						res.data[i].selected = false;
					}
					this.cartList = res.data;

					// 属性数据初始化
					this.selectedList = [];
					this.isAllselected = false;
					this.sumPrice = "0.00";
				})
			})
		},
		onLoad() {
			// 兼容H5底部菜单
			// #ifdef H5
			this.footerbottom = document.getElementsByTagName("uni-tabbar")[0].offsetHeight + "px"
			// #endif
		},
		methods: {
			add(item) {
				item.number++;
				this.sum()
			},
			sub(item) {
				if (item.number <= 1) {
					return
				}
				item.number--;
				this.sum()
			},
			// 结算
			account() {
				// 需要判断
				if (this.selectedList < 1) { //没有商品
					uni.showToast({
						title: "还未选择购买商品",
						icon: "none"
					})
					return;
				}
				// 有商品 先进行本地存储
				uni.setStorage({
					key: "accountList",
					data: this.selectedList,
					success: () => { //跳转结算页
						uni.navigateTo({
							url: "../../goods/goods-account"
						})
					}
				})



			},
			// 全删
			handleDeleteAll() {
				for (let i = 0; i < this.selectedList.length; i++) {
					let item = this.selectedList[i]
					this.handleDelete(item)
				}

				this.selectedList = [];
				this.isAllselected = false;
				this.sum();
			},
			// 左滑删除
			handleDelete(item) {
				uni.getStorage({
					key: "cartList",
					success: (res) => {
						res.data.splice(res.data.indexOf(item, 1));
						uni.setStorageSync("cartList", res.data);
					}
				})

				// 更新数组
				this.cartList.splice(this.cartList.indexOf(item), 1);
				this.selectedList.splice(this.selectedList.indexOf(item), 0)

				this.oldIndex = null;
				this.theIndex = null;

				this.sum();
			},
			// 合计
			sum() { // 合计
				this.sumPrice = 0;
				this.cartList.forEach((item, i) => {
					if (item.selected) {
						this.sumPrice = this.sumPrice + (item.number * item.price)
					}
				})
				this.sumPrice = this.sumPrice.toFixed(2);
			},

			// 全选
			handleSeletedAll() {
				this.isAllselected = !this.isAllselected;
				let arr = [];
				this.cartList.forEach((item, index0) => {
					item.selected = this.isAllselected;
					arr.push(item);
				})

				this.selectedList = this.isAllselected ? arr : [];
				this.sum()

			},
			// 单选框
			handleCheckbox(item) {
				// console.log(item)
				item.selected = !item.selected
				// 判断是否包含改元素
				let flag = this.selectedList.indexOf(item);
				if (flag > -1) {
					this.selectedList.splice(flag, 1)
				} else {
					//push 数组
					this.selectedList.push(item);
				}

				// 全选状态
				if (this.selectedList.length == this.cartList.length) {
					this.isAllselected = true;
				} else {
					this.isAllselected = false;
				}

				this.sum()

			},
			// 点击列表跳详情
			handleGoodsinfo(item) {
				uni.navigateTo({
					url: "../../goods/goods-detail?goodsinfo=" + JSON.stringify(item)
				})
			},
			handleTouchStart(index, event) {
				// console.log(event)
				// 多点触控 不触发
				if (event.touches.length > 1) {
					return;
				}
				this.oldIndex = this.theIndex;
				this.theIndex = null;

				// 初始化坐标
				this.initXY = [event.touches[0].pageX, event.touches[0].pageY];
			},
			//滑动
			handleTouchMove(index, event) {
				// console.log("move")
				if (event.touches.length > 1) {
					return;
				}
				//移动位置
				let moveX = event.touches[0].pageX - this.initXY[0];
				let moveY = event.touches[0].pageY - this.initXY[1];

				//滑动位置过下不触发
				//左滑
				if (moveX < 0) {
					this.theIndex = index
				} else {
					this.oldIndex = this.theIndex;
					this.theIndex = null;
				}
			},
			handleTouchEnd(index, event) {
				// console.log("end")
			},

		}
	}
</script>

<style lang="scss">
	.container {
		display: flex;
		align-items: center;

		.checkbox {
			width: 35upx;
			height: 35upx;
			border-radius: 100%;
			border: solid 2upx #f06c7a;
			display: flex;
			justify-content: center;
			align-items: center;

			.on {
				width: 25upx;
				height: 25upx;
				border-radius: 100%;
				background-color: #f06c7a;
			}
		}

		.text {
			font-size: 28upx;
			margin-left: 10upx;
		}
	}


	.goods-list {
		width: 100%;
		padding: 20upx 0 120upx 0;

		.empty {
			width: 100%;
			height: 60upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 32upx;
			color: #a7a7a7;
		}

		.row {
			width: calc(92%);
			height: calc(22vw + 40upx);
			margin: 20upx auto;

			border-radius: 15upx;
			box-shadow: 0upx 5upx 20upx rgba(0, 0, 0, 0.1);
			display: flex;
			align-items: center;
			position: relative;
			overflow: hidden;
			z-index: 4;
			border: 0;

			.menu {
				.icon {
					color: #fff;
					font-size: 60upx;
				}

				position: absolute;
				width: 30%;
				height: 100%;
				right: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: red;
				color: #fff;
				z-index: 2;
			}

			.production {
				@keyframes showMenu {
					0% {
						transform: translateX(0);
					}

					100% {
						transform: translateX(-30%);
					}
				}

				@keyframes closeMenu {
					0% {
						transform: translateX(-30%);
					}

					100% {
						transform: translateX(0);
					}
				}

				&.open {
					animation: showMenu 0.25s linear both;
				}

				&.close {
					animation: closeMenu 0.15s linear both;
				}

				background-color: #fff;

				.container {
					padding-left: 20upx;
					flex-shrink: 0;
					height: 22vw;
					margin-right: 20upx;
				}

				position: absolute;
				width: 100%;
				padding: 0 0;
				height: 100%;
				z-index: 3;
				display: flex;
				align-items: center;

				.goods-info {
					width: 100%;
					display: flex;
					padding-right: 20upx;

					.img {
						width: 22vw;
						height: 22vw;
						border-radius: 10upx;
						overflow: hidden;
						flex-shrink: 0;
						margin-right: 10upx;

						image {
							width: 22vw;
							height: 22vw;
						}
					}

					.info {
						width: 100%;
						height: 22vw;
						overflow: hidden;
						display: flex;
						flex-wrap: wrap;
						position: relative;

						.title {
							width: 100%;
							font-size: 28upx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							// text-align: justify;
							overflow: hidden;
						}

						.spec {
							font-size: 20upx;
							background-color: #f3f3f3;
							color: #a7a7a7;
							height: 30upx;
							display: flex;
							align-items: center;
							padding: 0 10upx;
							border-radius: 15upx;
							margin-bottom: 20vw;
						}

						.price-number {
							position: absolute;
							width: 100%;
							bottom: 0upx;
							display: flex;
							justify-content: space-between;
							align-items: flex-end;
							font-size: 28upx;
							height: 60upx;

							.price {}

						}
					}
				}
			}
		}
	}

	.footer {
		width: 92%;
		padding: 0 4%;
		background-color: #fbfbfb;
		height: 100upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		font-size: 28upx;
		position: fixed;
		bottom: 0upx;
		z-index: 5;

		.delBtn {
			border: solid 1upx #f06c7a;
			color: #f06c7a;
			padding: 0 30upx;
			height: 50upx;
			border-radius: 30upx;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.settlement {
			width: 60%;
			display: flex;
			justify-content: flex-end;
			align-items: center;

			.sum {
				width: 50%;
				font-size: 28upx;
				margin-right: 10upx;
				display: flex;
				justify-content: flex-end;

				.money {
					font-weight: 600;
				}
			}

			.btn {
				padding: 0 30upx;
				height: 50upx;
				background-color: #f06c7a;
				color: #fff;
				display: flex;
				justify-content: center;
				align-items: center;

				border-radius: 30upx;
			}
		}
	}
</style>
