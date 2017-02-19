<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-container">
      <div class="ratings-head">
        <div class="head-left border-1px-right">
          <h1 class="score">{{seller.score}}</h1>
          <div class="name">综合评分</div>
          <div class="text">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="head-right">
          <div class="food-score">
            <span class="name">菜品评价</span>
            <span class="star-style">
              <star :size="36" :score="seller.foodScore"></star>
            </span>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="service-score">
            <span class="name">服务评价</span>
            <span class="star-style">
              <star :size="36" :score="seller.serviceScore"></star>
            </span>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="delivery-time">
            <span class="name">送达时间</span>
            <span class="time">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <interval></interval>
      <food-ratings :selectType="selectType" :onlyContent="onlyContent" :ratings="ratings" @select_type="_getSelectType"
                    @only_content="_getOnlyContent"></food-ratings>
      <div class="ratings-wrapper">
        <ul v-if="ratings && ratings.length">
          <li v-for="item in ratings" v-show="_showJudge(item.rateType,item.text)"
              class="rating-list border-1px-bottom">
            <div class="avatar">
              <img :src="item.avatar" width="28" height="28">
            </div>
            <div class="content">
              <div class="name">{{item.username}}</div>
              <span class="star-style">
                <star :size="24" :score="item.score"></star>
              </span>
              <span class="time" v-if="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
              <div class="text">{{item.text}}</div>
              <div class="extra" v-if="item.recommend && item.recommend.length">
                <i :class="{'icon-thumb_up':item.rateType===0,'icon-thumb_down':item.rateType===1}"
                   class="type"></i>
                <span v-for="foodname in item.recommend" class="foodname">{{foodname}}</span>
              </div>
              <div class="rateTime">{{item.rateTime | dateFormat}}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import star from 'components/star/star'
  import interval from 'components/interval/interval'
  import foodRatings from 'components/foodratings/foodratings'
  import BScroll from 'better-scroll'
  import {dateFormat} from 'common/js/dateFormat'

  const ALL = 2;
  export default {
    name: 'ratings',
    data () {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true
      }
    },
    components: {
      star, interval, foodRatings
    },
    props: ['seller'],
    created () {
      this.$http.get('./api/ratings').then(res => {
        res = res.body;
        if (res.errno === 0) {
          this.ratings = res.data;
          this.$nextTick(() => {
            this._Scroll();
          });
        }
      })
    },
    methods: {
      _Scroll () {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs['ratings'], {
            click: true
          })
        } else {
          this.scroll.refresh();
        }
      },
      _getSelectType (selectType) {
        this.selectType = selectType;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      _getOnlyContent (onlyContent) {
        this.onlyContent = onlyContent;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      _showJudge (type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    },
    filters: {
      dateFormat (time) {
        let date = new Date(time);
        return dateFormat(date, 'YYYY-MM-DD hh:mm');
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/index.styl"
  .ratings
    width 100%
    position absolute
    top 174px
    bottom 0
    left 0
    overflow hidden
    .ratings-head
      display flex
      padding 18px 0
      .head-left
        width 137px
        flex 0 0 137px
        padding 6px 0
        text-align center
        border-1px-right(rgb(147, 153, 159))
        box-sizing border-box
        @media only screen and (max-width: 320px)
          flex: 0 0 120px
          width: 120px
        .score
          font-size 24px
          color rgb(255, 153, 0)
          line-height 28px
        .name
          font-size 12px
          color rgb(7, 17, 27)
          line-height 12px
          margin-top 6px
        .text
          font-size 10px
          color rgb(147, 153, 159)
          margin 8px 0 6px
      .head-right
        padding: 6px 0 6px 24px
        font-size 0px
        flex 1
        @media only screen and (max-width: 320px)
          padding-left: 6px
        .food-score, .service-score
          margin-bottom 8px
          .score
            display inline-block
            vertical-align top
            margin-left 12px
            font-size 12px
            line-height 18px
            color rgb(255, 153, 0)
        .delivery-time
          .time
            display inline-block
            font-size 12px
            line-height 18px
            color rgb(147, 153, 159)
            vertical-align top
        .name
          display inline-block
          font-size 12px
          color rgb(7, 17, 27)
          line-height 18px
          margin-right 12px
          vertical-align top
        .star-style
          display inline-block
          vertical-align top
          margin-top 1.5px
    .ratings-wrapper
      .rating-list
        padding 18px
        display flex
        .avatar
          flex 0 0 28px
          width 28px
          img
            border-radius 50%
        .content
          flex 1
          margin-left 12px
          font-size 0
          position relative
          .name
            font-size 10px
            color rgb(7, 17, 27)
            line-height 12px
            margin-bottom 4px
          .star-style
            display inline-block
            vertical-align top
            margin-top 1px
          .time
            display inline-block
            vertical-align top
            font-size 10px
            font-weight 200
            line-height 12px
            color rgb(147, 153, 159)
            margin-left 6px
          .text
            margin-top 8px
            font-size 12px
            line-height 18px
            color rgb(7, 17, 27)
          .extra
            font-size 0
            margin-top 8px
            .type
              display inline-block
              font-size 12px
              line-height 16px
              margin: 1px 8px 5px 0
              vertical-align top
              &.icon-thumb_up
                color rgb(0, 160, 220)
              &.icon-thumb_down
                color rgb(147, 153, 159)
            .foodname
              display inline-block
              vertical-align top
              max-width 62px
              margin: 0 8px 4px 0
              padding 0 6px
              font-size 9px
              color rgb(147, 153, 159)
              line-height 16px
              border 1px solid rgba(7, 17, 27, .1)
              border-radius 1px
              white-space: nowrap
              overflow: hidden
              text-overflow: ellipsis
              box-sizing border-box
          .rateTime
            position absolute
            top 0
            right 0
            font-size 10px
            font-weight 200
            line-height 12px
            color rgb(147, 153, 159)
</style>
