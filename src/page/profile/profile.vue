<template>
    <div class="profile_page">
        <head-top go-back='true' :head-title="profiletitle"></head-top>
        <section>
            <section class="profile-number">
                <router-link :to="userInfo&&userInfo.user_id? '/profile/info' : '/login'" class="profile-link">
                    <img :src="imgBaseUrl + userInfo.avatar" class="privateImage" v-if="userInfo&&userInfo.user_id">
                    <span class="privateImage" v-else>
                        <svg class="privateImage-svg">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#avatar-default"></use>
                        </svg>
                    </span>
                    <div class="user-info">
                        <p>{{userInfo.username || '登录/注册'}}</p>
                        <p>
                            <span class="user-icon">
                                <svg class="icon-mobile" fill="#fff">
                                    <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#mobile"></use>
                                </svg>
                            </span>
                            <span class="icon-mobile-number">{{userInfo.mobile || '暂无绑定手机号'}}</span>
                        </p>
                    </div>
                    <span class="arrow">
                        <svg class="arrow-svg" fill="#fff">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                        </svg>
                    </span>
                </router-link>
            </section>
            <section class="info-data">
                <ul class="clear">
                    <router-link to="/balance" tag="li" class="info-data-link">
                        <span class="info-data-top"><b>{{parseInt(userInfo.balance || 0).toFixed(2)}}</b>元</span>
                        <span class="info-data-bottom">我的余额</span>
                    </router-link>
                    <router-link to="/benefit" tag="li" class="info-data-link">
                        <span class="info-data-top"><b>{{userInfo.gift_amount || 0}}</b>个</span>
                        <span class="info-data-bottom">我的优惠</span>
                    </router-link>
                    <router-link to="/points" tag="li" class="info-data-link">
                        <span class="info-data-top"><b>{{userInfo.point || 0}}</b>分</span>
                        <span class="info-data-bottom">我的积分</span>
                    </router-link>
                </ul>
            </section>
            <section class="profile-1reTe">
                <!-- 我的订单 -->
                <router-link to='/order' class="myorder">
                    <aside>
                        <svg fill="#4aa5f0">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#order"></use>
                        </svg>
                    </aside>
                    <div class="myorder-div">
                        <span>我的订单</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
                <!-- 积分商城 -->
                <a href='https://home.m.duiba.com.cn/#/chome/index' class="myorder">
                    <aside>
                        <svg fill="#fc7b53">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#point"></use>
                        </svg>
                    </aside>
                    <div class="myorder-div">
                        <span>积分商城</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </a>
                <!-- 饿了么会员卡 -->
                <router-link to='/vipcard' class="myorder">
                    <aside>
                        <svg fill="#ffc636">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#vip"></use>
                        </svg>
                    </aside>
                    <div class="myorder-div">
                        <span>饿了么会员卡</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
            </section>
            <section class="profile-1reTe">
                <!-- 服务中心 -->
                <router-link to='/service' class="myorder">
                    <aside>
                        <svg fill="#4aa5f0">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#service"></use>
                        </svg>
                    </aside>
                    <div class="myorder-div">
                        <span>服务中心</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
                <!-- 下载饿了么APP -->
                <router-link to='/download' class="myorder">
                    <aside>
                        <svg fill="#3cabff">
                            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#download"></use>
                        </svg>
                    </aside>
                    <div class="myorder-div" style="border-bottom:0;">
                        <span>下载饿了么APP</span>
                        <span class="myorder-divsvg">
                            <svg fill="#bbb">
                                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#arrow-right"></use>
                            </svg>
                        </span>
                    </div>
                </router-link>
            </section>
        </section>
        <foot-guide></foot-guide>
        <transition name="router-slid" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
import headTop from '@/components/header/head'
import footGuide from '@/components/footer/footGuide'
import { mapState, mapMutations } from 'vuex'
import { imgBaseUrl } from '@/config/env'
import { getImgPath } from '@/components/common/mixin'

export default {
  data () {
    return {
      profiletitle: '我的',
      username: '登录/注册', // 用户名
      resetname: '',
      mobile: '暂无绑定手机号', // 电话号码
      balance: 0, // 我的余额
      count: 0, // 优惠券个数
      pointNumber: 0, // 积分数
      avatar: '', // 头像地址
      imgBaseUrl
    }
  },
  mounted () {
    // this.initData()
  },
  mixins: [getImgPath],
  components: {
    headTop,
    footGuide
  },
  computed: {
    ...mapState(['userInfo']),
    // 后台会返回两种头像地址格式，分别处理
    imgpath () {
      let path
      if (this.avatar.indexOf('/') !== -1) {
        path = imgBaseUrl + this.avatar
      } else {
        path = this.getImgPath(this.avatar)
      }
      this.SAVE_AVANDER(path)
      return path
    }
  },

  methods: {
    ...mapMutations(['SAVE_AVANDER']),
    initData () {
      if (this.userInfo && this.userInfo.user_id) {
        this.avatar = this.userInfo.avatar
        this.username = this.userInfo.username
        this.mobile = this.userInfo.mobile || '暂无绑定手机号'
        this.balance = this.userInfo.balance
        this.count = this.userInfo.gift_amount
        this.pointNumber = this.userInfo.point
      } else {
        this.username = '登录/注册'
        this.mobile = '暂无绑定手机号'
      }
    }
  },
  watch: {
    userInfo: function (value) {
      // this.initData()
    }
  }
}
</script>

<style lang="scss">
@import '../../style/profile.scss';
</style>
