<template>
  <div id="search">
    <div class="search-wrap">
      <div class="search-bar">
        <input v-model="keyWrod" placeholder="搜电影、搜影院"></input>
        <button @click="searchList">搜索</button>
      </div>
      <div class="Hotshow" v-if="searchs.length">
        <h3>电影/电视剧/综艺节目</h3>
        <index-list :movieList="searchs" @toMovieDetail="goMovieDetail"></index-list>
      </div>
      <div class="cineamsInfo" v-if="cinemas.length">
        <h3>影院</h3>
        <cineams-list :movie="cinemas" @toCineamsDetail="goCineamsDetail"></cineams-list>
      </div>
    </div>
  </div>
</template>

<script>
import IndexList from '@/components/indexList'
import CineamsList from '@/components/cineamsList'
export default {
  data() {
    return {
      keyWrod: '',
      searchs: [],
      cinemas: []
    }
  },
  methods: {
    searchMovie() {
      this.axios.get('http://59.110.231.183:3001/search', {
        params: {
          kw: this.keyWrod,
          cityId: 20,
          stype: -1,
        }
      }).then( res => {
        console.log(res);
        this.searchs = res.data.movies.list;
        this.cinemas = res.data.cinemas.list;
      })
    },
    searchList() {
      console.log(this.keyWrod)
      this.searchMovie()
    },
    goMovieDetail(id) {
      this.$router.push({
        name: 'movies',
        params: {
          movieId: id
        }
      })
    },
    goCineamsDetail(id) {
      this.$router.push({
        name: 'cinemadetail',
        params: {
          cinemaId: id
        }
      })
    }
  },
  components: {
    IndexList,
    CineamsList
  }
}
</script>
<style lang="scss" scope>
@import "@/assets/sass/now_hot.scss";
@import "@/assets/sass/public.scss";
@import "@/assets/sass/movie_detail.scss";
#search {
  background-color: #f5f5f5;
  position: relative;
  top: -50px;
  .search-bar {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 10px;
    input {
      width: 200px;
      height: 35px;
      line-height: 35px;
      padding-left: 15px;
    }
    button {
      width: 60px;
      height: 35px;
      line-height: 35px;
      font-size: 12px;
      background-color: #f03d37;
      color: #fff;
      border-radius: 8px;
      text-align: center;
    }
  }
  #list-wrap {
    min-height: 100%;
    li {
      margin-left: 0;
    }
}
  .list-wrap-item {
    padding: 13px 15px 13px 0;
    /* margin-left: 15px; */
    /* position: relative; */
    /* overflow: hidden; */
  }
  .cineamsInfo {
    padding: 0 15px;
  }
  h3 {
    font-size: 15px;
    color: #999;
    padding: 9px 0;
  }
}
</style>
