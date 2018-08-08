<template>
  <div>
    <head-top signin-up='home'>
      <span slot='logo' class="head_logo"  @click="reload">ele.me</span>
    </head-top>
    <nav class="city_nav">
      <div class="city_tip">
        <span>当前定位城市：</span>
        <span>定位不准确， 请在城市列表中选择</span>
      </div>
      <router-link :to="'/city/' + guessCityid" class="guess_city">
        <span>{{guessCity}}</span>
        <svg class="arrow_right">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
        </svg>
      </router-link>
      <section class="hot_city_container">
        <h4 class="city_title">热门城市</h4>
        <ul class="citylistul clear">
          <router-link tag="li" v-for="item in hotcity" :to="'/city/' + item.id" :key="item.id">{{item.name}}</router-link>
        </ul>
      </section>
      <section class="group_city_container">
        <ul class="letter_classify">
          <li class="letter_classify_li" v-for="(value, key, index) in sortgroupcity" :key="key">
            <h4 class="city_title">{{key}}
              <span v-if="index === 0">(按字母排序)</span>
            </h4>
            <ul class="groupcity_name_container citylistul clear">
              <router-link tag="li" v-for="item in value" :to="'/city/' + item.id" :key="item.id" class="ellipsis">{{item.name}}</router-link>
            </ul>
          </li>
        </ul>
      </section>
    </nav>
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
    // 获取热门城市
    this.getHotCity('hot')
    // 获取所有城市
    this.getGroupCity('group')
    // 获取猜想城市
    // this.getGuessCity('guess')
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
    getGuessCity (typeValue) {
      this.$axios.get(urls.city + '?type=' + typeValue).then((res) => {
        this.guessCityObj = res
        if (this.guessCityObj) {
          this.guessCity = this.guessCityObj.name
          this.guessCityid = this.guessCityObj.id
        }
      })
    },
    getGroupCity (typeValue) {
      this.$axios.get(urls.city + '?type=' + typeValue).then((res) => {
        this.groupcity = res
      })
    },
    getHotCity (typeValue) {
      this.$axios.get(urls.city + '?type=' + typeValue).then((res) => {
        this.hotcity = res
      })
    },
    // 点击图标刷新页面
    reload () {
      // window.location 只读属性，返回一个 Location对象Location.reload() 方法用来刷新当前页面。该方法只有一个参数，
      // 当值为 true 时，将强制浏览器从服务器加载页面资源，当值为 false 或者未传参时，浏览器则可能从缓存中读取页面
      window.location.reload()
    }
  }
}
</script>
<style lang="scss">
@import '../../style/home.scss'
</style>
