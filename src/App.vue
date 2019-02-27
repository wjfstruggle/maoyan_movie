<template>
  <div id="app">
      <!--头部  -->
        <div class="fix">
            <my-header :headerTitle="headerTitle"></my-header>
        </div>
      <!-- 导航 -->
    <div class="nav_wrapper">
        <div id="nav">
          <div class="city-enter" @click="toCity">
            <span>{{cityTitle}}</span>
            <i></i>
          </div>
          <div class="router">
            <router-link to="/">正在热映</router-link>
            <router-link to="/release">即将上映</router-link>
          </div>
          <i class="iconfont icon-large" @click="toSearch"></i>
        </div>
    </div>
    <!-- 路由渲染 -->
    <router-view/>
  </div>
</template>
<script type="text/javascript">
    import MyHeader from "@/components/myHeader.vue"
    export default {
        data() {
            return {
            }
        },
        computed: {
            headerTitle() {
                return this.$store.state.headerTitle;
            },
            cityTitle() {
                return this.$store.state.cityTitle;
            }
        },
        methods: {
          toCity() {
            this.$router.push({
                path: '/city',
                name: 'city'
            })
          },
          toSearch() {
            this.$router.push({
              path: 'search'
            })
          }
        },
        components: {
            MyHeader
        }
    }
</script>
<style lang="scss">
@import '@/assets/sass/public.scss'; // 公共样式
@import '@/assets/sass/App.scss'; // App样式
</style>
