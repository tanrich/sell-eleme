<template>
  <span class="icon" :class="classMapName"></span>
</template>
<script type="text/ecmascript-6">
  export default {
    name: 'type',
    data () {
      return {
        classMap: []
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    computed: {
      classMapName () {
        return this.classMap[this.type] + this.size + this.colorType;
        // 样例 decrease12px3
        // 减 12px尺寸 彩底白字
      }
    },
    props: ['type', 'size', 'colorType']
    // 大小类型，尺寸，颜色类型
  }
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/index.styl"
  .icon
    display inline-block
    vertical-align top
    background-repeat no-repeat

    &.decrease12px1, &.decrease12px0,
    &.discount12px1, &.discount12px0,
    &.special12px1, &.special12px0,
    &.invoice12px1, &.invoice12px0,
    &.guarantee12px1, &.guarantee12px0
      width: 12px
      height: 12px
      background-size: 12px 12px

    &.decrease16px1, &.decrease16px0,
    &.discount16px1, &.discount16px,
    &.special16px1, &.special16px0,
    &.invoice16px1, &.invoice16px0,
    &.guarantee16px1, &.guarantee16px0
      width: 16px
      height: 16px
      background-size: 16px 16px

  //decrease
    &.decrease12px1
      bg-image('decrease_1')
    &.decrease12px0
      bg-image('decrease_3')
    &.decrease16px1
      bg-image('decrease_2')
    &.decrease16px0
      bg-image('decrease_4')

  //discount
    &.discount12px1
      bg-image('discount_1')
    &.discount12px0
      bg-image('discount_3')
    &.discount16px1
      bg-image('discount_2')
    &.discount16px0
      bg-image('discount_4')

  //special
    &.special12px1
      bg-image('special_1')
    &.special12px0
      bg-image('special_3')
    &.special16px1
      bg-image('special_2')
    &.special16px0
      bg-image('special_4')

  //invoice
    &.invoice12px1
      bg-image('invoice_1')
    &.invoice12px0
      bg-image('invoice_3')
    &.invoice16px1
      bg-image('invoice_2')
    &.invoice16px0
      bg-image('invoice_4')

  //guarantee
    &.guarantee12px1
      bg-image('guarantee_1')
    &.guarantee12px0
      bg-image('guarantee_3')
    &.guarantee16px1
      bg-image('guarantee_2')
    &.guarantee16px0
      bg-image('guarantee_4')
</style>
