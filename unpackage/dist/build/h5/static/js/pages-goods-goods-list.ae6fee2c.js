(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-goods-goods-list"],{"13c1":function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.header[data-v-13cb822a]{width:92%;padding:0 4%;height:%?79?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-justify-content:space-around;justify-content:space-around;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end;position:fixed;z-index:10;background-color:#fff;border-bottom:solid %?1?% #eee}.header .target[data-v-13cb822a]{width:20%;height:%?60?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-size:%?28?%;margin-bottom:%?-2?%;color:#aaa}.header .target.on[data-v-13cb822a]{color:#555;border-bottom:%?4?% solid #f06c7a;font-weight:600;font-size:%?30?%}.header .target .icon[data-v-13cb822a]{font-size:%?26?%}.place[data-v-13cb822a]{background-color:#fff;height:%?100?%}.goods-list .loading-text[data-v-13cb822a]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;height:%?60?%;color:#979797;font-size:%?24?%}.goods-list .product-list[data-v-13cb822a]{width:92%;padding:0 4% 3vw 4%;-webkit-column-count:2;column-count:2;-webkit-column-gap:1em;column-gap:1em}.goods-list .product-list .product[data-v-13cb822a]{-webkit-column-break-inside:avoid;break-inside:avoid;border-radius:%?20?%;background-color:#fff;margin:0 0 %?15?% 0;-webkit-box-shadow:%?0?% %?5?% %?25?% rgba(0,0,0,.1);box-shadow:%?0?% %?5?% %?25?% rgba(0,0,0,.1)}.goods-list .product-list .product uni-image[data-v-13cb822a]{width:100%;border-radius:%?20?% %?20?% 0 0}.goods-list .product-list .product .name[data-v-13cb822a]{width:92%;padding:%?6?% 4%;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;text-align:justify;overflow:hidden;font-size:%?30?%}.goods-list .product-list .product .info[data-v-13cb822a]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;-webkit-box-align:end;-webkit-align-items:flex-end;align-items:flex-end;width:92%;padding:%?10?% 4% %?10?% 4%}.goods-list .product-list .product .info .price[data-v-13cb822a]{color:#e65339;font-size:%?30?%;font-weight:600}.goods-list .product-list .product .info .slogan[data-v-13cb822a]{color:#807c87;font-size:%?24?%}',""]),t.exports=e},"2a34":function(t,e,i){var a=i("13c1");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var o=i("4f06").default;o("fb4b5aa4",a,!0,{sourceMap:!1,shadowMode:!1})},"38cd":function(t,e){var i="http://www.yuchao.today:5001/",a={getGoodsType:i+"api/profiles/mall_list",getGoodsList:i+"api/profiles/category",getGoods:i+"api/profiles/goodslist",getGoodsDetail:i+"api/profiles/goods"};t.exports=a},"7a70":function(t,e,i){"use strict";var a,o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("v-uni-view",{staticClass:"header"},t._l(t.filterByList,(function(e,a){return i("v-uni-view",{key:a,staticClass:"target",class:{on:e.selected},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.handleSelect(a)}}},[t._v(t._s(e.text))])})),1),i("v-uni-view",{staticClass:"place"}),i("v-uni-view",{staticClass:"goods-list"},[i("v-uni-view",{staticClass:"product-list"},t._l(t.Goods,(function(e){return i("v-uni-view",{key:e.goods_id,staticClass:"product",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.handleGoods(e)}}},[i("v-uni-image",{attrs:{mode:"widthFix",src:e.img}}),i("v-uni-view",{staticClass:"name"},[t._v(t._s(e.name)+"}")]),i("v-uni-view",{staticClass:"info"},[i("v-uni-view",{staticClass:"price"},[i("v-uni-text",[t._v("￥")]),t._v(t._s(e.price))],1),i("v-uni-view",{staticClass:"slogan"},[t._v(t._s(e.slogan)),i("v-uni-text",[t._v("人付款")])],1)],1)],1)})),1),i("v-uni-view",{staticClass:"loading-text"},[t._v(t._s(t.loadingText))])],1)],1)},n=[];i.d(e,"b",(function(){return o})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){return a}))},adca:function(t,e,i){"use strict";var a=i("ee27");i("99af"),i("4160"),i("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var o=a(i("38cd")),n={data:function(){return{Goods:[],filterby:"all",page:"2",size:"6",loadingText:"拼命加载中",filterByList:[{text:"全部",selected:!0,filterby:"all"},{text:"口碑",selected:!1,filterby:"public"},{text:"热门",selected:!1,filterby:"hot"}]}},onLoad:function(t){uni.setNavigationBarTitle({title:t.name}),this.loadData()},onPullDownRefresh:function(){var t=this;setTimeout((function(){t.page=1,t.loadingText="加载中...",t.Goods=[],t.loadData(),uni.stopPullDownRefresh()}),100)},onReachBottom:function(){this.page++,this.loadData()},methods:{handleGoods:function(t){uni.navigateTo({url:"./goods-detail?goodsinfo="+JSON.stringify(t)})},handleSelect:function(t){console.log(t),this.filterByList[t].selected=!0;for(var e=0;e<this.filterByList.length;e++)e!=t&&(this.filterByList[e].selected=!1);this.filterby=this.filterByList[t].filterby,this.page=1,this.loadingText="加载中...",this.Goods=[],this.loadData()},loadData:function(){var t=this;this.request({url:"".concat(o.default.getGoods,"/").concat(this.filterby,"/").concat(this.page,"/").concat(this.size),success:function(e){e.data.length>0?e.data.forEach((function(e){t.Goods.push(e)})):t.loadingText="到底啦~"}})}}};e.default=n},d1d9:function(t,e,i){"use strict";i.r(e);var a=i("adca"),o=i.n(a);for(var n in a)"default"!==n&&function(t){i.d(e,t,(function(){return a[t]}))}(n);e["default"]=o.a},f107:function(t,e,i){"use strict";i.r(e);var a=i("7a70"),o=i("d1d9");for(var n in o)"default"!==n&&function(t){i.d(e,t,(function(){return o[t]}))}(n);i("f4ef");var s,d=i("f0c5"),c=Object(d["a"])(o["default"],a["b"],a["c"],!1,null,"13cb822a",null,!1,a["a"],s);e["default"]=c.exports},f4ef:function(t,e,i){"use strict";var a=i("2a34"),o=i.n(a);o.a}}]);