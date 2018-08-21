 <template>
<div class="rating_page">
  <head-top head-title="搜索地址" go-back='true'></head-top>
  <section>
    <div class="add-detail">
      <input type="text" placeholder="请输入小区/写字楼/学校等" v-model="inputAdress">
      <button @click="inputThing">确认</button>
    </div>
    <div class="warnpart">为了满足商家的送餐要求，建议您从列表中选择地址</div>
    <div class="point" v-show="warning">
      <p>找不到地址？</p>
      <p>请尝试输入小区、写字楼或学校名</p>
      <p>详细地址（如门牌号）可稍后输入哦。</p>
    </div>
  </section>
  <section class="poisearch-container" v-show="adressList">
    <ul>
      <li v-for="(item, index) in adressList" @click="listClick(index)" :key="index">
        <p>{{item.name}}</p>
        <p>{{item.address}}</p>
      </li>
    </ul>
  </section>
</div>
</template>

<script>
import headTop from '@/components/header/head'
import { getImgPath } from '@/components/common/mixin'
import { searchNearby } from '@/service/getData'
import { mapMutations, mapState } from 'vuex'
export default {
  data () {
    return {
      warning: true,
      inputAdress: '',
      adressList: [] // 地址列表
    }
  },
  created () {
    this.inputAdress = this.addAddress ? this.addAddress : this.inputAdress
  },
  mounted () {
    // getSearchAddress(this.inputAdress).then(res => {
    //   this.adressList=res
    //   this.warning=true
    //   if(this.adressList.length > 0){
    //     this.warning=false
    //     if(this.inputAdress == ''){
    //       this.adressList=[]
    //       this.warning=true
    //     }
    //   }
    // })
  },
  mixins: [getImgPath],
  components: {
    headTop
  },
  computed: {
    ...mapState(['addAddress'])
  },
  methods: {
    ...mapMutations(['SAVE_ADDDETAIL']),
    // 搜索地址
    inputThing () {
      searchNearby(this.inputAdress).then(res => {
        this.adressList = res
        this.warning = true
        if (this.adressList.length > 0) {
          this.warning = false
          if (this.inputAdress === '') {
            this.adressList = []
            this.warning = true
          }
        }
      })
    },
    // 选择地址
    listClick (index) {
      this.SAVE_ADDDETAIL(this.adressList[index].name)
      this.$router.go(-1)
    }
  }
}
</script>
<style lang='scss'>
@import "../../../../../../style/adddetail.scss";
</style>
