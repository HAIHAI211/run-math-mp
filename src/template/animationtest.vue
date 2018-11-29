<template>
  <div class="animationtest">
    <div class="circle">
      <span class="num">{{ num }}</span>
    </div>
    <div class="btn" @click="c">开始</div>
    <div class="circle animation-circle"></div>
    <div class="circle" style="width: 400rpx;height: 400rpx;flex-direction: column">
      <div style="font-size: 30rpx">LOL S8 全球总决赛倒计时</div>
      <div style="font-size: 38rpx;">{{ seconds }}秒</div>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        num: 0,
        min: 0,
        max: 1000,
        step: 15,
        useAnimation: true,
        plus: true,
        timeId: null,
        seconds: 0
      }
    },
    created () {
      // const now = this.$moment()
      // const finalGameTime = this.$moment('2018-11-03 15:00')
      // this.seconds = finalGameTime.diff(now, 'seconds')
    },
    mounted () {
      setInterval(() => {
        this.seconds -= 1
      }, 1000)
    },
    methods: {
      c () {
        if (this.timeId) {
          return
        }
        const realStep = this.plus ? this.step * 1 : this.step * -1
        const target = this.plus ? this.max : this.min
        const compareFunc = this.plus ? Math.max : Math.min
        if (this.useAnimation) {
          this.timeId = setInterval(() => {
            if (compareFunc(this.num, target) === target && this.num !== target) {
              this.num += realStep
            } else {
              this.num = target
              clearInterval(this.timeId)
              this.timeId = null
            }
          }, 50)
        }
        this.plus = !this.plus
      }
    }
  }
</script>

<style scoped lang="stylus">
  @import "~@/common/style/mixin.styl"
  .animationtest{
    display flex
    flex-direction column
    align-items center
    .circle{
      width px2rpx(100px)
      height 200rpx
      border-radius 50%
      display flex
      justify-content center
      align-items center
      font-size 50rpx
      background lightseagreen
      color #fff
      margin-top 200rpx
    }
    .btn{
      width 250rpx
      height 80rpx
      display flex
      justify-content center
      align-items center
      background lightblue
    }
  }
  .animation-circle{
    /*animation lanimation 1s ease-in infinite*/
    animation: lanimation .5s ease-in 0s infinite alternate;
    /*animation-delay 0.6s*/
  }

</style>
