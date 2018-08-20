<template>
  <div class="alert_tip">
    <div class="alert_overlay"></div>
    <section class="tip_text_container">
      <div class="tip_icon">
        <span></span><span></span>
      </div>
      <p class="tip_text">{{alertText}}</p>
      <div class="tip_confirm" @click="closeTip">确认</div>
    </section>
  </div>
</template>

<script>
export default {
  props: ['alertText'],
  methods: {
    closeTip () {
      this.$emit('closeTip')
    }
  }
}
</script>
<style lang="scss">
@import '../../style/alertTip.scss';
</style>
