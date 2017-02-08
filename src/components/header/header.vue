<template>
  <div id="header">
    <div class="content-wrapper">
      <div class="avatar">
        <img :src="seller.avatar" class="seller-avatar">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="brand-name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="supports" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="support-description">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <div class="notice-wrapper" @click="showDetail">
      <span class="icon"></span>
      <span class="bulletin">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="bg">
      <img :src="seller.avatar">
    </div>
    <div class="detail" v-show="detailShow">
      <div class="detail-wrapper clearfix">
        <div class="detail-info"></div>
      </div>
      <div class="detail-close" @click="closeDetail">
        <i class="icon-close"></i>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'header',
    data () {
      return {
        classMap: [],
        detailShow: false
      }
    },
    props: ['seller'],
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    methods: {
      showDetail () {
        this.detailShow = true;
      },
      closeDetail () {
        this.detailShow = false;
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/icon.css"
  @import "../../common/stylus/index.styl"

  #header
    font-size: 20px
    color: #fff
    position: relative
    background: rgba(7, 17, 27, .5)
    overflow: hidden
    .content-wrapper
      position: relative
      padding: 24px 12px 18px 24px
      font-size: 0
      position: relative
      .avatar
        display: inline-block
        vertical-align: top
        .seller-avatar
          width: 64px
          height: 64px
          border-radius: 2px
      .content
        display: inline-block
        margin-left: 16px
        color: #fff
        .title
          font-size: 16px
          margin: 2px 0 8px 0
          .brand
            display: inline-block
            width: 30px
            height: 18px
            vertical-align: top
            background-size: 30px 18px
            bg-image('brand')
            background-repeat: no-repeat
          .brand-name
            margin-left: 6px
            font-size: 16px
            line-height: 18px
            font-weight: bold
        .description
          margin-bottom: 10px
          font-size: 12px
          font-weight: 100
          line-height: 12px
        .supports
          .icon
            display: inline-block
            width: 12px
            height: 12px
            vertical-align: top
            background-size: 12px 12px
            background-repeat: no-repeat
            &.decrease
              bg-image-1('decrease')
            &.discount
              bg-image-1('discount')
            &.special
              bg-image-1('special')
            &.invoice
              bg-image-1('invoice')
            &.guarantee
              bg-image-1('guarantee')
          .support-description
            display: inline-block
            font-size: 10px
            font-weight: 100
            line-height: 12px
            margin-left: 4px
      .support-count
        position: absolute
        right: 12px
        bottom: 14px
        padding: 0 8px
        height: 24px
        line-height: 24px
        background: rgba(0, 0, 0, .2)
        border-radius: 14px
        .count
          display: inline-block
          font-size: 10px
          vertical-align: top
        i
          display: inline-block
          font-size: 10px
          line-height: 24px
          margin-left: 2px
    .notice-wrapper
      height: 28px
      line-height: 28px
      padding: 0 22px 0 12px
      background: rgba(7, 17, 27, 0.2)
      position: relative
      white-space: nowrap
      overflow: hidden
      text-overflow: ellipsis
      .icon
        display inline-block
        width: 22px
        height: 12px
        background-size: 22px 12px
        background-repeat: no-repeat
        bg-image('bulletin')
        vertical-align: top
        margin-top 7px
      .bulletin
        margin: 0 4px
        font-size: 10px
        font-weight: 100
        color: #fff
        vertical-align: top
      i
        font-size: 10px
        position: absolute
        top: 8px
        right: 12px
    .bg
      width: 100%
      height: 100%
      position: absolute
      top: 0
      left: 0
      z-index: -1
      img
        width: 100%
        height: 100%
        filter: blur(10px)
    .detail
      position: fixed
      z-index: 100
      width: 100%
      height: 100%
      overflow: auto
      background-color: rgba(7, 17, 27, 0.8)
      top: 0;
      left: 0;
      .detail-wrapper
        min-height: 100%
        .detail-info
          margin-top: 64px
          padding-bottom: 64px
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0 auto
        font-size 32px
        color: rgba(255, 255, 255, 0.5)
        clear: both
</style>
