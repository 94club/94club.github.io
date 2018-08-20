 <template>
    <div class="rating_page">
        <head-top head-title="账户信息" go-back='true'></head-top>
        <section class="profile-info">
            <section class="headportrait">
                <input type="file" class="profileinfopanel-upload" @change="uploadAvatar">
                <h2>头像</h2>
                <div class="headportrait-div">
                    <img  v-if="userInfo" :src="imgBaseUrl + userInfo.avatar" class="headportrait-div-top">
                    <span class="headportrait-div-top" v-else>
                        <svg>
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
                        </svg>
                    </span>
                    <span class="headportrait-div-bottom">
                        <svg fill="#d8d8d8">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </span>
                </div>
            </section>
            <router-link to="/profile/info/setusername" class="info-router">
                <section class="headportrait headportraitwo">
                    <h2>用户名</h2>
                    <div class="headportrait-div">
                        <p>{{username}}</p>
                        <span class="headportrait-div-bottom">
                            <svg fill="#d8d8d8">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </section>
            </router-link>
            <router-link to="/profile/info/address" class="info-router">
                <section class="headportrait headportraitwo headportraithree">
                        <h2>收货地址</h2>
                        <div class="headportrait-div">
                            <span class="headportrait-div-bottom">
                                <svg fill="#d8d8d8">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                                </svg>
                            </span>
                        </div>
                </section>
            </router-link>
            <section class="bind-phone">
                账号绑定
            </section>
            <section class="info-router" @click="changePhone">
                <section class="headportrait headportraitwo headportraithree">
                        <h2><img src="../../../images/bindphone.png" style="display:inline-block;margin-right:.4rem;" alt="">手机</h2>
                        <div class="headportrait-div">
                            <p>{{infotel}}</p>
                            <span class="headportrait-div-bottom">
                                <svg fill="#d8d8d8">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                                </svg>
                            </span>
                        </div>
                </section>
            </section>
            <section class="bind-phone">
                安全设置
            </section>
            <router-link to="/forget" class="info-router">
                <section class="headportrait headportraitwo headportraithree">
                        <h2>登录密码</h2>
                        <div class="headportrait-div">
                            <p>修改</p>
                            <span class="headportrait-div-bottom">
                                <svg fill="#d8d8d8">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                                </svg>
                            </span>
                        </div>
                </section>
            </router-link>
            <section class="exitlogin" @click="exitlogin">退出登录</section>
        </section>

        <section class="coverpart" v-if="show">
            <section class="cover-background"></section>
            <section class="cover-content " :class="{'cover-animate' : isEnter, 'cover-animate-leave' : isLeave}">
                <div class="sa-icon">
                    <span class="sa-body"></span>
                    <span class="sa-dot"></span>
                </div>
                <h2>是否退出登录</h2>
                <div class="sa-botton">
                    <button class="waiting" @click="waitingThing">再等等</button>
                    <div style="display:inline-block;">
                        <button class="quitlogin"  @click="outLogin">退出登录</button>
                    </div>
                </div>
            </section>
        </section>
        <alert-tip v-if="showAlert" @closeTip="showAlert = false" :alertText="alertText"></alert-tip>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import headTop from '@/components/header/head'
import alertTip from '@/components/common/alertTip'
import { getImgPath } from '@/components/common/mixin'
import { imgBaseUrl } from '@/config/env'
import { removeStore } from '@/config/mUtils'
import urls from '@/config/urls'

export default {
  data () {
    return {
      username: '', // 用户名
      resetname: '', // 重置用户名
      infotel: '', // 用户手机
      avatar: '', // 用户头像
      show: false, // 显示提示框
      isEnter: true, // 是否登录
      isLeave: false, // 是否退出
      showAlert: false,
      alertText: null,
      imgBaseUrl
    }
  },
  beforeDestroy () {
    clearTimeout(this.timer)
  },
  components: {
    headTop,
    alertTip
  },
  mixins: [getImgPath],
  computed: {
    ...mapState(['userInfo', 'imgPath'])
  },
  methods: {
    ...mapMutations(['OUT_LOGIN', 'SAVE_AVANDER']),
    exitlogin () {
      this.show = true
      this.isEnter = true
      this.isLeave = false
    },
    waitingThing () {
      // 取消推出
      clearTimeout(this.timer)
      this.isEnter = false
      this.isLeave = true
      this.timer = setTimeout(() => {
        clearTimeout(this.timer)
        this.show = false
      }, 200)
    },
    // 退出登录
    async outLogin () {
      this.OUT_LOGIN()
      this.waitingThing()
      this.$router.go(-1)
      removeStore('user_id')
      this.$axios.get(urls.loginOut).then((res) => {
        console.log(res.data)
      })
    },
    changePhone () {
      this.showAlert = true
      this.alertText = '请在手机APP中设置'
    },
    async uploadAvatar () {
      // 上传头像
      if (this.userInfo) {
        let input = document.querySelector('.profileinfopanel-upload')
        let data = new FormData()
        data.append('file', input.files[0])
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        this.$axios.post('/eus/v1/users/' + this.userInfo.user_id + '/avatar', data, config).then((res) => {
          if (res.data) {
            this.userInfo.avatar = res.data
          } else {
            this.showAlert = true
            this.alertText = '上传失败'
          }
        })
      }
    }
  },
  watch: {
    userInfo: function (value) {
      if (value && value.user_id) {
        this.username = value.username
        this.infotel = value.mobile
        this.avatar = value.avatar
      }
    }
  }
}
</script>

<style lang='scss'>
@import "../../../style/info.scss";
</style>
