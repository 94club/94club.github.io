<template>
  <div class="shoplist_container">
    <ul v-load-more="loadmore" v-if="shopListArr.length" type="1">
      <router-link v-for="item in shopListArr" tag="li" :key="item.id" class="shop_li" :to="{path: 'shop', query: {geohash: geohash, id: item.id}}">
        <section>
          <img :src="imageBaseUrl + item.image_path" class="shop_img">
        </section>
        <hgroup class="shop_right">
          <headedr class="shop_detail_header"><!--preminum额外费用-->
            <h4 :class="item.is_premium ? 'preminum' : ''" class="shop_title ellipsis">{{item.name}}</h4>
            <ul class="shop_detal_ul">
              <li v-for="item in item.supports" :key="item.id" class="supports">{{item.icon_name}}</li>
            </ul>
          </headedr>
          <h5 class="rating_order_num">
            <section class="rating_order_num_left">
              <section class="rating_section">
                <rating-star :rating="item.rating"></rating-star>
                <span class="rating_num">{{item.rating}}</span>
              </section>
              <section class="order_section">
                月售{{item.recent_order_num}}单
              </section>
            </section>
            <section class="rating_order_num_right">
              <span class="delivery_style delivery_left" v-if="item.delivery_mode">{{item.delivery_mode.text}}</span>
              <span class="delivery_style delivery_right" v-if="zhunshi(item.supports)">准时达</span>
            </section>
          </h5>
          <h5 class="fee_distance">
            <p class="fee">
              ￥{{item.minimum_order_amount}}起送<span class="segmentation">/</span>{{item.piecewise_agent_fee.tips}}
            </p>
            <p class="distance_time">
              <span v-if="Number(item.distance)">{{item.distance > 1000 ? (item.distance/1000).toFixed(2) + 'km': item.distance + 'm'}}
                <span class="segemtation">/</span>
              </span>
              <span v-else>{{item.distance}}</span>
              <span class="segemtation">/</span>
              <span class="order_time">{{item.order_load_time}}</span>
            </p>
          </h5>
        </hgroup>
      </router-link>
    </ul>
    <ul v-else class="animation_opacity">
      <li class="list_back_li" v-for="item in 10" :key="item">
        <img :src="imageUrl" class="list_back_svg">
      </li>
    </ul>
    <p class="empty_data" v-if="touched">没有更多了</p>
    <aside class="return_top" @click="backTop" v-if="showBackStatus">
      <svg class="back_top_svg">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#backtop"></use>
      </svg>
    </aside>
    <div ref="abc" style="background-color: red;"></div>
    <transition name="loading">
      <loading v-show="showLoading"></loading>
    </transition>
  </div>
</template>
<script>
import {mapState} from 'vuex'
import {imgBaseUrl} from '@/config/env'
import {showBack, animate} from '@/config/mUtils'
import {loadMore, getImgPath} from './mixin'
import loading from './loading'
import ratingStar from './ratingStar'
import urls from '../../config/urls'
export default {
  data () {
    return {
      imageUrl: '../images/shopback.svg',
      offset: 0, // 批次加载店铺列表，每次加载20个 limit = 20
      shopListArr: [], // 店铺列表数据
      preventRepeatReuqest: false, // 到达底部加载数据，防止重复加载
      showBackStatus: false, // 显示返回顶部按钮
      showLoading: true, // 显示加载动画
      touchend: false, // 没有更多数据
      imgBaseUrl: imgBaseUrl
    }
  },
  mounted () {
    this.initData()
  },
  components: {
    loading,
    ratingStar
  },
  props: ['restaurantCategoryId', 'restaurantCategoryIds', 'sortByType', 'deliveryMode', 'supportIds', 'confirmSelect', 'geohash'],
  mixins: [loadMore, getImgPath],
  computed: {
    ...mapState([
      'latitude', 'longitude'
    ])
  },
  methods: {
    async initData () {
      let res = await this.getShopList((this.latitude, this.longitude, this.offset, this.restaurantCategoryId))
      this.shopListArr = [...res]
      if (res.length < 20) {
        this.touchend = true
      }
      this.hideLoading()
      // 开始监听scrollTop的值，达到一定程度后显示返回顶部按钮
      showBack(callbackStatus => {
        this.showBackStatus = callbackStatus
      })
    },
    getShopList (latitude, longitude, offset, restaurantCategoryId = '', restaurantCategoryIds = '', orderBy = '', deliveryMode = '', supportIds = []) {
      let supportStr = ''
      supportIds.forEach(item => {
        if (item.status) {
          supportStr += '&support_ids[]=' + item.id
        }
      })
      let query = '?latitude=' + latitude + '&longitude=' + longitude + '&offset=' + offset + '&limit=20' + '&restaurant_category_id=' + restaurantCategoryId + 'restaurant_category_ids[]' + restaurantCategoryIds
      query += '&order_by=' + orderBy + '&delivery_mode[]=' + deliveryMode + supportStr
      this.$axios.get(urls.getShopList + query).then((res) => {
        return res
      })
    },
    async loadMore () {
      if (this.touchend) {
        return
      }
      // 防止重复请求
      if (this.preventRepeatReuqest) {
        return
      }
      this.showLoading = true
      this.preventRepeatReuqest = true
      // 数据的定位加20位
      this.offset += 20
      let res = await this.getShopList(this.latitude, this.longitude, this.offset, this.restaurantCategoryId)
      this.hideLoading()
      this.shopListArr = [...this.shopListArr, ...res]
      // 当获取数据小于20，说明没有更多数据，不需要再次请求数据
      if (res.length < 20) {
        this.touchend = true
        return
      }
      this.preventRepeatReuqest = false
    },
    // 返回顶部
    backTop () {
      animate(document.body, {scrollTop: '0'}, 400, 'ease-out')
    },
    // 监听父级传来的数据发生变化时，触发此函数重新根据属性值获取数据
    async listenPropChange () {
      this.showLoading = true
      this.offset = 0
      let res = await this.getShopList(this.latitude, this.longitude, this.offset, '', this.restaurantCategoryIds, this.sortByType, this.deliveryMode, this.supportIds)
      this.hideLoading()
      // 考虑到本地模拟数据是引用类型，所以返回一个新的数组
      this.shopListArr = [...res]
    },
    // 开发环境与编译环境loading隐藏方式不同
    hideLoading () {
      this.showLoading = false
    },
    zhunshi (supports) {
      let zhunStatus
      if ((supports instanceof Array) && supports.length) {
        supports.forEach(item => {
          if (item.icon_name === '准') {
            zhunStatus = true
          }
        })
      } else {
        zhunStatus = false
      }
      return zhunStatus
    }
  },
  watch: {
    // 监听父级传来的restaurantCategoryIds，当值发生变化的时候重新获取餐馆数据，作用于排序和筛选
    restaurantCategoryIds: function (value) {
      this.listenPropChange()
    },
    // 监听父级传来的排序方式
    sortByType: function (value) {
      this.listenPropChange()
    },
    // 监听父级的确认按钮是否被点击，并且返回一个自定义事件通知父级，已经接收到数据，此时父级才可以清除已选状态
    confirmSelect: function (value) {
      this.listenPropChange()
    }
  }
}
</script>
<style lang="scss">
@import '../../style/shoplist.scss';
</style>
