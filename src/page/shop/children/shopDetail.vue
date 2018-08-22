 <template>
  <div class="rating_page">
    <head-top head-title="商家详情" go-back='true'></head-top>
    <section class="activities_container">
      <header>活动与属性</header>
      <ul class="actibities_ul">
        <li v-for="item in shopDetail.activities" :key="item.id">
        <span :style='{backgroundColor: "#" + item.icon_color}'>{{item.icon_name}}</span>
        <span>{{item.description}}(APP专享)</span>
        </li>
      </ul>
      <ul class="actibities_ul">
        <li v-for="item in shopDetail.supports" :key="item.id">
        <span :style='{backgroundColor: "#" + item.icon_color}'>{{item.icon_name}}</span>
        <span>{{item.description}}(APP专享)</span>
        </li>
      </ul>
    </section>
    <section class="shop_status_container">
      <router-link to="/shop/shopDetail/shopSafe" class="shop_status_header">
        <span class="shop_detail_title">食品监督安全公示</span>
        <div>
        <span class="identification_detail">企业认证详情</span>
        <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow" >
        <path d="M0 0 L8 7 L0 14"  stroke="#bbb" stroke-width="1.5" fill="none"/>
        </svg>
        </div>
      </router-link>
      <section class="shop_statu_detail">
        <div>
          <svg class="shop_status" v-if="shopDetail.status == 1">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#res-well"></use>
          </svg>
          <svg class="res-well" v-else>
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#res-bad"></use>
          </svg>
        </div>
        <div class="check_date">
          <p>
            <span>监督检查结果：</span>
            <span class="shop_status_well" v-if="shopDetail.status == 1">良好</span>
            <span class="shop_status_bad" v-else>差</span>
          </p>
          <p>
            <span>检查日期：</span>
            <span>{{shopDetail.identification.identificate_date && shopDetail.identification.identificate_date.split('T')[0]}}</span>
          </p>
        </div>
      </section>
    </section>
    <section class="shop_status_info">
      <header>商家信息</header>
      <p>{{shopDetail.name}}</p>
      <p>地址：{{shopDetail.address}}</p>
      <p>营业时间：[{{shopDetail.opening_hours[0]}}]</p>
      <p @click="showLicenseImg(shopDetail.license.business_license_image)">
        <span>营业执照</span>
        <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow" >
        <path d="M0 0 L8 7 L0 14"  stroke="#bbb" stroke-width="1.5" fill="none"/>
        </svg>
      </p>
      <p @click="showLicenseImg(shopDetail.license.catering_service_license_image)">
        <span>餐饮服务许可证</span>
        <svg width="14" height="14" xmlns="http://www.w3.org/2000/svg" version="1.1" class="description_arrow" >
        <path d="M0 0 L8 7 L0 14"  stroke="#bbb" stroke-width="1.5" fill="none"/>
        </svg>
      </p>
    </section>
    <transition name="fade">
      <section class="license_container" v-if="showlicenseImg" @click="showlicenseImg = false">
        <img :src="imgBaseUrl + licenseImg">
      </section>
    </transition>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import headTop from '@/components/header/head'
import { mapState } from 'vuex'
import { getImgPath } from '@/components/common/mixin'
import { imgBaseUrl } from '@/config/env'

export default {
  data () {
    return {
      licenseImg: null,
      showlicenseImg: false,
      imgBaseUrl
    }
  },
  computed: {
    ...mapState(['shopDetail'])
  },
  components: {
    headTop
  },
  mixins: [getImgPath],
  methods: {
    showLicenseImg (img) {
      this.licenseImg = img
      this.showlicenseImg = true
    }
  }
}
</script>
<style lang="scss">
@import '../../../style/shopdetail.scss';
</style>
