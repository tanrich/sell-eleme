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
        <div class="ball-wrapper">
          <transition
            v-for="ball in balls"
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
          >
            <div v-show="ball.show" class="ball">
              <div class="inner inner-hook"></div>
            </div>
          </transition>
        </div>
      </div>
      <div class="content-right">
        <div class="text" :class="{highLight:!disparity}">{{disparityPrice}}</div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import countButton from 'components/countbutton/countbutton'
  export default {
    name: 'shopCar',
    data () {
      return {
        disparity: true,
        balls: [
          {
            show: false,
            index: 0
          },
          {
            show: false,
            index: 1
          },
          {
            show: false,
            index: 2
          },
          {
            show: false,
            index: 3
          },
          {
            show: false,
            index: 4
          }
        ],
        showBalls: []
      }
    },
    components: {
      countButton
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
          return `￥还差${this.minPrice - this.totalPrice}起送`
        } else {
          this.disparity = false;
          return '去结算'
        }
      }
    },
    methods: {
      drop (target) {
        for (let i = 0; i < this.balls.length; i++) {
          let ball = this.balls[i];
          if (!ball.show) {
            ball.show = true;
            ball.target = target;
            this.showBalls.push(ball);
            return;
          }
        }
      },
      beforeEnter (el) {
        let ballCount = this.balls.length;
        while (ballCount--) {
          let ball = this.balls[ballCount];
          if (ball.show) {
            let pos = ball.target.getBoundingClientRect();
            let x = pos.left - 40;
            let y = -(window.innerHeight - pos.top - 70);
            el.style.display = '';
            el.style.webkitTransform = `translate3d(0,${y}px,0)`;
            el.style.transform = `translate3d(0,${y}px,0)`;
            let inner = el.getElementsByClassName('inner-hook')[0];
            inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
            inner.style.transform = `translate3d(${x}px,0,0)`;
            return;
          }
        }
      },
      enter (el, done) {
        /* eslint-disable no-unused-vars */
        // refresh作用是主动触发浏览器重绘
        let refresh = el.offsetHeight;
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)';
          el.style.transform = 'translate3d(0,0,0)';
          let inner = el.getElementsByClassName('inner-hook')[0];
          inner.style.webkitTransform = 'translate3d(0,0,0)';
          inner.style.transform = 'translate3d(0,0,0)';
        });
        done();
      },
      afterEnter (el) {
        setTimeout(() => {
          let ball = this.showBalls.shift();
          if (ball) {
            ball.show = false;
            el.style.display = 'none';
          }
        }, 500)
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
        position: relative
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
        .ball-wrapper
          .ball
            position: fixed
            left 40px
            bottom 70px
            z-index 200
            // transition all .7s cubic-bezier(0.49, -0.29, 0.75, 0.41)
            transition all .5s cubic-bezier(.48,-0.31,.89,.43)
            .inner
              width 16px
              height 16px
              border-radius 50%
              background rgb(0, 160, 220)
              transition all .5s linear
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
