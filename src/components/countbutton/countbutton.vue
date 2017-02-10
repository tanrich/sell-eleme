<template>
  <div class="count-button">
    <span class="icon-remove_circle_outline" v-show="count" @click="removeCount($event)"></span>
    <span class="count-num" v-show="count">{{count}}</span>
    <span class="icon-add_circle" @click="addCount($event)"></span>
  </div>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'countbutton',
    data () {
      return {
        count: 0
      }
    },
    props: {
      info: {
        type: Object
      }
    },
    methods: {
      addCount (event) {
        if (!event._constructed) {
          return
        }
        if (!this.count) {
          this.count = 1;
        } else {
          this.count++;
        }
      },
      removeCount (event) {
        if (this.count > 0) {
          this.count--;
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .count-button
    font-size 0
    .count-num
      display inline-block
      vertical-align top
      width 24px
      line-height 24px
      text-align center
      font-size 10px
      color rgb(147, 153, 159)
    .icon-remove_circle_outline, .icon-add_circle
      display inline-block
      vertical-align top
      font-size 24px
      color rgb(0, 160, 220)
</style>
