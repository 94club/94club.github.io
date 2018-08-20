<template>
  <div class="loginContainer">
    <head-top :head-title="loginWay? '登录':'密码登录'" goBack="true">
        <!-- <div slot="changeLogin" class="change_login" @click="changeLoginWay">{{loginWay? "密码登录":"短信登录"}}</div> -->
    </head-top>
    <form class="loginForm" v-if="loginWay">
      <section class="input_container phone_number">
        <input type="text" placeholder="账号密码随便输入" name="phone" maxlength="11" v-model="phoneNumber">
        <button @click.prevent="getVerifyCode" :class="{right_phone_number:rightPhoneNumber}" v-show="!computedTime">获取验证码</button>
        <button  @click.prevent v-show="computedTime">已发送({{computedTime}}s)</button>
      </section>
      <section class="input_container">
        <input type="text" placeholder="验证码" name="mobileCode" maxlength="6" v-model="mobileCode">
      </section>
    </form>
    <form class="loginForm" v-else>
      <section class="input_container">
        <input type="text" placeholder="账号" v-model.lazy="userAccount">
      </section>
      <section class="input_container">
        <input v-if="!showPassword" type="password" placeholder="密码"  v-model="password">
        <input v-else type="text" placeholder="密码"  v-model="password">
        <div class="button_switch" :class="{change_to_text: showPassword}">
          <div class="circle_button" :class="{trans_to_right: showPassword}" @click="changePasswordType"></div>
          <span>abc</span>
          <span>...</span>
        </div>
      </section>
      <section class="input_container captcha_code_container">
        <input type="text" placeholder="验证码" maxlength="4" v-model="codeNumber">
        <div class="img_change_img">
          <img v-show="captchaCodeImg" :src="captchaCodeImg">
          <div class="change_img" @click="getCaptchaCode">
            <p>看不清</p>
            <p>换一张</p>
          </div>
        </div>
      </section>
    </form>
    <p class="login_tips">
        温馨提示：未注册过的账号，登录时将自动注册
    </p>
    <p class="login_tips">
        注册过的用户可凭账号密码登录
    </p>
    <div class="login_container" @click="mobileLogin">登录</div>
    <router-link to="/forget" class="to_forget" v-if="!loginWay">重置密码？</router-link>
    <alert-tip v-if="showAlert" :showHide="showAlert" @closeTip="closeTip" :alertText="alertText"></alert-tip>
  </div>
</template>

<script>
import headTop from '../../components/header/head'
import alertTip from '../../components/common/alertTip'
// import {localapi, proapi, imgBaseUrl} from '../../config/env'
import {mapMutations} from 'vuex'
import urls from '../../config/urls'
export default {
  data () {
    return {
      loginWay: false, // 登录方式，默认短信登录
      showPassword: false, // 是否显示密码
      phoneNumber: null, // 电话号码
      mobileCode: null, // 短信验证码
      validate_token: null, // 获取短信时返回的验证值，登录时需要
      computedTime: 0, // 倒数记时
      userInfo: null, // 获取到的用户信息
      userAccount: null, // 用户名
      password: null, // 密码
      captchaCodeImg: null, // 验证码地址
      codeNumber: null, // 验证码
      showAlert: false, // 显示提示组件
      alertText: null // 提示的内容
    }
  },
  created () {
    this.getCaptchaCode()
  },
  components: {
    headTop,
    alertTip
  },
  computed: {
    // 判断手机号码
    rightPhoneNumber () {
      return /^1\d{10}$/gi.test(this.phoneNumber)
    }
  },
  methods: {
    ...mapMutations([
      'RECORD_USERINFO'
    ]),
    // 改变登录方式
    changeLoginWay () {
      this.loginWay = !this.loginWay
    },
    // 是否显示密码
    changePasswordType () {
      this.showPassword = !this.showPassword
    },
    // 获取验证吗，开发环境使用固定的图片，生产环境使用真实的验证码
    async getCaptchaCode () {
      this.$axios.post(urls.getCaptchas, {}).then((res) => {
        this.captchaCodeImg = res.data
      })
    },
    // 获取短信验证码
    async getVerifyCode () {
      if (this.rightPhoneNumber) {
        this.computedTime = 30
        this.timer = setInterval(() => {
          this.computedTime--
          if (this.computedTime === 0) {
            clearInterval(this.timer)
          }
        }, 1000)
        // 判读用户是否存在
        let url = '?phone=' + this.phoneNumber + '&type=mobile'
        this.$axios.get(urls.checkExist + url).then((res) => {
          if (res.message) {
            this.showAlert = true
            this.alertText = res.message
          } else if (!res.is_exists) {
            this.showAlert = true
            this.alertText = '您输入的手机号尚未绑定'
          }
        })
        // 发送短信验证码
        // let res = await mobileCode(this.phoneNumber)
        // if (res.message) {
        //   this.showAlert = true
        //   this.alertText = res.message
        //   return
        // }
        // this.validate_token = res.validate_token
      }
    },
    // 发送登录信息
    async mobileLogin () {
      if (this.loginWay) {
        if (!this.rightPhoneNumber) {
          this.showAlert = true
          this.alertText = '手机号码不正确'
        } else if (!(/^\d{6}$/gi.test(this.mobileCode))) {
          this.showAlert = true
          this.alertText = '短信验证码不正确'
        }
        // 手机号登录
        // this.userInfo = await sendLogin(this.mobileCode, this.phoneNumber, this.validate_token)
      } else {
        if (!this.userAccount) {
          this.showAlert = true
          this.alertText = '请输入手机号/邮箱/用户名'
        } else if (!this.password) {
          this.showAlert = true
          this.alertText = '请输入密码'
        } else if (!this.codeNumber) {
          this.showAlert = true
          this.alertText = '请输入验证码'
        }
        // 用户名登录
        let data = {username: this.userAccount, password: this.password, captcha_code: this.codeNumber}
        this.$axios.post(urls.accountLogin, data).then((res) => {
          // 如果返回的值不正确，则弹出提示框，返回的值正确则返回上一页
          this.userInfo = res.data
          if (!this.userInfo.user_id) {
            this.showAlert = true
            this.alertText = res.message
            if (!this.loginWay) this.getCaptchaCode()
          } else {
            this.RECORD_USERINFO(this.userInfo)
            this.$router.go(-1)
          }
        })
      }
    },
    closeTip () {
      this.showAlert = false
    }
  }
}
</script>
<style lang="scss">
  @import '../../style/login.scss';
</style>
