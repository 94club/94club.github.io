 <template>
  <div class="safe_shop">
    <head-top head-title="食品监督安全公示" go-back='true'></head-top>
    <section id="scroll_section" class="scroll_container">
       <section>
          <section class="shop_status_container">
            <header>食品监督安全公示</header>
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
          <section class="shop_status_container">
            <header><span>工商登记信息</span></header>
            <ul>
              <li>
              <p>企业名称</p>
              <p>{{shopDetail.identification.company_name}}</p>
              </li>
              <li>
              <p>工商执照注册号</p>
              <p>{{shopDetail.identification.identificate_agency}}</p>
              </li>
              <li>
              <p>注册资本</p>
              <p>{{shopDetail.identification.registered_number}}</p>
              </li>
              <li>
              <p>注册地址</p>
              <p>{{shopDetail.identification.registered_address}}</p>
              </li>
              <li>
              <p>属地监管所</p>
              <p>{{shopDetail.identification.registered_principal}}</p>
              </li>
              <li>
              <p>法定代表人</p>
              <p>{{shopDetail.identification.legal_person}}</p>
              </li>
              <li>
              <p>经营范围</p>
              <p>{{shopDetail.identification.operation_period}}</p>
              </li>
            </ul>
          </section>
          <section class="shop_status_container">
            <header>餐饮许可证</header>
            <ul>
              <li>
              <p>营业范围</p>
              <p>{{shopDetail.identification.operation_period}}</p>
              </li>
              <li>
              <p>许可证有效期</p>
              <p>{{shopDetail.identification.licenses_date}}</p>
              </li>
              <li>
              <p>许可证号</p>
              <p>{{shopDetail.identification.licenses_number}}</p>
              </li>
              <li>
              <p>发证时间</p>
              <p>{{shopDetail.identification.licenses_scope}}</p>
              </li>
              <li>
              <p>发证机关</p>
              <p>{{shopDetail.identification.registered_principal}}</p>
              </li>
            </ul>
          </section>
          <section class="license_img shop_status_container">
            <header>许可证书</header>
            <div class="img_container">
            <img :src="localapi || proapi ? imgBaseUrl + shopDetail.license.business_license_image : getImgPath(shopDetail.license.business_license_image)">
            <img :src="localapi || proapi ? imgBaseUrl + shopDetail.license.catering_service_license_image : getImgPath(shopDetail.license.catering_service_license_image)">
            </div>
          </section>
        </section>
    </section>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import headTop from '@/components/header/head'
import {getImgPath} from '@/components/common/mixin'
import BScroll from 'better-scroll'
import {imgBaseUrl} from '@/config/env'

export default {
  data () {
    return {
      imgBaseUrl
    }
  },
  mounted () {
    this.$nextTick(() => {
      // eslint-disable-next-line
      new BScroll('#scroll_section', {
        deceleration: 0.001,
        bounce: true,
        swipeTime: 1800,
        click: true
      })
    })
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
@import "../../../../style/shopsafe.scss";
</style>
