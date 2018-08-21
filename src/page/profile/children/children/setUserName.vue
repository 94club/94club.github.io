 <template>
    <div class="rating_page">
        <head-top head-title="修改用户名" go-back='true'></head-top>
        <section class="setname">
            <section class="setname-top">
                <input type="text" placeholder="输入用户名" :class="{'setname-input':bordercolor}" @input="inputThing" v-model="inputValue">
                <div>
                    <p v-if="earn">用户名只能修改一次（5-24字符之间）</p>
                    <p class="unlikep" v-else>用户名长度在5到24位之间</p>
                </div>
            </section>
            <section class="reset">
                <button :class="{fontopacity:opacityall}" @click="resetName">确认修改</button>
            </section>
        </section>
    </div>
</template>

<script>
import headTop from '@/components/header/head'
import { getImgPath } from '@/components/common/mixin'
import { mapMutations, mapState } from 'vuex'
export default {
  data () {
    return {
      earn: true, // 输入框提醒
      bordercolor: false, // 输入框边框颜色
      opacityall: false, // 字体透明度
      inputValue: '', // 输入框的内容
      newusername: '' // 新用户名
    }
  },
  created () {},
  mixins: [getImgPath],
  components: {
    headTop
  },
  mounted () {},
  computed: {
    ...mapState(['userInfo'])
  },
  props: [],
  methods: {
    ...mapMutations(['RETSET_NAME']),
    inputThing () {
      if (this.inputValue.length < 5 || this.inputValue.length > 24) {
        this.earn = false
        this.bordercolor = true
        this.opacityall = false
        return false
      } else {
        this.earn = true
        this.bordercolor = false
        this.opacityall = true
        return true
      }
    },
    resetName () {
      let checkResult = this.inputThing()
      if (!checkResult) {
        return
      }
      this.RETSET_NAME(this.inputValue)
      this.$router.go(-1)
    }
  }
}
</script>

<style lang='scss'>
@import "../../../../style/username.scss";
</style>
