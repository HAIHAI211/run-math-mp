<script>
export default {
  mounted () {
    console.log('APP mounted')
  }
}
</script>

<style lang="stylus">
  page{
    background:#F5F5F5;
    height: 100%;
    // animation: name duration timing-function delay iteration-count direction;
    .up-down-animation{
      animation: up-down-animation .5s ease-in 0s infinite alternate;
    }
    .fade-scale-animation{
      animation fade-scale-animation .9s ease-in 0s infinite alternate;
    }
    .scale-animation{
      animation scale-animation .5s ease-in 0s infinite alternate;
    }
    .rotate-animation{
      animation rotate-animation .5s ease-in 0s infinite alternate;
    }
  }
</style>
