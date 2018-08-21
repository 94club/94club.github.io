 <template>
  <div class="page_container">
        <head-top head-title="购买记录" go-back='true'></head-top>
        <!-- 没有办过会员卡，获取不到数据，只好写死 -->
        <section class="invoice_contianer">
            <img src="../../../images/no-log.png">
            <p>没有购买记录</p>
        </section>
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
    ...mapMutations(['SAVE_AVANDER'])
  }
}
</script>
<style lang="scss" scoped>
@import "../../../style/invoiceRecord.scss";
</style>
