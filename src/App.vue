<template>
  <div id="app">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px-top">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评论</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/seller">商家</router-link>
      </div>
    </div>
    <a style="display: none" href="http://www.zhangxinxu.com/study/201208/window-device-pixel-ratio.html">测试device-pixel-ratio</a>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from 'components/header/header'
  import Goods from 'components/goods/goods'
  import Ratings from 'components/ratings/ratings'
  import Seller from 'components/seller/seller'

  export default {
    name: 'app',
    data () {
      return {
        seller: {}
      }
    },
    created () {
      this.$http.get('/api/seller').then(res => {
        res = res.body;
        if (res.errno === 0) {
          this.seller = res.data;
        }
      })
    },
    components: {
      'v-header': Header,
      'v-goods': Goods,
      'v-ratings': Ratings,
      'v-seller': Seller
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/index.styl"
  #app
    .tab
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      border-1px-top(rgba(7, 17, 27, 0.1))
      .tab-item
        flex: 1
        text-align: center
        a
          display: block
          font-size: 14px
          color: rgb(77, 85, 93)
        .active
          color: rgb(240, 20, 20)
</style>
