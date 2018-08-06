 <template>
  <div class="loading_container">
    <div class="load_img" :style="{ backgroundPositionY: -(positionY % 7) * 2.5 + 'rem' }">
    </div>
    <svg class="load_ellipse" xmlns="http://www.w3.org/2000/svg" version="1.1">
      <ellipse cx="26" cy="10" rx="26" ry="10" style="fill:#ddd;stroke:none;"></ellipse>
    </svg>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        positionY: 0,
        timer: null
      }
    },
    mounted () {
      this.timer = setInterval(() => {
        this.positionY ++
      }, 600)
    },
    beforeDestory () {
      clearInterval(this.timer)
    }
  }
</script>
<style lang="scss">
@import '../../style/loading.scss';
</style>
