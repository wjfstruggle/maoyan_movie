<template lang="html">
  <div class="tuan-wrap">
      <h6 class="gap" style="height: 10px;background-color: #f0f0f0;"></h6>
      <div class="tuan-list">
          <h1 class="tutle">影院超值套餐</h1>
          <ul>
              <li class="tuan-list-item clearfix" v-for="(item, index) in dealList" :key="index">
                  <div class="img">
                      <img v-lazy="picFix(item.imageUrl)" alt="">
                      <span class="hot" v-if="item.cardTag">{{item.cardTag}}</span>
                  </div>
                  <div class="tuan-content">
                      <div class="title">
                          <span v-if="item.recommendPersonNum == 2">双人</span>
                          <span v-else>单人</span>
                          {{item.title}}
                      </div>
                      <div class="sell-num">
                          <span>{{item.curNumberDesc}}</span>
                      </div>
                      <div class="price">
                          <span class="num1 num">￥</span>
                          <span class="num2 num">{{item.price}}</span>
                      </div>
                      <div class="buy-button">
                          <button>去购票</button>
                      </div>
                  </div>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
    props: ['dealList'],
    methods: {
        picFix(wh) {
            if (wh !== undefined) {
                return wh.replace('w.h', '92.92')
            }
       }
   }
}
</script>

<style lang="scss">
@import "@/assets/sass/supper_movies.scss"
</style>
