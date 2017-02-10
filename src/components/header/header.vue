<template>
  <div id="header">
    <!--各种信息-->
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
          <type :type="seller.supports[0].type" size="12px" colorType="1"></type>
          <span class="support-description">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div class="support-count" v-if="seller.supports" @click="showDetail">
        <span class="count">{{seller.supports.length}}个</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
    </div>
    <!--公告栏-->
    <div class="notice-wrapper" @click="showDetail">
      <span class="icon"></span>
      <span class="bulletin">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <!--背景图片-->
    <div class="bg">
      <img :src="seller.avatar">
    </div>
    <!--商家详情信息-->
    <transition name="show">
      <div class="detail" v-show="detailShow">
        <!--详情-->
        <div class="detail-wrapper clearfix">
          <div class="detail-info">
            <h1 class="name">{{seller.name}}</h1>
            <!--星级-->
            <div class="star-position">
              <star :size="48" :score="seller.score"></star>
            </div>
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <!--优惠信息-->
            <ul class="discount-info">
              <li class="discount-detail" v-if="seller.supports" v-for="item in seller.supports">
                <type :type="item.type" size="16px" colorType="1"></type>
                <span class="text">{{item.description}}</span>
              </li>
            </ul>
            <div class="title">
              <div class="line"></div>
              <div class="text">商家公告</div>
              <div class="line"></div>
            </div>
            <p class="bulletin">{{seller.bulletin}}</p>
          </div>
        </div>
        <!--关闭按钮-->
        <div class="detail-close" @click="closeDetail">
          <i class="icon-close"></i>
        </div>
        <!--sticky footer布局-->
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import star from 'components/star/star'
  import type from 'components/type/type'
  export default {
    name: 'header',
    data () {
      return {
        classMap: [],
        detailShow: false
      }
    },
    components: {
      star,type
    },
    props: ['seller'],
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
    .show-enter,.show-leave-active
      opacity: 0
    .show-enter-active,.show-leave-active
      transition: all 0.5s
    .detail
      position: fixed
      z-index: 100
      width: 100%
      height: 100%
      overflow: auto
      top: 0;
      left: 0;
      background rgba(7, 17, 27, 0.8)
      -webkit-backdrop-filter blur(10px)
      backdrop-filter blur(10px)
      .detail-wrapper
        width: 100%
        min-height: 100%
        .detail-info
          margin-top: 64px
          padding-bottom: 80px
          .name
            line-height: 16px
            font-size: 16px
            font-weight: 700
            text-align: center
            color: #fff
          .star-position
            padding: 2px 0
            text-align: center
            margin-top: 16px;
          .title
            width: 80%
            margin: 28px auto 24px
            display: flex
            .text
              width: 64px
              padding: 0 12px
              font-size: 14px
              text-align: center
              font-weight: 700
            .line
              flex: 1
              position: relative
              top: -7px
              border-bottom: 1px solid rgba(255, 255, 255, .2)
          .discount-info
            width 80%
            margin 24px auto 0
            font-size: 0
            .discount-detail
              padding: 0 12px
              margin-bottom: 12px
              &:last-child
                margin-bottom 0
              .text
                display inline-block
                margin-left 6px
                font-size: 12px
                font-weight: 200
                line-height 16px
          .bulletin
            width: 80%
            margin: 0 auto
            padding 0 12px
            font-size 12px
            font-weight 200
            line-height 24px
      .detail-close
        position: relative
        width: 32px
        height: 32px
        margin: -64px auto 0 auto
        font-size 32px
        color: rgba(255, 255, 255, 0.5)
        clear: both
</style>
