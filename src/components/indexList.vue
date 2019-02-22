<template>
  <div class="indexList">
    <ul>
      <li
        v-for="movie in movieList"
        :key="movie.id"
        @click="movie_detail(movie.id)"
      >
        <div class="movie_wrapper">
          <img v-lazy="picFix(movie.img)" alt>
          <div class="movie_detail">
            <div class="title_name">
              <h1 class="title textOverflow1">{{movie.nm}}</h1>
              <span
                  class="icon"
                  v-if="movie.version =='v3d imax'"
                  :class="{'active1': movie.version =='v3d imax'}"
              ></span>
              <span
                  v-else
                  class="icon"
                  :class="{'active2': movie.version =='v2d imax'}"
              ></span>
            </div>
            <p class="evaluate" v-if="movie.sc > 0 && movie.preShow">
              观众评:
              <span>{{movie.sc}}</span>
            </p>
            <p class="evaluate" v-else-if="movie.sc == 0">暂无评分</p>
            <p class="evaluate" v-else>
                <span>{{movie.wish}}</span>人想看
            </p>
            <h5 class="people textOverflow1">主演:{{movie.star}}</h5>
            <h5 class="people textOverflow1">{{movie.pubDesc}}</h5>
            <h6 class="show textOverflow1">{{movie.showInfo}}</h6>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: ['movieList'],
  data() {
    return {

    }
  },
  methods: {
    picFix(wh) {
      if (wh !== undefined) {
        return wh.replace("w.h", "64.90");
    }
  },
  movie_detail(id) {
    this.$emit('toMovieDetail', id)
  }
  },
}
</script>
<style lang="scss" scope>

</style>