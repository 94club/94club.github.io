<template>
  <header class='head_top'>
    <slot name='logo'></slot>
    <slot name='search'></slot>
    <section class="head_goback" v-if="goBack" @click="$router.go(-1)">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" version="1.1">
          <polyline points="12,18 4,9 12,0" style="fill:none;stroke:rgb(255,255,255);stroke-width:2"/>
        </svg>
    </section>
    <router-link :to="userInfo? '/profile':'/login'" v-if='signinUp' class="head_login">
      <svg class="user_avatar" v-if="userInfo">
        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#user"></use>
      </svg>
      <span class="login_span" v-else>登录|注册</span>
    </router-link>
    <section class="title_head ellipsis" v-if="headTitle">
        <span class="title_text">{{headTitle}}</span>
    </section>
    <slot name="edit"></slot>
    <slot name="msite-title"></slot>
    <slot name="changecity"></slot>
    <slot name="changeLogin"></slot>
  </header>
</template>

<script>
import {mapState, mapActions} from 'vuex'
import {getStore} from '../../config/mUtils'
import urls from '../../config/urls'
export default {
  data () {
    return {}
  },
  mounted () {
    // 获取用户信息
    let userId = getStore('user_id')
    if (userId) {
      this.$axios.get(urls.user + '?user_id=' + userId).then((res) => {
        this.$store.commit('GET_USERINFO', res)
      })
    }
  },
  props: ['signinUp', 'headTitle', 'goBack'],
  computed: {
    ...mapState([
      'userInfo'
    ])
  },
  methods: {
    ...mapActions([
      // 'getUserInfo' 外部可以通过this.getUserInfo()调用这个action
    ])
  }
}
</script>

<style lang="scss" scoped>
    @import '../../style/head.scss';
</style>
