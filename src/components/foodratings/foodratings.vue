<template>
  <div class="foodRatings">
    <div class="rating-type border-1px-bottom">
      <span class="type all" @click.stop-prevent="select(2,$event)" :class="{active:selectType===2}">
        <span class="text">{{description.all}}</span>
        <span class="num">{{ratings.length}}</span>
      </span>
      <span class="type positive" @click.stop-prevent="select(0,$event)" :class="{active:selectType===1}">
        <span class="text">{{description.positive}}</span>
        <span class="num">{{positiveNum}}</span>
      </span>
      <span class="type negative" @click.stop-prevent="select(1,$event)" :class="{active:selectType===0}">
        <span class="text">{{description.negative}}</span>
        <span class="num">{{negativeNum}}</span>
      </span>
    </div>
    <div class="only-content">
      <i class="icon-check_circle" @click.stop.prevent="toggleContent" :class="{active:onlyContent}"></i>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  const ALL = 2;
  const POSITIVE = 0;
  const NEGTIVE = 1;
  export default {
    name: 'foodRating',
    data () {
      return {}
    },
    props: {
      ratings: {
        type: Array,
        default () {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: true
      },
      description: {
        type: Object,
        default () {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          }
        }
      }
    },
    computed: {
      // 评价推荐数量
      positiveNum () {
        const arr = this.ratings.filter((value) => {
          return value.rateType === POSITIVE;
        });
        return arr.length;
      },
      // 评价消极数量
      negativeNum () {
        const arr = this.ratings.filter((value) => {
          return value.rateType === NEGTIVE;
        });
        return arr.length;
      }
    },
    methods: {
      select (selectType, event) {
        if (!event._constructed) {
          return false;
        }
        this.selectType = selectType;
      },
      toggleContent () {
        if (!event._constructed) {
          return false;
        }
        this.onlyContent = !this.onlyContent;
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
  @import "../../common/stylus/index.styl"
  .foodRatings
    .rating-type
      margin 18px 18px 0 18px
      padding-bottom 18px
      font-size 0
      box-sizing border-box
      border-1px-bottom(rgba(7, 17, 27, .1))
      .type
        display inline-block
        text-align center
        padding 8px 12px
        margin-right 8px
        border-radius 1px
        color rgb(77, 85, 93)
        .text
          display inline-block
          font-size 12px
          line-height 16px
          margin-right 2px
        .num
          display inline-block
          font-size 8px
        &.all, &.positive
          background rgba(0, 160, 220, .2)
          &.active
            background rgb(0, 160, 220)
            color #fff
        &.negative
          background rgba(77, 85, 93, .2)
          margin-right 0
          &.active
            background rgb(77, 85, 93)
            color #fff
    .only-content
      font-size 0
      padding 12px 18px
      border-bottom 1px solid rgba(7, 17, 27, .1)
      .icon-check_circle
        display inline-block
        vertical-align top
        margin-right 4px
        font-size 24px
        line-height 24px
        color rgb(147, 153, 159)
        &.active
          color: #00c850
      .text
        display inline-block
        margin-top 6px
        vertical-align top
        font-size 12px
        color rgb(147, 153, 159)
</style>
