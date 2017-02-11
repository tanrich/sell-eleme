<template>
  <div class="shopcar">
    <div class="content">
      <div class="content-left" :class="{highLight:totalPrice>0}">
        <div class="logo-wrapper">
          <div class="logo" :class="{highLight:totalPrice>0}">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="count">{{totalCount}}</div>
        </div>
        <div class="price border-1px-right">￥{{totalPrice}}</div>
        <div class="extra">另需配送费￥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="text" :class="{highLight:!disparity}">{{disparityPrice}}</div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import countbutton from 'components/countbutton/countbutton'
  export default {
    name: 'shopcar',
    data () {
      return {
        disparity: true
      }
    },
    components: {
      countbutton
    },
    props: {
      minPrice: {
        type: Number
      },
      deliveryPrice: {
        type: Number
      },
      selectFoods: {
        type: Array
      }
    },
    computed: {
      totalPrice () {
        let total = 0;
        this.selectFoods.forEach((index) => {
          total += index.price * index.count
        });
        return total;
      },
      totalCount () {
        let count = 0;
        this.selectFoods.forEach((index) => {
          count += index.count
        });
        return count;
      },
      disparityPrice () {
        if (this.totalPrice === 0) {
          this.disparity = true;
          return `￥${this.minPrice}起送`
        } else if (this.totalPrice < this.minPrice) {
          this.disparity = true;
          return `￥还差${this.minPrice}起送`
        } else {
          this.disparity = false;
          return '去结算'
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/index.styl"
  .shopcar
    position: fixed
    left: 0
    bottom 0
    z-index 99
    width 100%
    height 48px
    .content
      display flex
      height inherit
      font-size 0
      .content-left
        flex 1
        background #131d26
        &.highLight
          background: #08121c
        .logo-wrapper
          position: relative
          display inline-block
          position: relative
          top -10px
          padding 6px
          margin 0 12px
          width 56px
          height 56px
          background #131d26
          border-radius 50%
          box-sizing border-box
          vertical-align top
          .logo
            width 100%
            height 100%
            text-align center
            background #2b343c
            border-radius 50%
            &.highLight
              background #00a0dc
              .icon-shopping_cart
                color #fff
            .icon-shopping_cart
              display inline-block
              line-height 44px
              font-size 24px
              color: #80858a
          .count
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color: #fff
            background #f01414
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          font-size 16px
          font-weight 700
          line-height 24px
          height 24px
          color #919396
          padding-right 12px
          margin-top 12px
          vertical-align: top
          box-sizing border-box
          border-1px-right(#2b343c)
        .extra
          display inline-block
          font-size 10px
          line-height 24px
          color #919396
          margin: 12px 0 0 12px
          vertical-align top
      .content-right
        flex 0 0 105px
        width 105px
        background #2b333b
        .text
          font-size 12px
          line-height 24px
          font-weight 700
          color: #979a9c
          height: 48px
          line-height: 48px
          text-align: center
          &.highLight
            background #00b43c;
            color: #fff
</style>
