<template lang="html">
  <div class="myCinema">
      <section id="list-wrap">
          <ul class="list-wrap-list" v-infinite-scroll="loadMore">
              <li class="list-wrap-item" v-for="(movie, index) in movie" :key="index" @click="cinemaDetail(movie.id)" v-if="movie.length !==0">
                <div class="name">
                    <h1 class="nm">{{movie.nm}}</h1>
                    <p><span>{{movie.sellPrice}}</span>元起</p>
                </div>
                <div class="address clearfix">
                    <p class="addr textOverflow1">{{movie.addr}}</p>
                    <span class="distance">{{movie.distance}}</span>
                </div>
                <div class="cardPromotionTag">
                    <span v-if="movie.promotion.cardPromotionTag" class="icon"></span>
                    <span v-if="movie.promotion.cardPromotionTag" class="lijian textOverflow1">{{movie.promotion.cardPromotionTag}}</span>
                </div>
                <div class="showTimes">
                    近期场次：{{movie.showTimes}}
                </div>
              </li>
          </ul>
          <!-- loading 加载组件 -->
          <mt-spinner color="rgb(100, 100, 100)" type="fading-circle" class="loading"></mt-spinner>
      </section>
  </div>
</template>

<script>
export default {
    props: ['movie']
}
</script>

<style lang="scss" scoped>
</style>
