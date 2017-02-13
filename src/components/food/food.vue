<template>
  <div class="food" ref="food-scroll">
    <div class="food-content">
      <div class="head-img">
        <img :src="food.image">
        <div class="back" @click="foodHide">
          <i class="icon-arrow_lift"></i>
        </div>
      </div>
      <div class="title">
        <h1 class="name">{{food.name}}</h1>
        <div class="extra">
          <span class="sell">月售{{food.sellCount}}份</span>
          <span class="rating">好评率{{food.rating}}%</span>
        </div>
        <div class="price">
          <span class="nowPrice"><span class="rmb">￥</span>{{food.price}}</span>
          <span class="oldPrice" v-if="food.oldPrice"><span class="rmb">￥</span>{{food.oldPrice}}</span>
        </div>
        <div class="countbt" v-show="food.count>0">
          <count-button :info="food" ref="countbt" @add_count="_drop"></count-button>
        </div>
        <transition name="fade">
          <div class="add-shopcar" v-show="!this.food.count || this.food.count === 0"
               @click.stop.prevent="addShopCar($event)">
            加入购物车
          </div>
        </transition>
      </div>
      <interval v-show="food.info"></interval>
      <div class="food-introduce" v-show="food.info">
        <h1>商品介绍</h1>
        <p class="text">{{food.info}}</p>
      </div>
      <interval></interval>
      <div class="food-ratings">
        <h1>商品评价</h1>
        <food-ratings :selectType="selectType" :onlyContent="onlyContent" :description="description"
                      :ratings="food.ratings"></food-ratings>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue'
  import BScroll from 'better-scroll'
  import countButton from 'components/countbutton/countbutton'
  import interval from 'components/interval/interval'
  import foodRatings from 'components/foodratings/foodratings'

  const ALL = 2;
  // const POSITVE = 0;
  // const NEGTIVE = 1;
  export default {
    name: 'food',
    data () {
      return {
        selectType: ALL,
        onlyContent: true,
        description: {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    },
    components: {
      countButton, interval, foodRatings
    },
    props: ['food'],
    computed: {},
    methods: {
      // 保持foodratings状态
      keepState () {
        this.selectType = ALL;
        this.onlyContent = true;
      },
      // 异步更新滑动
      Scroll () {
        this.$nextTick(() => {
          if (!this.foodScroll) {
            this.foodScroll = new BScroll(this.$refs['food-scroll'], {
              click: true
            })
          } else {
            this.foodScroll.refresh();
          }
        })
      },
      // 隐藏商品详情页面
      foodHide () {
        this.$emit('foodHide');
      },
      // 加入购物车
      addShopCar (event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++;
        }
        this.$emit('add_count', event.target)
      },
      // 触发小球动画
      _drop (target) {
        // 向父级传递countbutton组件传来的自定义事件
        this.$emit('add_count', target)
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  .food
    position: fixed
    width 100%
    top 0
    left 0
    bottom 48px
    background #fff
    z-index: 97
    overflow hidden
    .head-img
      width 100%
      height 0
      padding-top 100%
      position: relative
      /*这么做的原因是根据屏幕大小调节图片大小，长度与宽度相同*/
      img
        display block
        position: absolute
        width 100%
        height 100%
        top 0
        left 0
      .back
        position: absolute
        left 0
        top 10px
        .icon-arrow_lift
          display block
          font-size 20px
          padding 10px
          color #fff
    .title
      padding 18px
      font-size 0
      position: relative
      .name
        font-size 14px
        font-weight 700
        line-height 14px
        color rgb(7, 17, 27)
      .extra
        margin-top 8px
        font-size 10px
        line-height 10px
        color rgb(147, 153, 159)
        .sell
          margin-right 12px
      .price
        margin-top 18px
        .nowPrice
          font-size 14px
          font-weight 700
          color rgb(240, 20, 20)
          line-height 24px
        .oldPrice
          font-size 10px
          font-weight 700px
          line-height 24px
          color rgb(147, 153, 159)
        .rmb
          font-size 10px
          font-weight normal
      .countbt
        position: absolute
        display inline-block
        right 12px
        bottom 12px
      .add-shopcar
        position: absolute
        display inline-block
        right 18px
        bottom 18px
        height 24px
        line-height 12px
        padding 6px 12px
        color #fff
        font-size 10px
        text-align center
        background rgb(0, 160, 220)
        box-sizing border-box
        border-radius 12px
        &.fade-enter, &.fade-leave-active
          opacity 0
        &.fade-enter-active, &.fade-leave-active
          transition all .2s
    .interval
      height 32px
      background #f3f5f7

    .food-introduce
      padding 18px
      h1
        font-size 14px
        font-weight 700
        color rgb(7, 17, 27)
      .text
        font-size 12px
        line-height 24px
        padding 6px 8px
        color rgb(77, 85, 93)
        font-weight 200
    .food-ratings
      padding-top 18px
      h1
        font-size 14px
        font-weight 700
        padding 0 18px
        color rgb(7, 17, 27)
</style>
