const GoodURL = "http://www.yuchao.today:5001/";
const interfaces = {
	getGoodsType: GoodURL + "api/profiles/mall_list",//首页商品分类
	getGoodsList: GoodURL + "api/profiles/category",//商品分类列表
	getGoods: GoodURL + "api/profiles/goodslist",//具体商品列表
	getGoodsDetail: GoodURL + "api/profiles/goods"//商品详情


}
module.exports = interfaces;
