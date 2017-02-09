<template>
  <div class="star" :class="starType">
    <span v-for="listClass in listClasses" :class="listClass" class="star-list"></span>
  </div>
</template>
<script type="text/ecmascript-6">
  const LENGTH = 5;
  const ON = 'on';
  const HALF = 'half';
  const OFF = 'off';
  export default {
    name: '',
    data () {
      return {}
    },
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType () {
        return 'star-' + this.size;
      },
      listClasses () {
        let result = [];
        // 计算规则，<0.5取0，>=0.5且<1取0.5
        let score = Math.floor(this.score);
        let hasHalf = (score % 1 !== 0);
        let interger = Math.floor(score);
        for (let i = interger; i > 0; i--) {
          result.push(ON);
        }
        if (hasHalf) {
          result.push(HALF);
        }
        while (result.length < LENGTH) {
          result.push(OFF);
        }
        return result;
      }
    }
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/index.styl"
  .star
    font-size: 0
    .star-list
      display: inline-block
      background-repeat: no-repeat
    &.star-24
      .star-list
        width: 10px
        height: 10px
        margin-right: 3px
        background-size: 10px 10px
        &.last-child
          margin-right: 0
        &.off
          bg-image('star24_off')
        &.halt
          bg-image('star24_half')
        &.on
          bg-image('star24_on')
    &.star-36
      .star-list
        width: 15px
        height: 15px
        margin-right: 6px
        background-size: 15px 15px
        &.last-child
          margin-right: 0
        &.off
          bg-image('star36_off')
        &.halt
          bg-image('star36_half')
        &.on
          bg-image('star36_on')
    &.star-48
      .star-list
        width: 20px
        height: 20px
        margin-right: 22px
        background-size: 20px 20px
        &.last-child
          margin-right: 0
        &.off
          bg-image('star48_off')
        &.halt
          bg-image('star48_half')
        &.on
          bg-image('star48_on')
</style>
