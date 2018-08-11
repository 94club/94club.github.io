<template>
  <div class="city_container">
    <head-top :head-title="cityname" go-back='true'>
      <router-link to="/home" slot="change-city">切换城市</router-link>
    </head-top>
    <form class="city_form" v-on:submit.prevent>
      <div>
        <input type="search" name="city" placeholder="输入学校、商务楼、地址" class="city_input input_style" required v-model='inputVaule'>
      </div>
      <div>
        <input type="submit" name="submit" class="city_submit input_style" @click='postpois' value="提交">
      </div>
    </form>
    <header v-if="historytitle" class="pois_search_history">搜索历史</header>
    <ul class="getpois_ul">
      <li v-for="(item, index) in placelist" @click="nextPage(item, index)" :key="index">
        <h4 class="pois_name ellipsis">{{item.name}}</h4>
        <p class="pois_address ellipsis">{{item.address}}</p>
      </li>
    </ul>
    <footer v-if="historytitle && placelist.length" class="clear_all_history" @click="clearAll">清空所有</footer>
    <div class="search_none_place" v-if="placeNone">很抱歉：无搜索结果</div>
  </div>
</template>
<script>
import headTop from '@/components/header/head'
import {getStore, setStore, removeStore} from '@/config/mUtils'
import urls from '../../config/urls'

export default {
  data () {
    return {
      inputVaule: '', // 搜索地址
      cityId: '', // 当前城市id
      cityname: '', // 当前城市名字
      placelist: [], // 搜索城市列表
      placeHistory: [], // 历史搜索记录
      historytitle: true, // 默认显示搜索历史头部，点击搜索后隐藏
      placeNone: false // 搜索无结果，显示提示信息
    }
  },
  mounted () {
    this.initData()
    this.getCityName()
  },
  components: {
    headTop
  },
  methods: {
    getCityName () {
      this.cityId = this.$route.params.cityId
      this.$axios.get(urls.city + '/' + this.cityId).then((res) => {
        this.cityname = res.name
      })
    },
    initData () {
      // 获取搜索历史记录
      if (getStore('placeHistory')) {
        this.placelist = JSON.parse(getStore('placeHistory'))
      } else {
        this.placelist = []
      }
    },
    postpois () {
      if (this.inputVaule) {
        let query = '?city_id=' + this.cityId + '&keyword=' + this.inputVaule + '&type=search'
        this.$axios.get(urls.searchplace + query).then((res) => {
          console.log(res)
          this.historytitle = false
          this.placelist = res
          this.placeNone = res.length === 0
        })
      }
    },
    /**
     * 点击搜索结果进入下一页面时进行判断是否已经有一样的历史记录
     * 如果没有则新增，如果有则不做重复储存，判断完成后进入下一页
     */
    nextPage (item, index) {
      let history = getStore('placeHistory')
      let choosePlace = this.placelist[index]
      let geohash = item.geohash
      if (history) {
        let checkrepeat = false
        this.placeHistory = JSON.parse(history)
        this.placeHistory.forEach(item => {
          if (item.geohash === geohash) {
            checkrepeat = true
          }
        })
        if (!checkrepeat) {
          this.placeHistory.push(choosePlace)
        }
      } else {
        this.placeHistory.push(choosePlace)
      }
      setStore('placeHistory', this.placeHistory)
      this.$router.push({path: '/msite', query: {geohash: geohash}})
    },
    clearAll () {
      removeStore('placeHistory')
      this.initData()
    }
  }
}
</script>
<style lang="scss">
@import '../../style/city.scss'
</style>
