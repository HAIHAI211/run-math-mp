<template>
  <div class="rule-page">
    <wxParse :content="content"/>
  </div>
</template>
<script>
import wxParse from 'mpvue-wxparse'
export default {
  components: {
    wxParse
  },
  data () {
    return {
      content: `<ul>
  <li>发票打飞机萨芬</li>
  <li>发票打飞机萨芬</li>
  <li>发票打飞机萨芬</li>
  <li>发票打飞机萨芬</li>
  <li>发票打飞机萨芬</li>
</ul>`
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~@/common/style/mixin.styl"
  @import "~@/common/style/color.styl"
  @import url("~mpvue-wxparse/src/wxParse.css");
</style>
