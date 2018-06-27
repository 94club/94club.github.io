<template>
  <div>
    <head-top signin-up='home'>
      <span slot='logo' class="head_logo"  @click="reload">ele.me</span>
    </head-top>
    <button style="margin-top:100px" @click="goTest">去测试页面</button>
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
        // 静态 String.fromCharCode() 方法返回使用指定的Unicode值序列创建的字符串。
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
      // window.location 只读属性，返回一个 Location对象Location.reload() 方法用来刷新当前页面。该方法只有一个参数，当值为 true 时，将强制浏览器从服务器加载页面资源，当值为 false 或者未传参时，浏览器则可能从缓存中读取页面
      window.location.reload()
    },
    goTest () {
      this.$router.push('./test')
    }
  }
}
</script>
