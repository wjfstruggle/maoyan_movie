<template lang="html">
    <transition name="fade">
    <div id="movie_detail_wrapper" v-if="detailmovie.length!==0">
      <section id="movie_detail">
          <div class="movie-fliter"></div>
          <div class="img_bg" v-if="detailmovie.albumImg" :style="{backgroundImage: `url(${detailmovie.albumImg})`}"></div>
          <div class="img_bg" v-else :style="{backgroundImage: `url(${picFix(detailmovie.img)})`}"></div>
          <div class="movie_content" @click="Tomovie(detailmovie.id)">
              <img class="movie_content_img" :src="picFix(detailmovie.img)" alt="">
              <div class="content-wrapper">
                  <!-- <h1 class="musicName" v-if="detailmovie.musicName">{{detailmovie.musicName}}</h1> -->
                  <h1 class="musicName">{{detailmovie.nm}}</h1>
                  <p class="musicName_engish">{{detailmovie.enm}}</p>
                  <div class="movie_info textOverflow1">
                      <h3>{{detailmovie.bingeWatch}}想看</h3>
                      <div class="icon_text_info">
                          <strong>{{detailmovie.cat}}</strong>
                          <span class="icon" v-if="detailmovie.version =='v3d imax'" :class="{'active1': detailmovie.version =='v3d imax'}"></span>
                          <span v-else class="icon" :class="{'active2': detailmovie.version =='v2d imax'}"></span>
                      </div>
                      <p class="movie_dur">{{detailmovie.src}}/{{detailmovie.dur}}分钟</p>
                      <p class="time">{{detailmovie.pubDesc}}</p>
                  </div>
              </div>
              <div class="arrow-g">
                  <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA8AAAAWCAYAAAAfD8YZAAAAAXNSR0IArs4c6QAAAS5JREFUOBGVkktuwkAMhpOoJ+hhSouE2HbDgiVCNCAOVtQHnINHhbgMJ6g6/f9gR848kmDJeOzxZ3scskzEOfcKXUMLjXXZByYQhJlqMvz3PM//1E9Z7fJoEp5wXvWZoILRZQtg7xVYdhXQzuR2XoEB/NYCOSkVdKI/g441BnuBbmI7aMAE7ilgxyaboYOD4RMO9EWiTwhgJksBLtEvUNolRmGvwJG+yDNsXSB4s2aplR3M4Y80BnuGfiQ7m0Q2qP6JJvaLc/VpTKx5lPe9IfpibviMb+4lOXYXyGLRsRPgSTsSpASdW8Av+YQ3Er+NzgIuELdvZMcAZIUaBsgpCA55IZIEeV+NLSC32hskXCTAH9xFRyWkUsgSrhqAJfjpL8fch0dMMIGWMkmYEIn8Az5Wgp5LHlhmAAAAAElFTkSuQmCC" alt="">
              </div>
          </div>
      </section>
      <!-- 日期 -->
      <section id="showDays" v-if="showDays.length">
          <div class="timeLine">
             <div v-for="(day, index) in showDays" :key="day.id" class="showday" :class="{isActive:day_index == index}" @click="changeTime(day,index)">{{day}}</div>
          </div>
      </section>
      <!-- 上映地点等信息 -->
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
  </transition>
</template>

<script>
import qs from "qs";
export default {
    created() {
        // this.day_m = this.format();
        //判断是否有传进来的参数，如果有就把参数给id，如果没有就从localStorage读参数给id
        this.ciId = this.$store.state.cityId;
        if (this.$route.params.movieId != "") {
            this.movieId = this.$route.params.movieId;
        } else {
            this.movieId = JSON.parse(localStorage.getItem("movieId"));
        }
        // 电影信息详情
        this.axios
            .get("/ajax/detailmovie", {
                params: {
                    movieId: this.movieId
                }
            })
            .then(res => {
                this.detailmovie = res.data.detailMovie;
                // 日期接口
                this.showDays.push(res.data.detailMovie.rt);
                // 修改提交
                this.$forceUpdate(); // 迫使 Vue 实例重新渲染。
                this.$store.commit("changeHt", this.detailmovie.nm);
                this.format();
            });
        this.$forceUpdate(); // 迫使 Vue 实例重新渲染。
        this.post_move("2018-12-21", 0, this.ciId);
    },
    data() {
        return {
            movieId: "",
            detailmovie: {}, // 电影详情
            movie: [], // 电影上映日期等
            day_m: "",
            offset: 0, // 请求数据数量
            showDays: [],
            ciId: "",
            day_index: 0 // 切换日期索引
        };
    },
    methods: {
        // 设置图片大小
        picFix(wh) {
            if (wh !== undefined) {
                return wh.replace("w.h", "110.150");
            }
        },
        post_move(day_m, offset, ci) {
            //影院信息
            this.axios
                .post(
                    "/ajax/movie",
                    qs.stringify({
                        movieId: this.movieId,
                        day: day_m,
                        offset: offset,
                        limit: 20,
                        cityId: ci,
                        districtId: -1,
                        lineId: -1,
                        hallType: -1,
                        brandId: -1,
                        serviceId: -1,
                        areaId: -1,
                        stationId: -1,
                        item: "",
                        updateShowDay: true,
                        reqId: 1545374199882
                    })
                )
                .then(res => {
                    // 判断请求结果，如果影院为空，就代表当天无上映，需要再次请求。
                    if (res.data.cinemas.length !== 0) {
                        this.movie = this.movie.concat(res.data.cinemas);
                        this.movie = res.data.cinemas;
                    } else {
                        let day = res.data.showDays.dates[0].date;
                        this.post_move(day, 0, this.ciId);
                    }
                });
        },
        // 到底刷新
        loadMore() {
            this.offset += 20;
            this.post_move(this.day_m, this.offset, this.ciId);
        },
        cinemaDetail(cinemaId) {
            this.$router.push({
                name: "cinemadetail",
                params: {
                    cinemaId: cinemaId,
                    index: this.index
                },
                query: { movieId: this.movieId }
            });
        },
        format() {
            let date = new Date();
            let resentYear = new Date(this.showDays[0]).getFullYear(); // 年
            let resentMonth = new Date(this.showDays[0]).getMonth() + 1; // 月
            let resentDay = new Date(this.showDays[0]).getDate(); // 日
            let nowYear = date.getFullYear(); // 获取当前年
            let nowMonth = date.getMonth() + 1; // 获取当前月
            let nowDay = date.getDate(); // 获取当前日
            let time = new Date(resentYear, resentMonth, 0);
            let days = time.getDate(); //获取当前月的总天数
            let isover = false; //判断当月天数是否超了
            // 判断电影上映的那天是否为今天
            if (
                resentYear == nowYear &&
                resentMonth == nowMonth &&
                resentDay == nowDay
            ) {
                if (days - resentDay >= 7) {
                    for (let i = 0; i < 7; i++) {
                        //    let resentTimeLine = (resentYear+'-'+resentMonth+'-'+(resentDay+i))
                        if (i == 1) {
                            this.showDays[0] = "今天" + this.showDays[0];
                            this.showDays.push(
                                "明天" +
                                    resentYear +
                                    "-" +
                                    resentMonth +
                                    "-" +
                                    (resentDay + i)
                            );
                        } else if (i == 2) {
                            this.showDays.push(
                                "后天" +
                                    resentYear +
                                    "-" +
                                    resentMonth +
                                    "-" +
                                    (resentDay + i)
                            );
                        } else {
                            let week = this.week(
                                new Date(
                                    resentYear +
                                        "-" +
                                        resentMonth +
                                        "-" +
                                        (resentDay + i)
                                ).getDay()
                            );
                            this.showDays.push(
                                week +
                                    resentYear +
                                    "-" +
                                    resentMonth +
                                    "-" +
                                    (resentDay + i)
                            );
                        }
                    }
                } else {
                    for (var i = 1; i < 7; i++) {
                        resentDay++;
                        if (resentDay > days && isover == false) {
                            isover = true;
                            resentDay = 1;
                            resentMonth += 1;
                            if (resentMonth > 12) {
                                resentMonth = 1;
                                resentYear += 1;
                            }
                        }
                        if (i == 1) {
                            // let resentTimeLine1 = (resentYear+'-'+resentMonth+'-'+resentDay)
                            this.showDays[0] = "今天 " + this.showDays[0];
                            this.showDays.push(
                                "明天 " +
                                    resentYear +
                                    "-" +
                                    resentMonth +
                                    "-" +
                                    resentDay
                            );
                        } else if (i == 2) {
                            this.showDays.push(
                                "后天 " +
                                    resentYear +
                                    "-" +
                                    resentMonth +
                                    "-" +
                                    resentDay
                            );
                        } else {
                            var week = this.week(
                                new Date(
                                    resentYear +
                                        "-" +
                                        resentMonth +
                                        "-" +
                                        resentDay
                                ).getDay()
                            );
                            this.showDays.push(
                                week +
                                    resentYear +
                                    "-" +
                                    resentMonth +
                                    "-" +
                                    resentDay
                            );
                        }
                    }
                }
            } else if (
                new Date(this.showDays[0]).getTime() < new Date().getTime()
            ) {
                //电影上映的那天比今天早
                this.showDays.length = 0;
                if (days - nowDay >= 7) {
                    for (let i = 1; i < 7; i++) {
                        if (i == 1) {
                            this.showDays.push(
                                "今天 " +
                                    nowYear +
                                    "-" +
                                    nowMonth +
                                    "-" +
                                    nowDay
                            );
                            this.showDays.push(
                                "明天 " +
                                    nowYear +
                                    "-" +
                                    nowMonth +
                                    "-" +
                                    (nowDay + i)
                            );
                        } else if (i == 2) {
                            this.showDays.push(
                                "后天 " +
                                    nowYear +
                                    "-" +
                                    nowMonth +
                                    "-" +
                                    (nowDay + i)
                            );
                        } else {
                            let week = this.week(
                                new Date(
                                    nowYear +
                                        "-" +
                                        nowMonth +
                                        "-" +
                                        (nowDay + i)
                                ).getDay()
                            );
                            this.showDays.push(
                                week +
                                    nowYear +
                                    "-" +
                                    nowMonth +
                                    "-" +
                                    (nowDay + i)
                            );
                        }
                    }
                } else {
                    for (let i = 1; i < 7; i++) {
                        nowDay++;
                        if (nowDay > days && isover == false) {
                            isover = true;
                            nowDay = 1;
                            nowMonth += 1;
                            if (nowMonth > 12) {
                                nowMonth = 1;
                                nowYear += 1;
                            }
                        }
                        if (i == 1) {
                            this.showDays.push(
                                "今天 " +
                                    nowYear +
                                    "-" +
                                    nowMonth +
                                    "-" +
                                    (nowDay - 1)
                            );
                            this.showDays.push(
                                "明天 " +
                                    nowYear +
                                    "-" +
                                    nowMonth +
                                    "-" +
                                    nowDay
                            );
                        } else if (i == 2) {
                            this.showDays.push(
                                "后天 " +
                                    nowYear +
                                    "-" +
                                    nowMonth +
                                    "-" +
                                    nowDay
                            );
                        } else {
                            let week = this.week(
                                new Date(
                                    nowYear + "-" + nowMonth + "-" + nowDay
                                ).getDay()
                            );
                            this.showDays.push(
                                week + nowYear + "-" + nowMonth + "-" + nowDay
                            );
                        }
                    }
                }
            } else {
                //电影上映的那天比今天晚
                if (days - resentDay >= 7) {
                    for (let i = 1; i < 7; i++) {
                        if (i == 1) {
                            this.showDays[0] = this.showDays[0];
                        }
                        let week = this.week(
                            new Date(
                                resentYear +
                                    "-" +
                                    resentMonth +
                                    "-" +
                                    (resentDay + i)
                            ).getDay()
                        );
                        this.showDays.push(
                            week +
                                resentYear +
                                "-" +
                                resentMonth +
                                "-" +
                                (resentDay + i)
                        );
                    }
                } else {
                    for (let i = 1; i < 7; i++) {
                        resentDay++;
                        if (resentDay > days && isover == false) {
                            isover = true;
                            resentDay = 1;
                            resentMonth += 1;
                            if (resentMonth > 12) {
                                resentMonth = 1;
                                resentYear += 1;
                            }
                        }
                        if (i == 1) {
                            this.showDays[0] = this.showDays[0];
                        }
                        let week = this.week(
                            new Date(
                                resentYear + "-" + resentMonth + "-" + resentDay
                            ).getDay()
                        );
                        this.showDays.push(
                            week +
                                resentYear +
                                "-" +
                                resentMonth +
                                "-" +
                                resentDay
                        );
                    }
                }
            }
        },
        // 处理周
        week(week) {
            switch (week) {
                case 0:
                    return "周日";
                    break;
                case 1:
                    return "周一";
                    break;
                case 2:
                    return "周二";
                    break;
                case 3:
                    return "周三";
                    break;
                case 4:
                    return "周四";
                    break;
                case 5:
                    return "周五";
                    break;
                case 6:
                    return "周六";
                    break;
            }
        },
        // 时间切换,渲染其他影院信息
        changeTime(item_day,index) {
            this.day_index = index;
            let day = item_day.split(" ")[1];
            this.movie = []
            this.post_move(day, 0, this.ciId);
            console.log(item_day,day,index);
            
        },
        //    跳转到电影详情
        Tomovie(id) {
            this.$router.push({
                name: "movies",
                params: {
                    movieId: id
                }
            });
        }
    },
    computed: {
        changeCity() {
            //数据依赖更新是，计算属性重新触发更新
            return this.$store.state.cityId;
        }
    },
    watch: {
        movieId(newValue) {
            localStorage.setItem("movieId", JSON.stringify(newValue));
        }
    }
};
</script>

<style lang="scss" scoped>
@import "@/assets/sass/movie_detail.scss";

.fade-enter-active {
    transition: transform 0.8s;
}
.fade-enter {
    transform: translateX(-100%);
    opacity: 0;
}
.loading {
    position: absolute;
    left: 50%;
    bottom: -20px;
    transform: translateX(-50%);
}
.arrow-g {
    position: absolute;
    width: 10px;
    height: 16px;
    right: 15px;
    top: 50%;
    -webkit-transform: translateY(-50%);
    transform: translateY(-50%);
    img {
        width: 100%;
        display: block;
    }
}
</style>
