<template>
  <div class="seller" ref="seller">
    <div class="seller-container">
      <div class="seller-header">
        <h1 class="title">{{seller.name}}</h1>
        <div class="des border-1px-bottom">
          <span class="star-style">
            <star :size="36" :score="seller.score"></star>
          </span>
          <span class="rank">({{seller.rank}})</span>
          <span class="count">月售{{seller.sellCount}}单</span>
        </div>
        <div class="detail">
          <div class="box minPrice">
            <div class="name">起送价</div>
            <div class="text">{{seller.minPrice}}<span class="small-tip">元</span></div>
          </div>
          <div class="box deliveryPrice">
            <div class="name">商家配送</div>
            <div class="text">{{seller.deliveryPrice}}<span class="small-tip">元</span></div>
          </div>
          <div class="box deliveryTime">
            <div class="name">平均配送时间</div>
            <div class="text">{{seller.deliveryTime}}<span class="small-tip">分钟</span></div>
          </div>
        </div>
        <div class="favorite">
          <i class="icon-favorite" :class="{active:favorite}" @click="_toggleFavorite($event)"></i>
          <div class="text">{{favoriteText}}</div>
        </div>
      </div>
      <interval v-if="seller.bulletin"></interval>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content">{{seller.bulletin}}</div>
        <ul v-if="seller.supports && seller.supports.length">
          <li v-for="item in seller.supports" class="support border-1px-top">
            <type :type="item.type" size="16px" colorType="0"></type>
            <span class="text">{{item.description}}</span>
          </li>
        </ul>
      </div>
      <interval v-if="seller.pics"></interval>
      <div class="pics">
        <h1 class="title">商家实景</h1>
        <div class="pics-wrapper" ref="pics-wrapper">
          <ul class="pics-list" ref="pics-list">
            <li class="pic" v-for="pic in seller.pics">
              <img :src="pic" width="120" height="90">
            </li>
          </ul>
        </div>
      </div>
      <interval v-if="seller.infos"></interval>
      <div class="info">
        <h1 class="title">商家信息</h1>
        <ul>
          <li v-for="item in seller.infos" class="info-list border-1px-top">{{item}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import star from 'components/star/star'
  import interval from 'components/interval/interval'
  import type from 'components/type/type'
  import BScroll from 'better-scroll'
  import {saveLocalStorage, getLocalStorage} from 'common/js/store'

  const MARGIN = 6;
  const PIC_WIDTH = 120;
  export default {
    name: 'seller',
    data () {
      return {
        favorite: (() => {
          return getLocalStorage(this.seller.id, 'favorite', false)
        })()
      }
    },
    components: {
      star, interval, type
    },
    props: ['seller'],
    created () {
      // DOM元素尚未挂载
    },
    mounted () {
      // DOM元素挂载之后
      this._initScroll();
      this._picScroll();
    },
    computed: {
      favoriteText () {
        return this.favorite === true ? '已收藏' : '收藏'
      }
    },
    methods: {
      _initScroll () {
        this.$nextTick(() => {
          if (!this.initScroll) {
            this.initScroll = new BScroll(this.$refs['seller'], {
              click: true
            })
          } else {
            this.initScroll.refresh();
          }
        })
      },
      _picScroll () {
        if (this.seller.pics) {
          let width = (PIC_WIDTH + MARGIN) * this.seller.pics.length - MARGIN;
          this.$refs['pics-list'].style.width = width + 'px';
        }
        this.$nextTick(() => {
          if (!this.picScroll) {
            this.picScroll = new BScroll(this.$refs['pics-wrapper'], {
              scrollX: true,
              eventPassthrought: 'vertical'
            })
          } else {
            this.picScroll.refresh();
          }
        })
      },
      _toggleFavorite (event) {
        if (!event._constructed) {
          return false;
        }
        this.favorite = !this.favorite;
        saveLocalStorage(this.seller.id, 'favorite', this.favorite);
      }
    },
    watch: {
      'seller' () {
        this._initScroll();
        this._picScroll();
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/index.styl"
  .seller
    position absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .seller-header
      font-size 0
      padding 18px
      position: relative
      .title
        font-size 14px
        color rgb(7, 17, 27)
        line-height 14px
      .des
        padding 8px 0 18px 0
        border-1px-bottom(rgba(7, 17, 27, .1))
        .star-style
          display inline-block
          vertical-align top
          margin-top 1.5px
        .rank, .count
          display inline-block
          vertical-align top
          font-size 10px
          line-height 18px
          color rgb(77, 85, 93)
          margin-left 8px
        .count
          margin-left 12px
      .detail
        display flex
        padding-top 18px
        .box
          flex 1
          text-align center
          border-right 1px solid rgba(7, 17, 27, .1)
          &:last-child
            border-right none
          .name
            font-size 10px
            color rgb(143, 159, 153)
            line-height 10px
          .text
            margin-top 4px
            font-size 24px
            line-height 24px
            font-weight 200
            color rgb(7, 17, 27)
            .small-tip
              font-size 10px

      .favorite
        position: absolute
        text-align center
        top 20px
        right 18px
        min-width 36px
        .icon-favorite
          display inline-block
          font-size 24px
          line-height 24px
          color #d4d6d9
          &.active
            color rgb(240, 20, 20)
        .text
          margin-top 4px
          font-size 10px
          color rgb(77, 85, 93)
          line-height 10px
          color #d4d6d9

  .bulletin
    padding 18px 18px 0 18px
    .title
      font-size 14px
      color rgb(7, 17, 27)
      line-height 14px
    .content
      padding 8px 12px 16px 12px
      font-size 12px
      color rgb(240, 20, 20)
      line-height 16px
    .support
      padding 16px 12px
      font-size 0
      border-1px-top(rgba(7, 17, 27, .1))
      .icon
        vertical-align top
      .text
        font-size 12px
        font-weight 200
        color rgb(7, 17, 27)
        line-height 16px
        vertical-align top
        margin-left 6px

  .pics
    padding 18px 0 18px 18px
    .title
      font-size 14px
      color rgb(7, 17, 27)
      line-height 14px
    .pics-wrapper
      margin-top 12px
      width 100%
      overflow hidden
      white-space nowrap
      font-size 0
      .pics-list
        .pic
          display inline-block
          margin-right 6px
          width 120px
          height 90px
          &:last-child
            margin-right 0

  .info
    padding 18px 18px 0 18px
    .title
      font-size 14px
      color rgb(7, 17, 27)
      line-height 14px
      margin-bottom 12px
    .info-list
      padding 16px 12px
      font-size 12px
      font-weight 200
      color rgb(7, 17, 27)
      line-height 16px
      border-1px-top(rgba(7, 17, 27, .1))
</style>
