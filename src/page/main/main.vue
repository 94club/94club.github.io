<template>
  <div class="main-page">
    <top-head>
      <div slot="logoName" class="head-logo-name">ele.me</div>
      <div slot="loginBtn" class="head-login-btn" @click="goLogin">登录|注册</div>
    </top-head>
    <div class="nav">
      <div class="tip">
        <span>当前定位城市：</span>
        <span>定位不准时，请在城市列表中选择</span>
      </div>
      <router-link :to="'/city/' + guessCityid" class="guess-city">
        <span>{{guessCity}}</span>
        <span class="iconfont icon-right">></span>
      </router-link>
    </div>
    <div class="hot-city">
      <h4 class="city-title">热门城市</h4>
      <ul class="city-ul clear">
        <li v-for="(item, index) in cityHot" :key="index">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>
<script>
import constantJson from '../../constant/constant.js'
import TopHead from '../../components/topHead.vue'

export default {
  data () {
    return {
      cityHot: [],
      guessCity: '上海',
      guessCityid: 1,
      cityGroup: {}
    }
  },
  created () {
    this.getCityHot()
    this.getGroupCity()
  },
  components: {
    TopHead
  },
  computed: {
    sortCityGroup () {
      let sortObj = {}
      for (let i = 65; i < 91; i++) {
        if (this.cityGroup[String.fromCharCode(i)]) {
          sortObj[String.fromCharCode(i)] = this.cityGroup[String.fromCharCode(i)]
        }
      }
      return sortObj
    }
  },
  methods: {
    getCityHot () {
      setTimeout(() => {
        this.cityHot = constantJson.cityHot
      }, 2000)
    },
    getGroupCity () {
      setTimeout(() => {
        this.cityGroup = constantJson.cityGroup
      }, 2000)
    },
    goLogin () {
      this.$router.push({path: '/login'})
    }
  }
}
</script>
<style lang="scss">
@import '../../style/px2rem.scss';
.main-page {
  padding-top: px2rem(50);
  margin-bottom: px2rem(16);
  border-top: 1px solid #e4e4e4;
  background-color: #fff;
  .nav {
    margin-bottom: px2rem(8);
    .tip {
      display: flex;
      justify-content: space-between;
      line-height: px2rem(28);
      padding: 0 px2rem(10);
      span:nth-of-type(1) {
        font-size: px2rem(14);
        color: #666;
      }
      span:nth-of-type(2) {
        font-size: px2rem(12);
        color: #9f9f9f;
      }
    }
    .guess-city {
      display: flex;
      position: relative;
      height: px2rem(40);
      line-height: px2rem(40);
      border-top: 1px solid #e4e4e4;
      border-bottom: 2px solid #e4e4e4;
      span:nth-of-type(1) {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        color:#3190e8;
        font-size: px2rem(16)
      }
      .icon-right {
        position: absolute;
        right: px2rem(10);
      }
    }
  }
  .hot-city {
    background-color: #fff;
    margin-bottom: px2rem(8);
    .city-title {
      padding: px2rem(8) 0;
      border-top: 2px solid #e4e4e4;
      border-bottom: 1px solid #e4e4e4;
      font-size: px2rem(14);
      color: #666;
      font-weight: 400;
      text-indent: px2rem(10);
    }
    .city-ul {
      li {
        float: left;
        border-bottom: 1px solid #e4e4e4;
        border-right: 1px solid #e4e4e4;
        width: 25%;
        height: px2rem(40);
        line-height: px2rem(40);
        text-align: center;
        color: #3190e8;
        font-size: px2rem(14);
      }
    }
  }
}
</style>
