<template>
  <div style="height:2000px">
    <swiper :options="swiperOption" :not-next-tick="swiperOption.notNextTick" ref="swiper1">
    <!-- slides -->
    <swiper-slide
        v-for="(item, index) in floorNavData.list"
        :key="index"
        :class="{'is-active': floorNavData.activeIndex === index}"
        @click.native="onFloorNav(index)" class="auto-width">
       {{item}}
    </swiper-slide>
  </swiper>
  <swiper :options="swiperOption2" :not-next-tick="swiperOption2.notNextTick" ref="swiper2">
    <!-- slides -->
    <swiper-slide>I'm Slide {{floorNavData.activeIndex}}</swiper-slide>
  </swiper>
  <div class="lorem" :style="{opacity: opacityValue}">Lorem ipsum tam similique dolor veniam iure eveniet non vel ut eum iusto sapiente est.</div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      floorNavData: {
        list: ['PHONE', 'IP', 'MIFI', 'Air container', 'TF-card', 'earphone', 'xbox', 'wifi'],
        activeIndex: 0
      },
      index: 0,
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 10, // slide之间的距离（单位px）。
        freeMode: true, // 默认为false，普通模式：slide滑动时只滑动一格，并自动贴合wrapper，设置为true则变为free模式，slide会根据惯性滑动且不会贴合。
        loop: false // 是否可循环
      },
      swiperOption2: {
        direction: 'horizontal', // Slides的滑动方向，可设置水平(horizontal)或垂直(vertical)。
        loop: false,
        effect: 'fade', // 淡入
        // effect : 'cube', // 方块
        // effect : 'coverflow', // 3D流
        // effect : 'flip', // 3D翻转
        autoHeight: true, // 自动高度。设置为true时，wrapper和container会随着当前slide的高度而发生变化。
        onSlideChangeEnd: function () { // 回调函数，swiper从一个slide过渡到另一个slide结束时执行。
          this.floorNavData.activeIndex = this.swiper2.activeIndex
          // setCurrentSlide($(".swiper1 .swiper-slide").eq(n), n);
          // swiper1.slideTo(n, 500, false);
        }
      },
      opacityValue: 0.9
    }
  },
  computed: {
    swiper1 () {
      return this.$refs.swiper1.swiper
    },
    swiper2 () {
      return this.$refs.swiper2.swiper
    }
  },
  created () {
    window.addEventListener('scroll', this.getOpacityValue)
  },
  mounted () {
    // current swiper instance
    // 然后你就可以使用当前上下文内的swiper对象去做你想做的事了
    console.log('this is current swiper instance object', this.swiper1)
    console.log('this is current swiper instance object', this.swiper2)
    this.swiper2.slideTo(3, 1000, false)
  },
  methods: {
    onFloorNav (index) {
      this.floorNavData.activeIndex = index
    },
    getOpacityValue () {
      let b = document.body.scrollTop / 550 || document.documentElement.scrollTop / 550
      this.opacityValue = b > 0.9 ? 0.9 : b
    }
  }
}
</script>
<style>
.auto-width {
  width: auto!important;
}
.is-active {
  border-bottom: 1px solid red;
}
.lorem {
  background: #d9241c;
}
</style>
