<template>
	<view class="home">
		<!-- 状态栏 -->
		<page-status></page-status>
		<!-- //自定义导航 -->
		<Header />
		<!-- //轮播图 -->
		<view class="swiper">
			<view class="swiper-box">
				<swiper circular="true" indicator-dots="true" autoplay="true">
					<swiper-item v-for="swiper in swiperList" :key="swiper.id">
						<image :src="swiper.img"></image>
					</swiper-item>
				</swiper>
			</view>
		</view>
		<!-- 商品分类 -->
		<view class="goodstype-list">
			<view @tap="handlegoodsType(item)" class="goodstype" v-for="(item,index) in goodsType" :key="index">
				<view class="goodsimg">
					<image :src="item.img"></image>
				</view>
				<view class="goodstext">{{item.name}}</view>
			</view>
		</view>
		<!-- banner -->
		<view v-if="promotion.length>0" class="banner">
			<image src="../../../static/img/category/ad.jpg" mode=""></image>
		</view>
		<!-- 促销活动 -->
		<view class="promotion" v-if="promotion.length > 0">
			<view class="text">优惠活动</view>
			<view class="list">
				<view @tap="handlePromotion(item)" class="column" v-for="(item,index) in promotion" :key="index">
					<view class="top">
						<view class="title">{{item.title}}</view>
					</view>
					<view class="left">
						<view class="ad">{{item.ad}}</view>
						<view class="into">点击进入</view>
					</view>
					<view class="right">
						<image :src="item.img"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import Header from "../../../components/Header.vue"
	import interfaces from "../../../unils/interfaces.js"
	export default {
		data() {
			return {
				swiperList: [], //轮播图
				goodsType: [], //商品分类
				promotion: [] //商品促销
			}
		},
		components: {
			Header
		},
		onLoad() {
			this.initData();
		},
		methods: {
			initData() {
				this.request({
					url: interfaces.getGoodsType,
					success: (res) => {
						console.log("goodsType", res)
						this.swiperList = res.data.swiperList;
						this.goodsType = res.data.categoryList;
						this.promotion = res.data.promotion;
					}
				})
			},
			handlegoodsType(item) {
				// console.log(item.name)
				uni.navigateTo({
					url: `../../goods/goods-list?name=${item.name}`
				})
			},
			handlePromotion(item){
				console.log(item.title)
			}
		}
	}
</script>

<style lang="scss">
	.swiper {
		width: 100%;
		margin-top: 10upx;
		display: flex;
		justify-content: center;

		.swiper-box {
			width: 92%;
			height: 30.7vw;
			overflow: hidden;
			border-radius: 15upx;
			box-shadow: 0upx 8upx 25upx rgba(0, 0, 0, 0.2);
			//兼容ios，微信小程序
			position: relative;
			z-index: 1;

			swiper {
				width: 100%;
				height: 30.7vw;

				swiper-item {
					image {
						width: 100%;
						height: 40vw;
					}
				}
			}

			.indicator {
				position: absolute;
				bottom: 20upx;
				left: 20upx;
				background-color: rgba(255, 255, 255, 0.4);
				width: 150upx;
				height: 5upx;
				border-radius: 3upx;
				overflow: hidden;
				display: flex;

				.dots {
					width: 0upx;
					background-color: rgba(255, 255, 255, 1);
					transition: all 0.3s ease-out;

					&.on {
						width: (100%/3);
					}
				}
			}
		}
	}

	.goodstype-list {
		width: 92%;
		margin: 0 4%;
		padding: 0 0 30upx 0;
		border-bottom: solid 2upx #f6f6f6;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

		.goodstype {
			width: 25%;
			margin-top: 50upx;
			display: flex;
			flex-wrap: wrap;

			.goodsimg {
				width: 100%;
				display: flex;
				justify-content: center;

				image {
					width: 11vw;
					height: 11vw;
				}
			}

			.goodstext {
				margin-top: 16upx;
				width: 100%;
				display: flex;
				justify-content: center;
				font-size: 24upx;
				color: #3c3c3c;
			}
		}
	}

	.banner {
		width: 92%;
		margin: 40upx 4%;

		image {
			width: 100%;
			height: 36vw;
			border-radius: 4upx;
			box-shadow: 0upx 5upx 25upx rgba(0, 0, 0, 0.3);
		}
	}

	.promotion {
		width: 92%;
		margin: 10upx 4% 30upx 4%;

		.text {
			width: 100%;
			height: 60upx;
			font-size: 34upx;
			font-weight: 600;
			margin: 10upx;
		}

		.list {
			width: 100%;
			display: flex;
			justify-content: space-between;

			.column {
				width: 43%;
				padding: 15upx 3%;
				background-color: #ebf9f9;
				border-radius: 10upx;
				overflow: hidden;
				display: flex;
				justify-content: space-between;
				flex-wrap: wrap;

				.top {
					width: 100%;
					height: 40upx;
					display: flex;
					align-items: center;
					margin-bottom: 5upx;

					.title {
						font-size: 30upx;
					}
				}

				.left {
					width: 50%;
					height: 18.86vw;
					display: flex;
					flex-wrap: wrap;
					align-content: space-between;

					.ad {
						margin-top: 5upx;
						width: 100%;
						font-size: 22upx;
						color: #acb0b0;
					}

					.into {
						width: 100%;
						font-size: 24upx;
						color: #aaa;
						margin-bottom: 5upx;
					}
				}

				.right {
					width: 18.86vw;
					height: 18.86vw;

					image {
						width: 18.86vw;
						height: 18.86vw;
					}
				}
			}
		}
	}
</style>
