<template>
  <div>home
    <div>
      <button @click="goTest">效果测试页</button>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {}
  },
  methods: {
    goTest () {
      this.$router.push('./test')
    }
  }
}
</script>
