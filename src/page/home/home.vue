<template>
  <div>
    <head-top signin-up='home'>
      <span slot='logo' class="head_logo"  @click="reload">ele.me</span>
    </head-top>
  </div>
</template>
<script>
import headTop from '../../components/header/head'
import urls from '../../config/urls'
export default {
  data () {
    return {
      guessCity: '', // 当前城市
      guessCityid: '', // 当前城市id
      hotcity: [], // 热门城市列表
      groupcity: {} // 所有城市列表
    }
  },
  mounted () {
    // 获取当前城市
    // 获取热门城市
    let guessCityObj = this.getCity('guess')
    this.hotcity = this.getCity('hot')
    // 获取所有城市
    this.groupcity = this.getCity('group')
    if (this.guessCity) {
      this.guessCity = guessCityObj.name
      this.guessCityid = guessCityObj.id
    }
  },
  components: {
    headTop
  },
  computed: {
    // 将获取的数据按照A-Z字母开头排序
    sortgroupcity () {
      let sortobj = {}
      for (let i = 65; i <= 90; i++) {
        if (this.groupcity[String.fromCharCode(i)]) {
          sortobj[String.fromCharCode(i)] = this.groupcity[String.fromCharCode(i)]
        }
      }
      return sortobj
    }
  },
  methods: {
    getCity (typeValue) {
      this.$axios.get(urls.city + '?type=' + typeValue).then((res) => {
        return res
      })
    },
    // 点击图标刷新页面
    reload () {
      window.location.reload()
    }
  }
}
</script>
