<template>
  <div class="goods">
    <!--左侧菜单栏-->
    <div class="menu-wrapper" ref="menu-wrapper">
      <ul>
        <!--商品种类-->
        <li v-for="(item,index) in goods" class="menu-list border-1px" :class="{'highLight':nowIndex===index}"
            @click="chooseMenu(index,$event)">
          <span class="text border-1px">
             <type v-if="item.type>-1" :type="item.type" size="12px" colorType="0"></type>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <!--右侧商品栏-->
    <div class="foods-wrapper" ref="foods-wrapper">
      <!--class:hook含义是指被js选中但无任何样式-->
      <ul>
        <!--商品种类-->
        <li v-for="item in goods" class="item-list item-list-hook">
          <h1 class="title border-2px-left">{{item.name}}</h1>
          <ul>
            <!--商品列表-->
            <li v-for="info in item.foods" class="info-list border-1px-top">
              <!--商品图片-->
              <div class="icon">
                <img :src="info.icon">
              </div>
              <div class="detail">
                <div class="name">{{info.name}}</div>
                <div class="des" v-if="info.description">{{info.description}}</div>
                <div class="extra">
                  <span class="sell">月售{{info.sellCount}}份</span><span>好评率{{info.rating}}%</span>
                </div>
                <div class="price">
                  <span class="new"><span class="rmb">￥</span>{{info.price}}</span><span v-if="info.oldPrice"
                                                                                         class="old"><span
                  class="rmb">￥</span>{{info.oldPrice}}</span>
                </div>
              </div>
              <!--数量按钮-->
              <div class="countbt">
                <countbutton></countbutton>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--购物车-->
    <shopcar :deliveryPrice="seller.deliveryPrice" :minPrice="seller.minPrice"></shopcar>
  </div>
</template>
<script type="text/ecmascript-6">
  import type from 'components/type/type'
  import BScroll from 'better-scroll'
  import shopcar from 'components/shopcar/shopcar'
  import countbutton from 'components/countbutton/countbutton'
  export default {
    name: 'goods',
    data () {
      return {
        goods: {},
        itemListHeight: [],
        scrollY: 0
      }
    },
    components: {
      type, shopcar, countbutton
    },
    props: ['seller'],
    created () {
      this.$http.get('/api/goods').then(res => {
        res = res.body;
        if (res.errno === 0) {
          this.goods = res.data;
          // vue异步更新数据，需要强制更新dom
          this.$nextTick(() => {
            this._initScroll();
            this._initHeight();
          });
        }
      })
    },
    computed: {
      nowIndex () {
        // 判断scrollY的位置关系，并用menu-list的index与i相比较
        for (let i = 0; i < this.itemListHeight.length; i++) {
          let heightBefore = this.itemListHeight[i];
          let heightAfter = this.itemListHeight[i + 1];
          if (!heightAfter || (this.scrollY >= heightBefore && this.scrollY < heightAfter)) {
            return i;
          }
        }
        return 0;
      }
    },
    methods: {
      // 滚动插件
      _initScroll () {
        this.menuScroll = new BScroll(this.$refs['menu-wrapper'], {
          // better-scroll对于常规事件preventDefault
          click: true
        });

        this.foodsScroll = new BScroll(this.$refs['foods-wrapper'], {
          // 探针作用，希望能够实时获取scroll的位置
          probeType: 3,
          click: true
        });
        // 监听scroll事件，实时获取scrollY
        this.foodsScroll.on('scroll', (position) => {
          this.scrollY = Math.abs(Math.round(position.y));
        });
      },
      // 获取所有li.item-list-hook的高度并存入itemListHeight
      _initHeight () {
        let foodsWrapper = this.$refs['foods-wrapper'].getElementsByClassName('item-list-hook');
        let height = 0;
        this.itemListHeight.push(height);
        for (let i = 0; i < foodsWrapper.length; i++) {
          height += foodsWrapper[i].clientHeight;
          this.itemListHeight.push(height);
        }
      },
      // 点击菜单跳转对应商品
      chooseMenu (index, event) {
        // 网页版因为不存在preventDefault,所以阻止移动端的派发事件
        if (!event._constructed) {
          return false;
        }
        let foodsWrapper = this.$refs['foods-wrapper'].getElementsByClassName('item-list-hook');
        let el = foodsWrapper[index];
        this.foodsScroll.scrollToElement(el, 300);
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/index.styl"
  .goods
    width 100%
    position: absolute
    display flex
    top 174px
    bottom 48px
    overflow: hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-list
        height 54px
        width 56px
        line-height 14px
        padding 0 12px
        border-1px-top(rgba(7, 17, 27, .1))
        display table
        &.highLight
          position relative
          margin-top -1px
          background #fff
          z-index 2
          border-none()
          .text
            font-weight 700
        .icon
          margin-right 2px
        .text
          width 56px
          font-size 12px
          font-weight 200
          line-height 14px
          display table-cell
          vertical-align: middle
    .foods-wrapper
      flex 1
      .item-list
        h1
          height 26px
          line-height 26px
          font-size 12px
          color rgb(147, 153, 159)
          padding-left 14px
          background-color: #f3f5f7
          border-2px-left(#d9dde1)
        .info-list
          position relative
          display flex
          margin 18px
          padding-bottom 18px
          font-size 0
          border-1px-top(rgba(7, 17, 27, .1))
          &:last-child
            border-none()
            margin-bottom 0
          .icon
            flex 0 0 57px
            img
              width 57px
              height 57px
          .detail
            flex 1
            margin-left 10px
            padding-top 2px
            .name
              font-size 14px
              line-height 14px
              color rgb(7, 17, 27)
            .des, .extra
              margin-top 8px
              font-size 10px
              line-height 10px
              color rgb(147, 153, 159)
            .extra
              .sell
                display inline-block
                margin-right 12px
            .des
              line-height 12px
            .price
              font-weight 700
              line-height 24px
              .rmb
                font-size 10px
              .new
                font-size 14px
                color: rgb(240, 20, 20)
                margin-right 8px
              .old
                font-size 10px
                color rgb(147, 153, 159)
                text-decoration line-through

          .countbt
            position: absolute
            right 0
            bottom 12px
</style>
