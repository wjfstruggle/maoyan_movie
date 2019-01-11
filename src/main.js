import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import Mint from 'mint-ui';
import '@/assets/reset/reset.css' // 重置样式
import VueAwesomeSwiper from 'vue-awesome-swiper' // 轮播

// require styles
import 'swiper/dist/css/swiper.css'
import 'mint-ui/lib/style.css'
Vue.use(Mint);

Vue.config.productionTip = false

Vue.use(VueAwesomeSwiper);
// 请求库
// axios
// 将axios方法挂载到vue原型上，后续所有的vue实列都可以直接this.axios使用
let myrequest = axios.create({
  baseURL: 'http://maoyan.bluej.cn'
})
Vue.prototype.axios = myrequest;
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
