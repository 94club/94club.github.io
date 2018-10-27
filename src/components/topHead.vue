<template>
  <div class="head">
    <slot name="logoName" />
    <slot name="leftArrow" />
    <slot name="loginBtn" />
    <slot name="rightLogo" />
    <slot name="search" />
    <div v-show="title" class="top-head-title">{{title}}</div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  props: ['title']
}
</script>
<style lang="scss">
@import '../style/px2rem.scss';
.head {
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: px2rem(44);
  line-height: px2rem(44);
  background: #3190e8;
  &-title {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: px2rem(16);
    font-weight: bold;
  }
  &-logo-name, &-login-btn {
    position: absolute;
    color: #fff;
    font-size: px2rem(16);
  }
  &-logo-name {
    left: px2rem(10);
  }
  &-login-btn {
    right: px2rem(10);
  }
}
</style>
