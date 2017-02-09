<template>
  <div class="goods">
    <div class="menu-wrapper">
      <ul>
        <li v-for="item in goods" class="menu-list border-1px">
          <span class="text border-1px">
             <type v-if="item.type>-1" :type="item.type" size="12px" colorType="0"></type>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper">
      <ul>
        <li v-for="item in goods" class="item-list">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="info in item.foods" class="info-list border-1px">
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
                  <span>{{info.price}}</span><span v-if="info.oldPrice">{{info.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import type from 'components/type/type'
  export default {
    name: 'goods',
    data () {
      return {
        goods: {}
      }
    },
    components: {
      type
    },
    props: ['seller'],
    created () {
      this.$http.get('/api/goods').then(res => {
        res = res.body;
        if (res.errno === 0) {
          this.goods = res.data;
        }
      })
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
        margin auto
        border-1px(rgba(7, 17, 27, .1))
        display table
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
          border-4px(#d9dde1)
        .info-list
          display flex
          margin 18px
          padding-bottom 18px
          font-size 0
          border-1px(rgba(7,17,27,.1))
          &.last-child
            border-none
          .icon
            display inline-block
          .detail
            display inline-block
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
              .sell
                display inline-block
                margin-right 12px
</style>
