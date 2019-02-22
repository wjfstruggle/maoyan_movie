<template>
  <div>
    <section id="list-wrap">
      <ul class="list-wrap-list"  v-if="movie.length !==0">
        <li class="list-wrap-item" v-for="movie in movie" :key="movie.id" @click="cinemaDetail(movie.id)">
          <div class="name">
              <h1 class="nm">{{movie.nm}}</h1>
              <p><span>{{movie.sellPrice}}</span>元起</p>
          </div>
          <div class="address clearfix">
              <p class="addr textOverflow1">{{movie.addr}}</p>
              <span class="distance">{{movie.distance}}</span>
          </div>
          <div class="showTimes">
              <span class="span" v-if="movie.vipDesc">{{movie.vipDesc}}</span>
              <span class="span" >小吃</span>
          </div>
        </li>
      </ul>
      </section>
  </div>
</template>
<script>
export default {
  props: ['movie'],
  methods: {
    cinemaDetail(id) {
      this.$emit('toCineamsDetail', id)
    }
  },
}
</script>