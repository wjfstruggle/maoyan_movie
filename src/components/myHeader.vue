<template lang="html">
    <div class="header">
        <div class="nav-left" @click="$router.go(-1)">
            <a href="#" class="back">
                <i class="icon-back"></i>
            </a>
        </div>
        <h1 class="textOverflow1">{{headerTitle}}</h1>
    </div>
</template>

<script>
export default {
    props: ['headerTitle']
}
</script>

<style lang="scss" scoped>
@import '@/assets/sass/public.scss'; // 公共样式
@import '@/assets/sass/myHeader.scss'; // header样式
</style>
