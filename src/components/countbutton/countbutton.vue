<template>
  <div class="count-button">
    <transition name="showButton">
      <span class="add-wrapper" v-show="info.count>0">
          <span class="icon-remove_circle_outline" @click.stop.prevent="removeCount($event)"></span>
      </span>
    </transition>
    <span class="count-num" v-show="info.count>0">{{info.count}}</span>
    <span class="icon-add_circle" @click.stop.prevent="addCount($event)"></span>
  </div>
</template>
<script type="text/ecmascript-6">
  import Vue from 'vue'
  export default {
    name: 'countButton',
    data () {
      return {}
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
        if (!this.info.count) {
          Vue.set(this.info, 'count', 1)
          this.info.count = 1;
        } else {
          this.info.count++;
        }
        this.$emit('add_count', event.target)
      },
      removeCount (event) {
        if (!event._constructed) {
          return
        }
        if (this.info.count > 0) {
          this.info.count--;
        }
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  .count-button
    font-size 0
    .add-wrapper
      display inline-block
    .showButton-enter, .showButton-leave-active
      opacity 0
      transform translate3d(30px, 0, 0) rotate(90deg)
    .showButton-enter-active, .showButton-leave-active
      transition all .3s
    .count-num
      display inline-block
      vertical-align top
      width 12px
      padding-top 6px
      line-height 24px
      text-align center
      font-size 10px
      color rgb(147, 153, 159)
    .icon-remove_circle_outline, .icon-add_circle
      display inline-block
      vertical-align top
      padding 6px
      font-size 24px
      line-height 24px
      color rgb(0, 160, 220)
      transform rotate(0)
</style>
