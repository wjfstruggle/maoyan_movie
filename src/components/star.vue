<template>
  <div class="star">
    <div class="star mb-10" :class="starType">
        <span class="star-item" v-for = "itemClass in itemClassess" :key="itemClass.id" :class="itemClass"></span>
    </div>
  </div>
</template>
<script>
  const LENGTH = 5;//星星个数
  const CLS_ON = "on";//满星状态
  const CLS_HALF = "half";//半星状态
  const CLS_OFF = "off";//无星状态
export default {
  props: {
    score: {
      type : Number//参数：评分
    }
  },
  computed: {
    starType(){//设置星星尺寸
        return "star-"
    },
    itemClassess(){
      let result = [];//记录状态的数组
      let score = Math.floor(this.score) / 2;
      let hasDecimal = score % 1 !==0;
      let integer = Math.floor(score);//向下取整
      //全星
      for(let i = 0; i < integer; i++){
          result.push(CLS_ON);
      }
      //半星
      if(hasDecimal){
          result.push(CLS_HALF);
      }
      //无星
      if(result.length < LENGTH){
          result.push(CLS_OFF);
      }
      return result;
    }
  }
}
</script>
<style lang="scss" scoped>
.star {
  display: flex;
  width: 100%;
}
  .star-item { 
    width: 15px;
    height: 15px;
    margin-right: 6px;
    background-repeat: no-repeat;
    background-size: 15px 15px;
  }
  .star-item:last-child {
      margin-right: 0px;
  }
  .star-item:last-child {
      margin-right: 0px;
  }
  .star-item.on {
      background-image: url("../assets/images/icon/star-on.png");
  }
  .star-item.half {
      background-image: url("../assets/images/icon/star-half.png");
  }
  .star-item.off {
      background-image: url("../assets/images/icon/star-off.png");
  }
</style>
