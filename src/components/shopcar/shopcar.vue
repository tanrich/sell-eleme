<template>
  <div class="shopCar">
    <div class="content" @click="toggleShow">
      <!--购物车显示部分-->
      <div class="content-left" :class="{highLight:totalPrice>0}">
        <div class="logo-wrapper">
          <div class="logo" :class="{highLight:totalPrice>0}">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="count">{{totalCount}}</div>
        </div>
        <div class="price border-1px-right">￥{{totalPrice}}</div>
        <div class="extra">另需配送费￥{{deliveryPrice}}元</div>
        <!--购物小球-->
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
      <!--购物车结算部分-->
      <div class="content-right" @click.stop.prevent="pay">
        <div class="text" :class="{highLight:!disparity}">{{disparityPrice}}</div>
      </div>
    </div>
    <!--购物车清单部分-->
    <transition name="show">
      <div class="carList" v-show="carState">
        <div class="head">
          <div class="name">购物车</div>
          <div class="clear" @click="clear">清除</div>
        </div>
        <div class="list-wrapper" ref="list-wrapper">
          <ul>
            <li v-for="item in selectFoods" class="food border-1px-bottom">
              <div class="name">{{item.name}}</div>
              <div class="price"><span class="rmb">￥</span>{{item.price}}</div>
              <div class="countbt">
                <count-button :info="item"></count-button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </transition>
  </div>
</template>
<script type="text/ecmascript-6">
  import countButton from 'components/countbutton/countbutton'
  import BScroll from 'better-scroll'
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
        showBalls: [],
        fold: true
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
      // 购物总价计算
      totalPrice () {
        let total = 0;
        this.selectFoods.forEach((index) => {
          total += index.price * index.count
        });
        return total;
      },
      // 购物数量计算
      totalCount () {
        let count = 0;
        this.selectFoods.forEach((index) => {
          count += index.count
        });
        return count;
      },
      // 状态计算
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
      },
      // 购物车显示计算
      carState () {
        // 每次改变商品数量和种类的时候都会触发carState计算属性
        if (!this.totalPrice) {
          // 删除购物车中所有商品
          this.fold = true;
          return false;
        }
        let show = !this.fold;
        if (show) {
          // 异步更新使得购物清单能够实时滚动
          this.$nextTick(() => {
            if (!this.listScroll) {
              this.listScroll = new BScroll(this.$refs['list-wrapper'], {
                click: true
              })
            } else {
              // 更新接口
              this.listScroll.refresh();
            }
          });
        }
        return show;
      }
    },
    methods: {
      // 小球选中改变状态
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
      // 动画函数
      beforeEnter (el) {
        let ballCount = this.balls.length;
        while (ballCount--) {
          let ball = this.balls[ballCount];
          if (ball.show) {
            let pos = ball.target.getBoundingClientRect();
            let x = pos.left - 40;
            let y = -(window.innerHeight - pos.top - 40);
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
      },
      toggleShow () {
        // 购物车有商品主动折叠购物车清单
        if (this.totalPrice) {
          this.fold = !this.fold;
          this.$emit('mask_show', this.carState)
        } else {
          // 无购买直接点击购物车
          return false;
        }
      },
      clear () {
        this.selectFoods.forEach((value) => {
          value.count = 0;
          this.$emit('mask_show', this.carState);
        })
      },
      pay () {
        if (this.totalPrice < this.minPrice) {
          return false;
        }
        let info = window.confirm(`支付金额为${this.totalPrice}元,确认支付？`);
        if (info) {
          window.alert(`已成功支付${this.totalPrice}元`);
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/index.styl"
  .shopCar
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
            bottom 40px
            z-index 200
            transition all .5s cubic-bezier(.48, -0.31, .89, .43)
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
            background #00b43c
            color: #fff
    .carList
      position absolute
      top 0
      left 0
      width 100%
      z-index -1
      transform translate3d(0, -100%, 0)
      &.show-enter, &.show-leave-active
        transform translate3d(0, 0, 0)
      &.show-enter-active, &.show-leave-active
        transition all .5s
      .head
        height 40px
        background #f3f5f7
        padding 0 18px
        border-bottom 1px solid rgba(7, 17, 27, .1)
        .name
          float left
          font-size 14px
          line-height 40px
          color rgb(7, 17, 27)
          font-weight 200
        .clear
          float: right
          font-size 12px
          line-height 40px
          color rgb(0, 160, 200)
      .list-wrapper
        padding 0 18px
        max-height: 217px
        overflow: hidden
        background: #fff
        .food
          position: relative
          height 48px
          padding 12px 0
          border-1px-bottom(rgba(7, 17, 27, .1))
          box-sizing border-box
          .name
            font-size 14px
            line-height 24px
            color rgb(7, 17, 27)
          .price
            position: absolute
            right 90px
            top 12px
            font-size 14px
            font-weight 700
            color rgb(240, 20, 20)
            line-height 24px
            .rmb
              font-size 10px
              font-weight normal
          .countbt
            position absolute
            right 0
            top 6px

</style>
