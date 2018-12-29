<template lang="html">
  <div class="myButton">
      <!-- {{movieList.globalReleased+''}} -->
      <button v-if="movieList[index].globalReleased" class="btn" type="button" name="button">{{title[0]}}</button>
      <button v-else class="btn1" type="button" name="button">{{title[1]}}</button>
  </div>
</template>

<script>
export default {
    props: ['title','movieList','index'],
    data() {
        return {
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/sass/public.scss'; // 公共样式
    .myButton {
        .btn,.btn1 {
            width: 47px;
            height: 27px;
            line-height: 28px;
            text-align: center;
            box-sizing: border-box;
            background-color: $color_them;
            color: #fff;
            border-radius: 4px;
            white-space: nowrap;
            font-size: 12px;
            cursor: pointer;
        }
        .btn1 {
            background-color: #3c9fe6;
        }
    }
</style>
