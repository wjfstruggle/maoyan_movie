<template lang="html">
  <div class="city">
      <section class="city-title">
          <!-- 定位城市 -->
      </section>
      <!-- 城市列表 -->
      <section class="city-list">
          <!-- <ul>
              <li v-for="(item, index) in zimu" :key="index">
                  <p>{{index}}</p>
                  <div class="" v-for="(item, index) in item" :key="index">
                      <p>{{item.nm}}</p>
                  </div>
              </li>
          </ul> -->
          <mt-index-list>
              <!-- 热门城市列表 -->
              <mt-index-section index="热门">
                <mt-cell v-for="(item_list, index) in hotCity" :key="index" :title="item_list.nm"></mt-cell>
              </mt-index-section>
              <!-- 字母排序城市列表 -->
              <mt-index-section v-for="(item, index) in site" :key="index" :index="index.toUpperCase()">
                <mt-cell v-for="(item_list, index) in item" :key="index" :title="item_list.nm"></mt-cell>
              </mt-index-section>
        </mt-index-list>
      </section>
  </div>
</template>

<script>
// import { getCityList } from "@/util/city.js";
import cityList from '../../city.json'
export default {
    created() {
        console.log(cityList)
        this.getCityList(cityList.cts)
        this.getHotCity(cityList.cts)
    },
    data() {
        return {
            cityList: cityList.cts,// 城市按字母排序
            hotCity: [], // 热门城市
            site: {} // 排序后的城市
        }
    },
    methods: {
      getCityList(list) {
		const set = new Set();
		for(let item of list){  //循环拿过来的每一条数据
			//console.log(item)
			set.add(item.py.substr(0, 1)); //截取字符串的第一个.substr(0, 1)
		}
		const arr = Array.from(set).sort(); //转数组方法,Set已经不是一个数组了,排序
		//console.log(arr);
		let site = {};  //定义一个空的对象保存处理好的数据
		for(let a of arr){  //循环找出键和数据,生成我们要的数据
		    this.site[a] = list.filter(item =>item.py.substr(0, 1) === a); //判断这个数组的pinyin的第一个字符
		}
        this.$forceUpdate()// 迫使 Vue 实例重新渲染。
		return this.site;
    },
    // 热门城市
    getHotCity(list) {
        list.forEach((item,index)=>{
           if(index<12){ // 取前十个热门城市
               this.hotCity.push(item)
           }
       })
    }
    }
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/city.scss'; // city样式
.mint-cell-text {
    font-size: 16px;
}
</style>
