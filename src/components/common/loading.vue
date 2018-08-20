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
      this.positionY++
    }, 600)
  },
  beforeDestory () {
    clearInterval(this.timer)
  }
}
</script>
<style lang="scss">
// @import '~@/style/loading.scss';
@import '../../style/mixin.scss';
@keyframes load {
    0%   {transform: translateY(0px);}
    50%  {transform: translateY(-50px);}
    100% {transform: translateY(0px);}
};
@keyframes ellipse {
    0%   {transform: scale(1)}
    50%  {transform: scale(0.3)}
    100% {transform: scale(1)}
}
.loading_container {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    @include wh(2.5rem, 2.5rem);
    .load_img {
        position: relative;
        z-index: 11;
        @include wh(100%, 100%);
        background: url('../../images/icon_loading.png') no-repeat 0 0;
        background-size: 2.5rem auto;
        animation: load .6s infinite ease-in-out;
        transform: translateY(0px);
    }
    .load_ellipse {
        position: absolute;
        left: 0;
        top: 2.2rem;
        z-index: 10;
        @include wh(2.6rem, 2rem);
        animation: ellipse .6s infinite ease-in-out;
    }
}
</style>
