<template>
  <div>
    <head-top signin-up="msite">
      <router-link to="/search/geohash" class="link_search" slot="search">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <circle cx="8" cy="8" r="7" stroke="rgb(255,255,255)" stroke-width="1" fill="none"/>
          <line x1="14" y1="14" x2="20" y2="20" style="stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
      </router-link>
      <router-link to="/home" slot="msite-title" class="msite_title">
        <span class="title_text ellipsis">{{msiteTitle}}</span>
      </router-link>
    </head-top>
    <nav class="msite_nav">
      <vue-swiper v-if="foodTypes.length" :show-index.sync="showIndex"  indicators uselazyload :preload="1"  class="swiper-container" @slide-change="slideChange">
        <vue-swiper-slide class="food_types_container"  v-for="(item, index) in foodTypes" :key="index">
          <router-link :to="{path: '/food', query: {geohash: geohash, title: foodItem.title, restaurant_category_id: getCategoryId(foodItem.link)}}" v-for="foodItem in item" :key="foodItem.id" class="link_to_food">
            <figure>
              <img :src="imgBaseUrl + foodItem.image_url">
              <figcaption>{{foodItem.title}}</figcaption>
            </figure>
          </router-link>
        </vue-swiper-slide>
      </vue-swiper>
      <img :src="flImageUrl" class="fl_back animation_opcity" v-else>
    </nav>
    <div class="shop_list_container">
      <header class="shop_header">
        <svg class="shop_icon">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#shop"></use>
        </svg>
        <span class="shop_header_title">附近商家</span>
      </header>
      <shop-list v-if="hasGetData" :geohash="geohash"></shop-list>
    </div>
    <foot-guide></foot-guide>
  </div>
</template>
<script>
import {mapMutations} from 'vuex'
// import {imgBaseUrl} from 'src/config/env'
import headTop from '@/components/header/head'
import footGuide from '@/components/footer/footGuide'
import shopList from '@/components/common/shoplist'
import urls from '../../config/urls'
import vueSwiper from '@/components/common/vue-swiper.vue'
import vueSwiperSlide from '@/components/common/vue-swiper-slide.vue'
export default {
  data () {
    return {
      geohash: '', // city页面传递过来的地址geohash
      msiteTitle: '请选择地址...', // msite页面头部标题
      foodTypes: [], // 食品分类列表
      hasGetData: false, // 是否已经获取地理位置数据，成功之后再获取商铺列表信息
      imgBaseUrl: 'https://fuss10.elemecdn.com', // 图片域名地址
      flImageUrl: '../../images/f1.svg',
      showIndex: 0
    }
  },
  components: {
    headTop,
    shopList,
    footGuide,
    vueSwiper,
    vueSwiperSlide
  },
  beforeMount () {
    if (!this.$route.query.geohash) {
      this.getGuessCity()
    } else {
      this.geohash = this.$route.query.geohash
    }
    // 保存geohash到vuex
    this.SAVE_GEOHASH(this.geohash)
    // 获取位置信息
    this.getMsiteAddress()
  },
  mounted () {
    this.getMisteFoodType(this.geohash)
  },
  methods: {
    ...mapMutations([
      'RECORD_ADDRESS', 'SAVE_GEOHASH'
    ]),
    slideChange (index, oldIndex) {
      console.log('showIndexChange:', index, oldIndex)
    },
    getMsiteAddress () {
      this.$axios.get(urls.msiteAddress + this.geohash).then((res) => {
        let msiteAddress = res
        if (msiteAddress) {
          this.msiteTitle = msiteAddress.name
          // 记录当前的经纬度
          this.RECORD_ADDRESS(msiteAddress)
          this.hasGetData = true
        }
      })
    },
    getGuessCity () {
      this.$axios.get(urls.city + '?type=guess').then((res) => {
        let cityGuess = res.data
        if (cityGuess) {
          this.geohash = cityGuess.latitude + ',' + cityGuess.longitude
        }
      })
    },
    getMisteFoodType (geohash) {
      let query = '?geohash=' + geohash + '&group_type=1&flags[]=F'
      this.$axios.get(urls.misteFoodType + query).then((res) => {
        let resLength = res.data.length
        let resArr = [...res.data] // 返回一个新的数组
        let foodArr = []
        for (let i = 0, j = 0; i < resLength; i += 8, j++) {
          foodArr[j] = resArr.splice(0, 8)
        }
        this.foodTypes = foodArr
      })
    },
    // 解码url地址，求去restaurant_category_id值
    getCategoryId (url) {
      let urlData = decodeURIComponent(url.split('=')[1].replace('&target_name', ''))
      if (/restaurant_category_id/gi.test(urlData)) {
        return JSON.parse(urlData).restaurant_category_id.id
      } else {
        return ''
      }
    }
  }
}
</script>
<style lang="scss">
@import '@/style/msite.scss';
</style>
