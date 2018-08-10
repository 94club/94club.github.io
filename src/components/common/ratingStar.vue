<template>
  <div class="rating_container">
    <section class="star_container">
      <svg class="grey_fill" v-for="num in 5" :key="num">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
      </svg>
    </section>
    <div class="star_overflow" :style="'width:' + rating * 2 / 5 + 'rem'">
      <section class="star_container">
        <svg  class="orange_fill" v-for="num in 5" :key="num">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#star"></use>
        </svg>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  props: ['rating']
}
</script>
<style lang="scss">
@import '../../style/rating.scss';
</style>
