<template>
	<!-- 输量 -->
	<view class="number">
		<view class="sub" @tap.stop="sub">
			<view class="icon iconfont">
				&#xe729;
			</view>
		</view>
		<view class="input">
			<input type="number" v-model="goodsinfo.number" />
		</view>
		<view class="add" @tap.stop="add">
			<view class="icon iconfont">
				&#xe727;
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			goodsinfo: Object
		},
		methods: {
			add() {
				// console.log("add")
				// if (this.goodsinfo.number < 0) {
				// 	return
				// }
				// this.goodsinfo.number++;bug 不能直接修改父组件内容
				// 注册事件
				this.$emit("add")
			},
			sub() {
				// console.log("sub")
				// if (this.goodsinfo.number <= 1) {
				// 	return
				// }
				// this.goodsinfo.number--;bug
				// 注册事件
				this.$emit("sub")
			}
		}
	}
</script>

<style lang="scss">
	.number {
		display: flex;
		justify-content: center;
		align-items: center;

		.input {
			width: 80upx;
			height: 60upx;
			margin: 0 10upx;
			background-color: #f3f3f3;
			display: flex;
			justify-content: center;
			align-items: center;
			text-align: center;

			input {
				width: 80upx;
				height: 60upx;
				display: flex;
				justify-content: center;
				align-items: center;
				text-align: center;
				font-size: 26upx;
			}
		}

		.sub,
		.add {
			width: 60upx;
			height: 60upx;
			background-color: #f3f3f3;
			border-radius: 5upx;

			.icon {
				font-size: 30upx;
				width: 60upx;
				height: 60upx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
</style>
