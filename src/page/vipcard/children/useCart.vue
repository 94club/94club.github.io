 <template>
  <div class="page_container">
    <head-top head-title="兑换会员" go-back='true'></head-top>
    <p class="buy_for">成功兑换后将关联到当前帐号： <span>{{userInfo.username}}</span></p>
    <form class="form_style">
      <input type="text" name="cartNumber" maxlength="10" v-model="cartNumber" placeholder="请输入10位卡号">
      <input type="text" name="passWord" maxlength="6" v-model="passWord" placeholder="请输入6位卡密">
    </form>
    <p class="determine" :class="{could_pay: couldPay}" @click="confrimPay">兑换</p>
    <footer class="Binding">
      <h3>——温馨提示——</h3>
      <p>新兑换的会员服务，权益以「会员说明」为准。</p>
      <p>月卡：<b>30次</b>减免配送费。</p>
      <p>季卡：<b>90次</b>减免配送费。</p>
      <p>年卡：<b>360</b>次减免配送费。</p>
      <p>＊仅限蜂鸟专送订单，每日最多减免3单，每单最高减免4元（一个月按31天计算）</p>
    </footer>
    <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
  </div>
</template>

<script>
import headTop from '@/components/header/head'
import { mapState } from 'vuex'
import alertTip from '@/components/common/alertTip'

export default {
  data () {
    return {
      cartNumber: null,
      passWord: null,
      showAlert: false,
      alertText: null
    }
  },
  mounted () {},
  computed: {
    ...mapState(['userInfo']),
    couldPay: function () {
      return /^\d{10}$/.test(this.cartNumber) && /^\d{6}$/.test(this.passWord)
    }
  },
  components: {
    headTop,
    alertTip
  },
  methods: {
    async confrimPay () {
      if (this.couldPay) {
        let data = {
          id: this.userInfo.id,
          number: this.cartNumber,
          password: this.passWord
        }
        this.$axios.post('/member/v1/users/' + this.userInfo.id + '/delivery_card/physical_card/bind', data).then((res) => {
          if (res.message) {
            this.showAlert = true
            this.alertText = res.message
          } else if (res.name) {
            this.showAlert = true
            this.alertText = res.name
          }
        })
      }
    }
  }
}
</script>
<style lang='scss'>
@import "../../../style/useCart.scss";
</style>
