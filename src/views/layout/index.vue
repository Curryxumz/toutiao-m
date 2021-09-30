<template>
  <div class="layout-container">
    <router-view />

    <van-tabbar v-model="active" route>
      <van-tabbar-item to="/">
        <i slot="icon" class="iconfont toutiao-shouye"></i>
        首页
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="iconfont toutiao-wenda"></i>
        问答
      </van-tabbar-item>
      <van-tabbar-item to="/video">
        <i slot="icon" class="iconfont toutiao-shipin"></i>
        视频
      </van-tabbar-item>
      <van-tabbar-item to="/my">
        <i slot="icon" class="iconfont toutiao-wode"></i>
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: '',
  components: {},
  props: {},
  data () {
    return {
      active: 0
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}

</script>
<style lang="less" scoped>
  .layout-container {
    width: 100%;
    height: 49px;
    background-color: #ffffff;
    .iconfont {
      font-size: 20px;
    }
    .van-tabbar-item--active {
      color: #3296fa;
    }
  }

</style>
