<template>
  <div class="rating_page">
    <head-top head-title="编辑地址" go-back='true'>
      <span slot="edit" class="edit" @click="editThing">{{editText}}</span>
  </head-top>
    <section class="address">
      <ul class="addresslist">
        <li v-for="(item,index) in removeAddress" :key="index">
          <div>
            <p>{{item.address}}</p>
            <p><span>{{item.phone}}</span><span v-if="item.phonepk">、{{item.phonepk}}</span></p>
          </div>
          <div class="deletesite" v-if="deletesite">
            <span @click="deleteSite(index, item)">x</span>
          </div>
        </li>
      </ul>
      <router-link to='/profile/info/address/add'>
        <div class="addsite">
          <span>新增地址</span>
          <span class="addsvg">
            <svg fill="#d8d8d8">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
            </svg>
          </span>
        </div>
      </router-link>
    </section>
    <transition name="router-slid" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import headTop from '@/components/header/head'
import { getImgPath } from '@/components/common/mixin'
import { mapState, mapActions } from 'vuex'
// import { getAddressList, deleteAddress } from 'src/service/getData'

export default {
  data () {
    return {
      deletesite: false, // 是否编辑状态
      editText: '编辑',
      adressList: [] // 地址列表
    }
  },
  mounted () {
    this.initData()
  },
  mixins: [getImgPath],
  components: {
    headTop
  },
  computed: {
    ...mapState(['userInfo', 'removeAddress'])
  },
  methods: {
    ...mapActions(['saveAddress']),
    // 初始化信息
    initData () {
      if (this.userInfo && this.userInfo.user_id) {
        this.saveAddress()
      }
    },
    // 编辑
    editThing () {
      if (this.editText === '编辑') {
        this.editText = '完成'
        this.deletesite = true
      } else {
        this.editText = '编辑'
        this.deletesite = false
      }
    },
    // 删除地址
    async deleteSite (index, item) {
      if (this.userInfo && this.userInfo.user_id) {
        // await deleteAddress(this.userInfo.user_id, item.id)
        this.$axios.post('/v1/users/' + this.userInfo.user_id + '/addresses/' + item.id, {}).then((res) => {
          this.removeAddress.splice(index, 1)
        })
      }
    }
  },
  watch: {
    userInfo: function (value) {
      if (value && value.user_id) {
        this.initData()
      }
    }
  }
}
</script>
<style lang='scss' scoped>
@import "../../../../style/address.scss";
</style>
