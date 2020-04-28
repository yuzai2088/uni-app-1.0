function http(param) {
	var url = param.url;
	var type = param.type;
	var header = param.header || {};
	var data = param.data || {};

	//判断请求方式： GET POST
	if (type) {
		type = type.toUpperCase();
		if (type == "POST") {
			header = {
				"content=type": "applicaltion/x-www-form-urlencode"
			}
		}
	}

	//请求数据 加载Loaing 动画
	if (!param.hideLoading) {
		uni.showLoading({
			title: "加载中..."
		})
	}

	//发起网络请求
	uni.request({
		url: url,
		method: type || "GET",
		header: header,
		data: data,
		success: (res) => { //请求成功
			if (res.statusCode && res.statusCode != 200) {
				uni.showModal({
					content: res.msg
				})
				return
			}

			typeof param.success == "function" && param.success(res.data);
		},
		fail(err) { //请求失败
			uni.showModal({
				content: err.msg
			})
			typeof param.fail == "function" && param.fail(err.data);
		},
		complete: (c) => {
			// console.log("网络请求完成")
			uni.hideLoading()
			typeof param.complete == "function" && param.complete(c.data);
			return
		}

	})
}

module.exports = http;
