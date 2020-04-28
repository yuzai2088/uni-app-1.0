<template>
	<view class="goods-detail">
		<!-- 自定义状态栏 -->
		<page-status></page-status>
		<!-- 自定义导航 -->
		<goods-Header></goods-Header>
		<!-- 轮播图 -->
		<view class="swiper-box">
			<swiper @change="swipwerChange" indicator-dots="true" circular="ture" autoplay="true">
				<swiper-item v-for="swiper in goodsdetail.swiperList" :key="swiper.id">
					<image :src="swiper.img"></image>
				</swiper-item>
			</swiper>
			<view class="indicator">
				{{currentSwiper+1}}/{{goodsdetail.swiperList.length}}
			</view>
		</view>
		<!-- 商品信息和价格 -->
		<view class="info-box" goods-info>
			<view class="price">￥{{goodsinfo.price}}</view>
			<view class="title">{{goodsinfo.name}}</view>
		</view>
		<!-- 选择规格 -->
		<view class="info-box">
			<view class="row" @tap="showinfo.showspec=true">
				<view class="text">
					选择
				</view>
				<view class="content">
					<view class="">
						选择规格
					</view>
					<view class="sp">
						<view :class="{'on':item==goodsinfo.spec}" v-for="(item,index) in goodsdetail.spec" :key="index">
							{{item}}
						</view>
					</view>
				</view>
				<view class="arrow">
					<view class="icon iconfont">&#xe8f1;</view>
				</view>
			</view>
		</view>
		<!-- 自定义模态框 -->
		<specPop @sub="sub" @add="add" @hideSpec="hideSpec" @setSpec="setSpec" :goodsinfo="goodsinfo" :goodsdetail="goodsdetail"
		 :showinfo="showinfo"></specPop>
		<!-- 评价 -->
		<view class="info-box comments">
			<view class="row">
				<view class="text">商品评价({{goodsdetail.comment.length}})</view>
				<view class="arrow" @tap="showAll">
					<view class="show">
						查看全部
						<view class="icon iconfont">&#xe8f1;</view>
					</view>
				</view>
			</view>
			<view class="comment">
				<view class="user-info">
					<view class="face">
						<image :src="goodsdetail.comment[0].face" mode=""></image>
					</view>
					<view class="username">
						{{goodsdetail.comment[0].username}}
					</view>
				</view>
				<view class="content">
					{{goodsdetail.comment[0].content}}
				</view>
			</view>
		</view>
		<!-- 商品详情 -->
		<view class="description">
			<view class="title">
				——商品详情——
			</view>
			<view class="content">
				<rich-text :nodes="goodsdetail.descriptionStr"></rich-text>
			</view>
		</view>
		<!-- 底部分享，加入购物车 -->
		<view class="footer">
			<view class="icons">
				<!-- 分享 -->
				<view class="box">
					<view class="icon iconfont">
						&#xe75a;
					</view>
					<view class="text">
						分享
					</view>
				</view>
				<view class="box" @tap="keep">
					<view v-if="isKeep" class="icon iconfont">
						&#xe86f;
					</view>
					<view v-else class="icon iconfont">
						&#xe870;
					</view>
					<view class="text">
						{{isKeep?"已":""}}收藏
					</view>
				</view>

			</view>
			<view class="btn">
				<view @tap="joinCart" class="joinCart">
					加入购物车
				</view>
				<view @tap="handleBuy" class="buy">
					立即购买
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import goodsHeader from "./goods-Header.vue"
	import interfaces from "../../unils/interfaces.js"
	import specPop from "../../components/specPop.vue"
	export default {
		components: {
			goodsHeader,
			specPop,
		},
		data() {
			return {
				isKeep: false, //收藏状态
				goodsdetail: {
					swiperList: [],
					spec: [],
					comment: [{
						face: "",
						content: "",
						username: ""
					}],
				},
				goodsinfo: {
					name: "",
					price: "",
					number: "1",
					"spec": ""
				},
				currentSwiper: 0, //轮播图下标
				showinfo: {
					showspec: false
				}
			}
		},
		onLoad(option) {
			if (option.goodsinfo) {
				this.goodsinfo = JSON.parse(option.goodsinfo)
				console.log("goodsinfo", this.goodsinfo)
			}
			this.initData()
		},
		methods: {
			add() {
				if (this.goodsinfo.number < 0) {
					return
				}
				this.goodsinfo.number++;
			},
			sub() {
				if (this.goodsinfo.number <= 1) {
					return
				}
				this.goodsinfo.number--
			},
			hideSpec() {
				this.showinfo.showspec = false;
			},
			setSpec(item) {
				this.goodsinfo.spec = item;
			},
			// 立即购买
			handleBuy() {
				let tempList = [];
				tempList.push(this.goodsinfo);
				uni.setStorage({
					key: "accountList",
					data: tempList,
					success: () => { //跳转结算页
						uni.navigateTo({
							url: "./goods-account"
						})
					}
				})

			},
			//加入购物车
			joinCart() {
				// console.log(this.goodsinfo)
				// 点击购物车,本地存储当前商品信息
				// 先取数据
				uni.getStorage({
					key: "cartList", //已经加入购物车商品列表
					success: (res => {
						//获取数据
						// console.log("添加成功")
						// console.log(res)

						let cartList = res.data;
						// 商品不存在
						let flag = false;

						cartList.forEach(item => {
							// 判断购物车是否存在当前商品id和规格
							if (item.goods_id == this.goodsinfo.goods_id && item.spec == this.goodsinfo.spec) {
								// 如果存在修改商品数量
								item.number += Number(this.goodsinfo.number);
								console.log("商品存在，修改数量", item.number)
								flag = true;
							}
						})
						if (!flag) { //不存在则加入购物车
							cartList.push(this.goodsinfo)
						}

						this.setcarList(cartList)

					}),
					fail: (err => {
						//点击加入购物车 存入数组
						// console.log("加入失败")
						let cartList = [];
						cartList.push(this.goodsinfo)

						//存入本地
						this.setcarList(cartList)
					})
				})
			},
			// 自定义本地存储方法
			setcarList(cartList) {
				uni.setStorage({
					key: "cartList",
					data: cartList,
					success: () => {
						uni.showToast({
							icon: "success",
							title: "添加成功"
						})
					}
				})
			},
			// 收藏
			keep() {
				this.isKeep = !this.isKeep;
				uni.showToast({
					title: this.isKeep ? "已收藏" : "已取消收藏"
				})
			},
			// 轮播图变化导致下标变化
			swipwerChange(e) {
				// console.log(e.target)
				this.currentSwiper = e.target.current;
			},
			initData() {
				this.request({
					url: interfaces.getGoodsDetail,
					success: ((res) => {
						this.goodsdetail = res.data;
						console.log("goodsdetail", this.goodsdetail);
					})
				})
			},
			showAll() {
				// 本地存储评论
				uni.setStorageSync("comments", this.goodsdetail.comment)
				// 跳转到评论列表组件
				uni.navigateTo({
					url: "./goods-comment"
				})
			}
		}
	}
</script>


<style lang="scss">
	/*  修改状态栏样式 */
	.status {
		/* #ifdef APP-PLUS */
		opacity: 0; //ios端状态栏为透明
		/* #endif */
	}

	.swiper-box {
		position: relative;
		width: 100%;
		height: 100vw;

		swiper {
			width: 100%;
			height: 100vw;

			swiper-item {
				image {
					width: 100%;
					height: 100vw;
				}
			}
		}

		.indicator {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 0 25upx;
			height: 40upx;
			border-radius: 40upx;
			font-size: 22upx;
			position: absolute;
			bottom: 20upx;
			right: 20upx;
			color: #fff;
			background-color: rgba(0, 0, 0, 0.2);
		}
	}

	.info-box {
		width: 92%;
		padding: 20upx 4%;
		background-color: #fff;
		margin-bottom: 20upx;
	}

	.goods-info {
		.price {
			font-size: 46upx;
			font-weight: 600;
			color: #f47925;
		}

		.title {
			font-size: 30upx;
		}
	}

	.row {
		width: 100%;
		display: flex;
		align-items: center;
		margin: 0 0 30upx 0;

		.text {
			font-size: 28upx;
			color: #a2a2a2;
			margin-right: 20upx;
		}

		.content {
			font-size: 28upx;
			display: flex;
			flex-wrap: wrap;

			.serviceitem {
				margin-right: 10upx;
			}

			.sp {
				width: 100%;
				display: flex;

				view {
					background-color: #f6f6f6;
					padding: 10upx;
					color: #999;
					margin-right: 10upx;
					font-size: 20upx;
					border-radius: 5upx;

					&.on {
						border: solid 1upx #f47952;
						padding: 4upx 8upx;
					}
				}
			}
		}

		.arrow {
			position: absolute;
			right: 4%;

			.icon {
				color: #ccc;
			}
		}
	}

	.comments {
		.row {
			width: 100%;
			height: 40upx;
			display: flex;
			align-items: center;
			margin: 0 0 30upx 0;

			.text {
				font-size: 30upx;
			}

			.arrow {
				font-size: 28upx;
				position: absolute;
				right: 4%;
				color: #17e6a1;

				.show {
					display: flex;
					align-items: center;

					.icon {
						color: #17e6a1;
					}
				}
			}
		}

		.comment {
			width: 100%;

			.user-info {
				width: 100%;
				height: 40upx;
				display: flex;
				align-items: center;

				.face {
					width: 40upx;
					height: 40upx;
					margin-right: 8upx;

					image {
						width: 40upx;
						height: 40upx;
						border-radius: 100%;
					}
				}

				.username {
					font-size: 24upx;
					color: #999;
				}
			}

			.content {
				margin-top: 10upx;
				font-size: 26upx;
			}
		}
	}

	.description {
		.title {
			width: 100%;
			height: 80upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 26upx;
			color: #999;
		}
	}

	.footer {
		position: fixed;
		bottom: 0upx;
		width: 92%;
		padding: 0 4%;
		height: 99upx;
		border-top: solid 1upx #eee;
		background-color: #fff;
		z-index: 2;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.icons {
			display: flex;
			height: 80upx;
			margin-left: -4%;

			.box {
				width: 80upx;
				height: 80upx;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;

				.icon {
					font-size: 40upx;
					color: #828282;
				}

				.text {
					display: flex;
					justify-content: center;
					width: 100%;
					font-size: 22upx;
					color: #666;
				}
			}
		}

		.btn {
			height: 80upx;
			border-radius: 40upx;
			overflow: hidden;
			display: flex;
			margin-right: -2%;

			.joinCart,
			.buy {
				height: 80upx;
				padding: 0 40upx;
				color: #fff;
				display: flex;
				align-items: center;
				font-size: 28upx;
			}

			.joinCart {
				background-color: #f0b46c;
			}

			.buy {
				background-color: #f06c7a;
			}
		}
	}
</style>
