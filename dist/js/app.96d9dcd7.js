(function(t){function e(e){for(var a,i,s=e[0],c=e[1],u=e[2],l=0,f=[];l<s.length;l++)i=s[l],o[i]&&f.push(o[i][0]),o[i]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);d&&d(e);while(f.length)f.shift()();return r.push.apply(r,u||[]),n()}function n(){for(var t,e=0;e<r.length;e++){for(var n=r[e],a=!0,i=1;i<n.length;i++){var s=n[i];0!==o[s]&&(a=!1)}a&&(r.splice(e--,1),t=c(c.s=n[0]))}return t}var a={},i={app:0},o={app:0},r=[];function s(t){return c.p+"js/"+({about:"about"}[t]||t)+"."+{about:"23987f6b","chunk-1577de1a":"b4cfe0a7","chunk-1abeaa12":"2a53d613","chunk-1ae8565a":"cf199823","chunk-af53b34c":"9e8e9ec5","chunk-c8c98e0c":"81befbb7"}[t]+".js"}function c(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(t){var e=[],n={about:1,"chunk-1577de1a":1,"chunk-1abeaa12":1,"chunk-1ae8565a":1,"chunk-af53b34c":1,"chunk-c8c98e0c":1};i[t]?e.push(i[t]):0!==i[t]&&n[t]&&e.push(i[t]=new Promise(function(e,n){for(var a="css/"+({about:"about"}[t]||t)+"."+{about:"4a8b1485","chunk-1577de1a":"8d399bf3","chunk-1abeaa12":"a7e7d489","chunk-1ae8565a":"7806d312","chunk-af53b34c":"602823af","chunk-c8c98e0c":"511e1d93"}[t]+".css",o=c.p+a,r=document.getElementsByTagName("link"),s=0;s<r.length;s++){var u=r[s],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===a||l===o))return e()}var f=document.getElementsByTagName("style");for(s=0;s<f.length;s++){u=f[s],l=u.getAttribute("data-href");if(l===a||l===o)return e()}var d=document.createElement("link");d.rel="stylesheet",d.type="text/css",d.onload=e,d.onerror=function(e){var a=e&&e.target&&e.target.src||o,r=new Error("Loading CSS chunk "+t+" failed.\n("+a+")");r.request=a,delete i[t],d.parentNode.removeChild(d),n(r)},d.href=o;var v=document.getElementsByTagName("head")[0];v.appendChild(d)}).then(function(){i[t]=0}));var a=o[t];if(0!==a)if(a)e.push(a[2]);else{var r=new Promise(function(e,n){a=o[t]=[e,n]});e.push(a[2]=r);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,c.nc&&l.setAttribute("nonce",c.nc),l.src=s(t),u=function(e){l.onerror=l.onload=null,clearTimeout(f);var n=o[t];if(0!==n){if(n){var a=e&&("load"===e.type?"missing":e.type),i=e&&e.target&&e.target.src,r=new Error("Loading chunk "+t+" failed.\n("+a+": "+i+")");r.type=a,r.request=i,n[1](r)}o[t]=void 0}};var f=setTimeout(function(){u({type:"timeout",target:l})},12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(e)},c.m=t,c.c=a,c.d=function(t,e,n){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)c.d(n,a,function(e){return t[e]}.bind(null,a));return n},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="",c.oe=function(t){throw console.error(t),t};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=e,u=u.slice();for(var f=0;f<u.length;f++)e(u[f]);var d=l;r.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("56d7")},1833:function(t,e,n){},"24cf":function(t,e,n){},3713:function(t,e,n){},"56d7":function(t,e,n){"use strict";n.r(e);n("ff66"),n("ea23"),n("dbff");var a=n("3a00"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"fix"},[n("my-header",{attrs:{headerTitle:t.headerTitle}})],1),n("div",{staticClass:"nav_wrapper"},[n("div",{attrs:{id:"nav"}},[n("div",{staticClass:"city-enter",on:{click:t.toCity}},[n("span",[t._v(t._s(t.cityTitle))]),n("i")]),n("div",{staticClass:"router"},[n("router-link",{attrs:{to:"/"}},[t._v("正在热映")]),n("router-link",{attrs:{to:"/release"}},[t._v("即将上映")])],1),n("i",{staticClass:"iconfont icon-large",on:{click:t.toSearch}})])]),n("keep-alive",[n("router-view")],1)],1)},o=[],r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"header"},[n("div",{staticClass:"nav-left",on:{click:function(e){t.$router.go(-1)}}},[t._m(0)]),n("h1",{staticClass:"textOverflow1"},[t._v(t._s(t.headerTitle))])])},s=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("a",{staticClass:"back",attrs:{href:"#"}},[n("i",{staticClass:"icon-back"})])}],c={props:["headerTitle"]},u=c,l=(n("6e2b"),n("048f")),f=Object(l["a"])(u,r,s,!1,null,"0394e7f9",null);f.options.__file="myHeader.vue";var d=f.exports,v={data:function(){return{}},computed:{headerTitle:function(){return this.$store.state.headerTitle},cityTitle:function(){return this.$store.state.cityTitle}},methods:{toCity:function(){this.$router.push({path:"/city",name:"city"})},toSearch:function(){this.$router.push({path:"search"})}},components:{MyHeader:d}},m=v,h=(n("5c0b"),Object(l["a"])(m,i,o,!1,null,null,null));h.options.__file="App.vue";var p=h.exports,b=n("081a"),g=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("transition",{attrs:{name:"move"}},[n("div",{staticClass:"Hotshow"},[n("ul",t._l(t.movieList,function(e,a){return n("li",{key:e.index,on:{click:function(n){t.movie_detail(e.id)}}},[n("div",{staticClass:"movie_wrapper"},[n("img",{directives:[{name:"lazy",rawName:"v-lazy",value:t.picFix(e.img),expression:"picFix(movie.img)"}],attrs:{alt:""}}),n("div",{staticClass:"movie_detail"},[n("div",{staticClass:"title_name"},[n("h1",{staticClass:"title textOverflow1"},[t._v(t._s(e.nm))]),"v3d imax"==e.version?n("span",{staticClass:"icon",class:{active1:"v3d imax"==e.version}}):n("span",{staticClass:"icon",class:{active2:"v2d imax"==e.version}})]),e.sc>0&&e.preShow?n("p",{staticClass:"evaluate"},[t._v("\n                            观众评:\n                            "),n("span",[t._v(t._s(e.sc))])]):0==e.sc?n("p",{staticClass:"evaluate"},[t._v("暂无评分")]):n("p",{staticClass:"evaluate"},[n("span",[t._v(t._s(e.wish))]),t._v("人想看\n                        ")]),n("h5",{staticClass:"people textOverflow1"},[t._v("主演:"+t._s(e.star))]),n("h6",{staticClass:"show textOverflow1"},[t._v(t._s(e.showInfo))])])]),n("div",{staticClass:"btn"},[n("my-button",{attrs:{title:t.title,movieList:t.movieList,index:a}})],1)])}),0),n("div",{directives:[{name:"show",rawName:"v-show",value:t.coming.length,expression:"coming.length"}],staticClass:"loading"},[n("mt-spinner",{attrs:{color:"rgb(100, 100, 100)",type:"fading-circle"}})],1)])])},_=[],y=(n("8383"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"myButton"},[t.movieList[t.index].globalReleased?n("button",{staticClass:"btn",attrs:{type:"button",name:"button"}},[t._v(t._s(t.title[0]))]):n("button",{staticClass:"btn1",attrs:{type:"button",name:"button"}},[t._v(t._s(t.title[1]))])])}),w=[],k={props:["title","movieList","index"],data:function(){return{}}},x=k,C=(n("e60f"),Object(l["a"])(x,y,w,!1,null,null,null));C.options.__file="myButton.vue";var T=C.exports,j={name:"Hotshow",created:function(){var t=this,e=this;this.axios.get("/ajax/movieOnInfoList").then(function(n){t.movieList=n.data.movieList,t.movieIds=n.data.movieIds,document.addEventListener("scroll",t.fangdou(function(){e.getMoreInfo(this.movieIds)},500))}),this.$forceUpdate(),this.$store.commit("changeHt","飞猪电影")},data:function(){return{movieList:[],title:["购票","预售"],movieIds:[],coming:[]}},methods:{picFix:function(t){if(void 0!==t)return t.replace("w.h","64.90")},movie_detail:function(t){this.$router.push({name:"movie_detail",params:{movieId:t}})},fangdou:function(t,e){var n;return function(){var a=this,i=arguments;n&&clearTimeout(n),n=setTimeout(function(){t.apply(a,i)},e)}},getMoreInfo:function(t){var e=!0,n=this,a=document.documentElement.scrollTop,i=document.documentElement.scrollHeight,o=window.innerHeight;a+i==o&&1==e&&(e=!1);var r=12,s=12,c=n.movieIds.splice(r,s);c=c.join(","),n.axios.get("/ajax/moreComingList",{params:{token:"",movieIds:c}}).then(function(t){if(n.coming=t.data.coming,0===t.data.coming.length)return!1;n.movieList=n.movieList.concat(t.data.coming)})}},components:{myButton:T}},O=j,I=(n("7051"),Object(l["a"])(O,g,_,!1,null,"34a6f119",null));I.options.__file="Hotshow.vue";var L=I.exports;a["default"].use(b["a"]);var E=new b["a"]({routes:[{path:"/",name:"hotshow",component:L},{path:"/release",name:"release",component:function(){return n.e("about").then(n.bind(null,"1efe"))}},{path:"/movie_detail/:movieId",name:"movie_detail",component:function(){return n.e("chunk-c8c98e0c").then(n.bind(null,"1adb"))}},{path:"/cinemadetail/:cinemaId",name:"cinemadetail",component:function(){return n.e("chunk-1577de1a").then(n.bind(null,"0173"))}},{path:"/city",name:"city",component:function(){return n.e("chunk-1abeaa12").then(n.bind(null,"4731"))}},{path:"/movies/:movieId",name:"movies",component:function(){return n.e("chunk-af53b34c").then(n.bind(null,"2937"))}},{path:"/search",name:"search",component:function(){return n.e("chunk-1ae8565a").then(n.bind(null,"067f"))}}]}),$=n("f2de");a["default"].use($["a"]);var S=new $["a"].Store({state:{headerTitle:"飞猪电影",cityTitle:"广州",cityId:20},mutations:{changeHt:function(t,e){t.headerTitle=e},changeCity:function(t,e){t.cityTitle=e.nm,t.cityId=e.id}},actions:{}}),H=n("7f43"),P=n.n(H),M=n("660a"),B=n.n(M),N=(n("3713"),n("6fe8")),A=n.n(N);n("7b2a"),n("4f89");a["default"].use(B.a),a["default"].config.productionTip=!1,a["default"].use(A.a);var F=P.a.create({baseURL:"http://maoyan.bluej.cn"});a["default"].prototype.axios=F,new a["default"]({router:E,store:S,render:function(t){return t(p)}}).$mount("#app")},"5c0b":function(t,e,n){"use strict";var a=n("24cf"),i=n.n(a);i.a},"6e2b":function(t,e,n){"use strict";var a=n("6f4a"),i=n.n(a);i.a},"6f4a":function(t,e,n){},7051:function(t,e,n){"use strict";var a=n("1833"),i=n.n(a);i.a},d82d:function(t,e,n){},e60f:function(t,e,n){"use strict";var a=n("d82d"),i=n.n(a);i.a}});
//# sourceMappingURL=app.96d9dcd7.js.map