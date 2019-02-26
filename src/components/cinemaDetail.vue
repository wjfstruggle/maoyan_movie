<template lang="html">
  <div class="cinemaDetail">
      <div class="cinemaName">
          <h1 class="title">{{cinemaData.nm}}</h1>
          <p class="addr textOverflow1">{{cinemaData.addr}}</p>
      </div>
      <div class="cinema-nav">
          <div class="cinema-nav-list">
              <div class="post-bg"></div>
              <div class="post-bg-filter">
                  <!--背景图-->
        		<div class="box" v-if="showData.movies">
        			<img style="width:100%;height:100%;filter: blur(30px);" :src='picFix(showData.movies[movieIndex].img)' alt="" />
        		</div>
              </div>
              <div class="swiper-box">
                  <!-- 轮播 -->
                 <transition name="slide">
                      <swiper ref="mySwiper" :options="swiperOption">
                        <swiper-slide  v-for="(movies, index) in showData.movies" :key="movies.id">
                            <div :class="{active:(movieIndex== index)}">
                                <img :src="picFix(movies.img)" alt="" @click="switchThis($event)">
                            </div>
                        </swiper-slide>
                        <div class="swiper-pagination" slot="pagination"></div>
                      </swiper>
                </transition>
              </div>
          </div>
          <!-- 电影介绍 -->
          <div class="movie-info" v-if="showData.movies">
              <div class="movie-title">
                  <span class="title">{{this.showData.movies[movieIndex].nm}}</span>
                  <span class="sc" v-if="this.showData.movies[movieIndex].sc>0"> {{this.showData.movies[movieIndex].sc}}<span class="score">分</span></span>
                  <span class="sc" v-else> {{this.showData.movies[movieIndex].wish}}<span class="score">人想看</span> </span>
              </div>
              <div class="desc textOverflow1">{{this.showData.movies[movieIndex].desc}}</div>
          </div>
      </div>
      <!-- 日期 -->
      <section id="showDays">
          <div class="timeLine">
             <div v-for="(day, index) in shows" :key="day.dateShow" class="showday" @click="changeTime(index)" :class="{active:isSwitch==index}">{{day.dateShow}}</div>
          </div>
      </section>
      <!-- 电影上映 -->
      <section class="seat-wrap" >
          <div class="discount-block">
              <div class="vip-tips">
                <a href="#">
                    <span class="label">{{vipInfo.tag}}</span>
                    <span class="label-text textOverflow1">{{vipInfo.title}}</span>
                    <div class="process">{{vipInfo.process}}</div>
                </a>
              </div>
          </div>
          <div class="seat-inner-wrap">
              <ul class="list-wrap" v-if="showData.movies">
                 <li class="dp_wx_cinema_show_item" v-for="(item, index) in showData.movies[movieIndex].shows[plist_index].plist" :key="index">
                     <div class="item box-flex">
                         <div class="time-block">
                             <p class="begin">{{item.tm}}</p>
                             <div class="end">
                                 {{item.tm}}
                                 <span class="tui">散场</span>
                             </div>
                         </div>
                         <div class="info-block textOverflow1">
                             <p class="lan">{{item.lang}}{{item.tp}}</p>
                             <p class="hall">{{item.th}}</p>
                         </div>
                         <div class="price">
                             <div class="sellPr">
                                 <span class="d">￥</span>
                                 <span class="stonefont">{{item.vipPrice}}</span>
                             </div>
                             <div class="vipPrice">
                                 <span class="icon">{{item.vipPriceName}}</span>
                                 <span class="num">{{(item.vipPrice-4).toFixed(1)}}</span>
                             </div>
                             <div class="extraDesc">{{item.vipPriceNameNew}}</div>

                         </div>
                         <div class="button-block">
                             <button type="button" name="button" v-if="item.enterShowSeat==0">停售</button>
                             <button type="button" name="button" v-else>购票</button>
                         </div>
                     </div>
                 </li>
              </ul>
          </div>

      </section>
      <!-- 影院超值套餐 -->
      <section class="tuan-wrap">
          <super-movies :deal-list="dealList"></super-movies>
      </section>

  </div>
</template>
<script>
import superMovies from '@/components/superMovies.vue'
export default {
    created() {
        // console.log(this.$refs.wrapper); // undefined
        // 解决
        this.$nextTick(()=> {
            // Dom渲染完成后触发
            // console.log('$nextTick',this.$refs.wrapper);
        })
        // 应用场景，结合$refs属性內的对象，或者获取页面内容渲染的尺寸
        //判断是否有传进来的参数，如果有就把参数给id，如果没有就从localStorage读参数给id
        if (this.$route.params.cinemaId != null && this.$route.query.movieId != null) {
            this.cinemaId = this.$route.params.cinemaId;
            this.movieId = this.$route.query.movieId;
        } else {
            this.cinemaId = JSON.parse(localStorage.getItem('cinemaId'))
            this.movieId = JSON.parse(localStorage.getItem('movieId'))
        }

        this.axios.get('/ajax/cinemaDetail', {
            params: {
                cinemaId: this.cinemaId,
                movieId: this.movieId,
            }
        }).then((res) => {
            this.cinemaData = res.data.cinemaData;
            this.showData = res.data.showData;
            this.shows = res.data.showData.movies[this.movieIndex].shows;
            this.vipInfo = res.data.showData.vipInfo[0];
            this.dealList = res.data.dealList.dealList; // 超值套餐数据
            // this.movieIndex = res.data.movieIndex // 当前电影id
            //获取当前的电影index
			this.showData.movies.forEach((item,index)=>{
                if(item.id==this.movieId){
					this.movieIndex = index // 当前电影id
				}
			})
            // 轮播
            this.$nextTick(() => {
                this.swiper.slideTo(this.movieIndex, 1000, false);
                this.$refs.mySwiper.$on('transitionEnd', ()=> {
                    this.movieIndex = this.swiper.snapIndex;
                    this.shows = res.data.showData.movies[this.movieIndex].shows;
                    this.movies = res.data.showData.movies[this.movieIndex];
                })
            })
            // 修改提交
            this.$forceUpdate(); // 迫使 Vue 实例重新渲染。
            this.$store.commit('changeHt', this.cinemaData.nm)
        })
    },
    data() {
        return {
            cinemaId: '',
            movieId: '',
            movieIndex: 0, // 当前电影id
            showData:{},
            movies: [], //影片介绍
            shows: [], // 日期
            cinemaData: {},
            vipInfo: [],
            plist: [],
            dealList: [],
            plist_index: 0,
            isSwitch: 0, // 日期active
            swiperOption: {
                slidesPerView: 'auto',      // 两侧的张数设为auto
                spaceBetween: 30,           // swiper-slide之间的空隙（margin值）
                centeredSlides: true,       // 是否居中
                slideToClickedSlide: true, // 点击slider会居中
           }
        }
    },
    methods: {
        picFix(wh) {
            if (wh !== undefined) {
                return wh.replace('w.h', '65.94')
            }
       },
       // 点击图片切换影片
       switchThis(e) {
           this.movieIndex = this.swiper.snapIndex;
           this.shows = this.showData.movies[this.movieIndex].shows;
       },
       // 日期切换
       changeTime(index) {
           this.isSwitch = index;
           this.plist_index = index;
       }
   },
   computed:{
     swiper() {
       //   获取swiper实例里的数据，包含改变index的方法
       return this.$refs.mySwiper.swiper
   },
 },
 watch: {
     cinemaId(newValue) {
         localStorage.setItem('cinemaId',JSON.stringify(newValue))
     },
     movieId(newValue) {
         localStorage.setItem('movieId',JSON.stringify(newValue))
     }
 },
 components: {
     superMovies
 }
}
</script>

<style lang="scss">
@import '@/assets/sass/cinemadetail.scss';
</style>
