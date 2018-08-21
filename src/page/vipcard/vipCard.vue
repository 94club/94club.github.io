 <template>
  <div class="rating_page">
        <head-top head-title="会员中心" go-back='true'></head-top>
        <section v-if="userInfo">
            <p class="buy_for">为账户 <span>{{userInfo.username}}</span> 购买会员</p>
            <section class="vip_prerogative">
                <router-link to="/vipcard/vipDescription" class="header_style">
                    <span class="header_left">会员特权</span>
                    <section class="header_right">
                        <span>会员说明</span>
                        <svg fill="#ccc">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </section>
                </router-link>
                <section class="vip_detail">
                    <div class="vip_detail_left">
                        <img src="../../images/sheng.jpeg" height="80" width="70">
                    </div>
                    <div class="vip_detail_right">
                        <h4>减免配送费</h4>
                        <p>每月减免30单，每日可减免3单，每单最高减4元</p>
                        <p>蜂鸟专送专享</p>
                    </div>
                </section>
                <section class="vip_detail">
                    <div class="vip_detail_left">
                        <img src="../../images/jifen.jpeg" height="80" width="70">
                    </div>
                    <div class="vip_detail_right">
                        <h4>减免配送费</h4>
                        <p>每月减免30单，每日可减免3单，每单最高减4元</p>
                        <p>蜂鸟专送专享</p>
                    </div>
                </section>
            </section>
            <section class="apply_vip">
                <header class="header_style">
                    <span class="header_left">开通会员</span>
                </header>
                <section class="apply_vip_buy">
                    <div class="apply_vip_buy_left">
                        <span>1个月</span>
                        <span> ¥20</span>
                    </div>
                    <div class="apply_vip_buy_right" @click="buyCart">购买</div>
                </section>
            </section>
            <router-link to="/vipcard/useCart" class="header_style common_style">
                <span class="header_left">兑换会员</span>
                <section class="header_right">
                    <span>使用卡号卡密</span>
                    <svg fill="#ccc">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg>
                </section>
            </router-link>
            <router-link to="/vipcard/invoiceRecord" class="header_style common_style">
                <span class="header_left">购买记录</span>
                <section class="header_right">
                    <span>开发票</span>
                    <svg fill="#ccc">
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                    </svg>
                </section>
            </router-link>
        </section>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import headTop from '@/components/header/head'
import { mapState, mapMutations } from 'vuex'
export default {
  computed: {
    ...mapState(['userInfo'])
  },
  components: {
    headTop
  },
  methods: {
    ...mapMutations(['ORDER_SUCCESS', 'BUY_CART']),
    buyCart () {
      this.ORDER_SUCCESS({ order_id: '399525134200981325' })
      this.BUY_CART(20)
      this.$router.push('/confirmOrder/payment')
    }
  }
}
</script>
<style lang="scss">
@import '../../style/vipCard.scss';
</style>
