import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    // 状态，也就是数据
    state: {
        headerTitle:"飞猪电影",
        cityTitle: '广州',
        cityId: 20
     },
     // 方法 类比vue的methods  同步的方法
     mutations: {
         changeHt(state, payload) {
             // state状态  payload // 荷载 (存放参数)
             state.headerTitle = payload;
         },
         changeCity(state, payload) {
             state.cityTitle = payload.nm;
             state.cityId = payload.id;
         }
     },
     // 用于异步的方法
     actions: {

     }
})
