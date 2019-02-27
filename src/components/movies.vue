<template>
  <div class="movie">
    <section class="movie-wrapper">
      <div class="movie-fliter"></div>
        <div class="img_bg" v-if="detailmovie.albumImg" :style="{backgroundImage: `url(${detailmovie.albumImg})`}"></div>
        <div class="img_bg" v-else :style="{backgroundImage: `url(${picFix(detailmovie.img)})`}"></div>
        <div class="movie_content">
            <div class="movie_content_img-play">
              <img class="movie_content_img" :src="picFix(detailmovie.img)" alt="">
              <video class="video" width="375" height="170" v-show="ShowPlay" :src="detailmovie.videourl" controls autoplay></video>
              <i class="" @click="playVideo">
                <img src="../assets//images/icon/icon-play.png" alt="">
              </i>
            </div>
            <div class="content-wrapper">
                <!-- <h1 class="musicName" v-if="detailmovie.musicName">{{detailmovie.musicName}}</h1> -->
                <h1 class="musicName">{{detailmovie.nm}}</h1>
                <p class="musicName_engish">{{detailmovie.enm}}</p>
                <div class="movie_info textOverflow1">
                  <div v-if="detailmovie.globalReleased">
                    <div v-if='detailmovie.sc'>
                      <div class='movie-score textOverflow'>
                        <star :score="detailmovie.sc"></star>&nbsp;{{detailmovie.sc}}
                      </div>
                      <div class='score-num textOverflow'>({{detailmovie.snum}}万人评分)</div>
                    </div>
                    <div class='no-score' v-else>暂无评分</div>
                  </div>
                  <div v-else class='movie-score'>{{detailmovie.wish}}人想看</div>
                    <div class="icon_text_info">
                        <strong>{{detailmovie.cat}}</strong>
                        <span class="icon" v-if="detailmovie.version =='v3d imax'" :class="{'active1': detailmovie.version =='v3d imax'}"></span>
                        <span v-else class="icon" :class="{'active2': detailmovie.version =='v2d imax'}"></span>
                    </div>
                    <p class="movie_dur">{{detailmovie.src}}/{{detailmovie.dur}}分钟</p>
                    <p class="time">{{detailmovie.pubDesc}}</p>
                </div>
            </div>
        </div>
    </section>
    <!-- 购票特惠 -->
    <section class="section-seperate">
      <div class="btn"><a href="">购票特惠</a></div>
      <div class="dra">
        <p :class="{'text-active': toggleFag}">{{detailmovie.dra}}</p>
        <div @click="arrow" class="img-arrow" :class="{'arrow-active': toggleFag}"><img src="../assets/images/movie_hot/arrow-bt.png" alt=""></div>
      </div>
    </section>
    <!-- 演员表 -->
    <section class="section-movie-celebrities">
      <h2 class="mediaKu">媒体库</h2>
      <div>
        <ul infinite-scroll-disabled="loading"
            infinite-scroll-distance="10">
          <li><video width="125" height="70" :src="detailmovie.videourl" controls>
        </video></li>
          <li class="img-item" v-for="imgPic in detailmovie.photos" :key="imgPic.id"><img v-lazy="imgPic" alt=""></li>
        </ul>
        </div>
    </section>
    <!-- 热门评论 -->
    <section class="hotComments">
      <h2 class="taolun">讨论</h2>
      <div class="hot-wrap" v-for="comment in comments" :key="comment.id">
        <div class="avatar">
          <img :src="comment.avatarUrl" alt="">
        </div>
        <div class="hot-content">
          <h3 class="nick">{{comment.nick}}</h3>
          <p class="score">给这部作品打了{{comment.score}}分</p>
          <p class="content">{{comment.content}}</p>
          <div class="info">
            <span class="time">{{comment.time|formatDate}}</span>
            <span class="upcount"><i class="iconfont icon-dianzan-choose"></i>&nbsp;&nbsp;{{comment.upCount}}</span>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import Star from '@/components/star'
import {formatDate} from '@/util/formatime'
export default {
  created() {
     if (this.$route.params.movieId != null) {
       this.movieId = this.$route.params.movieId;
     } else {
       this.movieId = JSON.parse(localStorage.getItem('movieId'))
     }
      this.axios
        .get("/ajax/detailmovie", {
          params: {
              movieId: this.movieId
          }
        })
        .then(res => {
          this.detailmovie = this.dataProcess(res.data.detailMovie);
          // 修改提交
          this.$store.commit('changeHt', res.data.detailMovie.nm)
        });
        // 评论
        this.axios.get('http://59.110.231.183:3001/comments', {
            params: {
              movieId: this.movieId,
            },
            userId: -1,
            offset: 0,
            limit: 10,
            ts: 0,
            type: 3,
        }).then(res => {
          this.comments = res.data.data.hotComments
        })
  },
  data() {
      return {
          movieId: "",
          detailmovie: {},
          toggleFag: false, // 点击箭头
          comments: [],
          ShowPlay: false
      };
  },
  methods: {
    // 设置图片大小
    picFix(wh) {
        if (wh !== undefined) {
            return wh.replace('w.h', '110.150')
        }
  },
   // 数据处理函数
  dataProcess(data) {
    let obj = data;
    // 保留一位小数
    obj.snum = Number(obj.snum / 10000).toFixed(1)
    //评分星星,满分10分，一颗满星代表2分
    obj.stars = this.formatStar(obj.sc/2)
    // 媒体库图片
    obj.photos = obj.photos.map( item => {
      return item.replace('w.h', '90.70')
    })
    return obj;
  },
    // 处理星星评分
  formatStar(sc) {
    // 1分对应满星，0.5对应半星
    let stars = new Array(5).fill('star-empty'); // 填充
    const fullStars = Math.floor(sc); // 满星
    const halfStars = sc % 1 ? 'star-half' : 'star-empty' // 半星个数最多一个
    stars.fill('star-full', 0, fullStars) // 填充满星
    if (fullStars < 5) {
      stars[fullStars] = halfStars; // 填充半星
    }
    return stars
  },
  picStars(stars) {
    let picUrl = `../assets/images/icon/${stars}.png`
    console.log(picUrl);
    return picUrl;
  },
  // 点击箭头函数
  arrow() {
    this.toggleFag = !this.toggleFag
  },
  // 点击视频播放
  playVideo() {
    this.ShowPlay = !this.ShowPlay
  }
  },
  filters: {
    formatDate(time) {
      var date = new Date(time);
      return formatDate(date, 'yyyy-MM-dd hh:mm');
    }
  },
  watch: {
    movieId(newValue) {
      localStorage.setItem('movieId', JSON.stringify(newValue))
    }
  },
  components: {
    Star
  }
};
</script>
<style lang="scss" scoped>
@mixin bg {
  top: 0;
  right: 0;
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
}
.movie {
    position: relative;
    top: -50px;
    z-index: 10;
    background: #f4f4f4;
}
.movie-wrapper {
  padding: 15px;
  box-sizing: border-box;
  height: 200px;
  overflow: hidden;
  height: 1;
  filter: blur(0);
  background-color: #fff;
}
.movie-fliter {
    @include bg;
    z-index: -1;
    width: 100%;
    height: 100%;
    background-color: #333;
}
.img_bg {
    z-index: -1;
    filter: blur(40px);
    -webkit-filter: blur(40px);
    background-image: gray;
    background-repeat: no-repeat;
    @include bg;
    overflow: hidden;
    height: 100%;
}
.movie_content {
  z-index: 1;
  position: relative;
  display: flex;
    .video {
    position: absolute;
    top: 0px;
    left: -18px;
  }
  .movie_content_img-play {
    position: relative;
    i {
      position: absolute;
      bottom: 8px;
      right: 4px;
      width: 35px;
      height: 35px;
      display: block;
      img {
        width: 100%;
      }
    }
  }
  .movie_content_img {
    flex: 0 0 110px;
  }
  .content-wrapper {
    padding-left: 20px;
    color: #fff;
    .musicName {
      font-size: 16px;
      margin: 5px 0 8px 0;
    }
    .musicName_engish {
      font-size: 12px;
      margin-bottom: 6px;
    }
    .movie-score {
      color: #ffc600;
      font-size: 18px;
      font-weight: bold;
      display: flex;
      align-items: center;
      margin-bottom: 10px;
      .movie-star {
        width: 18px;
        height: 18px;
        display: inline-block;
        margin-right: 4px;
        margin-bottom: 2px;
      }
    }
    .score-num, .no-score, .movie_dur, .time, .icon_text_info {
      margin-bottom: 6px;
      font-size: 12px;
    }
    .icon_text_info {
      display: flex;
      .icon {
        line-height: 14px;
        display: inline-block;
        -webkit-box-flex: 0;
        flex: 0 0 auto;
        border-radius: 2px;
        margin-left: 3px;
        width: 43px;
        height: 14px;
    }
    .active1 {
        background: url('../assets/images/movie_hot/2d_max.png') no-repeat;
        background-size: 43px 14px;
    }
    .active2 {
        background: url('../assets/images/movie_hot/3d_max.png') no-repeat;
        background-size: 43px 14px;
    }
    }
  }
}
.section-seperate {
  background-color: #fff;
  border-top: 1px solid #e5e5e5;
  margin: 10px 0;
  padding: 15px;
  text-align: center;
  .btn {
    width: 320px;
    cursor: pointer;
    font-size: 16px;
    padding: 10px 12px;
    display: inline-block;
    border-radius: 4px;
    line-height: 1;
    background: #e54847;
    text-align: center;
    a {
      color: #fff;
      font-size: 18px;
    }
  }
  .dra {
    color: #555;
    line-height: 18px;
    .text-active {
        height: 90px;
      }
    p {
      font-size: 13px;
      text-align: left;
      height: 50px;
      overflow: hidden;
      margin-top: 5px;
    }
    .arrow-active {
      transform:rotate(180deg);
      -webkit-transform: rotate(180deg);
      transition: all 0.3s ease;
      }
    .img-arrow {
      margin: 0 auto;
      width: 16px;
      height: 16px;
      padding: 5px;
      transition: all 0.8s ease;
      img {
        width: 100%;
        background-color: #fff;
      }
    }
  }
}
.section-movie-celebrities {
  border-top: 1px solid #e5e5e5;
  padding: 15px;
  background: #fff;
  .mediaKu {
    margin: 0;
    color: #666;
    font-size:14px;
    padding: 10px 0;
  }
  ul {
    overflow-x: scroll;
    white-space: nowrap;
    &::-webkit-scrollbar {
      display: none;
    }
    .img-item {
      width: 90px;
      height: 70px;
    }
    li {
      display: inline-block;
      margin-right: 8px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
}
.hotComments {
  background-color: #fff;
  border-top: 1px solid #e5e5e5;
  margin: 10px 0;
  padding: 15px;
  overflow: hidden;
  .taolun {
    margin: 0;
    color: #666;
    font-size:14px;
    padding: 10px 0;
  }
  .hot-wrap {
    display: -webkit-box;
    justify-content: flex-start;
    padding: 8px 0;
    border-bottom: 1px solid #e5e5e5;
    .avatar {
      width: 34px;
      height: 34px;      
      img {
        width: 100%;
        border-radius: 50%;
      }
    }
    .hot-content {
      margin-right: 10px;
      margin-left: 10px;
      .nick {
        color: #333;
        font-size: 14px;
        margin-bottom: 8px;
      }
      .score {
        color: #999;
        font-size: 12px;
        margin-bottom: 8px;
      }
      .content {
        font-size: 14px;
        line-height: 1.5;
        text-align: justify;
        word-wrap: break-word;
        width: 300px;
      }
      .info {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        color: #999;
        font-size: 12px;
      }
    }
  }
}
</style>
