import Vue from 'vue'
import App from '../App'
import Router from 'vue-router'
import {routerMode} from '../config/env.js'

const home = () => import('../page/home/home')
const city = () => import('../page/city/city')
const msite = () => import('../page/msite/msite')
const search = () => import('../page/search/search')
const shop = () => import('../page/shop/shop')
const login = () => import('../page/login/login')
const profile = () => import('../page/profile/profile')
const forget = () => import('../page/forget/forget')
const order = () => import('../page/order/order')
const orderDetail = () => import('../page/order/children/orderDetail')
const vipCard = () => import('../page/vipcard/vipCard')
const invoiceRecord = () => import('../page/vipcard/children/invoiceRecord')
const useCart = () => import('../page/vipcard/children/useCart')
const vipDescription = () => import('../page/vipcard/children/vipDescription')
const food = () => import('../page/food/food')
const confirmOrder = () => import('../page/confirmOrder/confirmOrder')
const remark = () => import('../page/confirmOrder/children/remark')
const payment = () => import('../page/confirmOrder/children/payment')
const userValidation = () => import('../page/confirmOrder/children/userValidation')
const invoice = () => import('../page/confirmOrder/children/invoice')
const chooseAddress = () => import('../page/confirmOrder/children/chooseAddress')
const addAddress = () => import('../page/confirmOrder/children/children/addAddress')
const searchAddress = () => import('../page/confirmOrder/children/children/children/searchAddress')
const foodDetail = () => import('../page/shop/children/foodDetail')
const shopDetail = () => import('../page/shop/children/shopDetail')
const shopSafe = () => import('../page/shop/children/children/shopSafe')
const info = () => import('../page/profile/children/info')
const setUserName = () => import('../page/profile/children/children/setUserName')
const address = () => import('../page/profile/children/children/address')
const add = () => import('../page/profile/children/children/children/add')
const addDetail = () => import('../page/profile/children/children/children/children/addDetail')
const balance = () => import('../page/balance/balance')
const balanceDetail = () => import('../page/balance/children/detail')
const benefit = () => import('../page/benefit/benefit')
const coupon = () => import('../page/benefit/children/coupon')
const hbDescription = () => import('../page/benefit/children/hbDescription')
const hbHistory = () => import('../page/benefit/children/hbHistory')
const exchange = () => import('../page/benefit/children/exchange')
const commend = () => import('../page/benefit/children/commend')
const points = () => import('../page/points/points')
const pointsDetail = () => import('../page/points/children/detail')
const service = () => import('../page/service/service')
const questionDetail = () => import('../page/service/children/questionDetail')
const find = () => import('../page/find/find')
const download = () => import('../page/download/download')
const notFound = () => import('../components/common/404.vue')
const test = () => import('../components/common/test.vue')
const notAllow = () => import('../components/common/401.vue')

Vue.use(Router)

const router = new Router({
  mode: routerMode, // 默认值: "hash" (浏览器环境) | "abstract" (Node.js 环境)可选值: "hash" | "history" | "abstract"
  // hash: 使用 URL hash 值来作路由。支持所有浏览器，包括不支持 HTML5 History Api 的浏览器
  // history: 依赖 HTML5 History API 和服务器配置。查看 HTML5 History 模式
  // abstract: 支持所有 JavaScript 运行环境，如 Node.js 服务器端。如果发现没有浏览器的 API，路由会自动强制进入这个模式
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
      }
      return { x: 0, y: to.meta.savedPosition || 0 }
    }
  },
  routes: [{
    path: '/',
    component: App, // 顶层路由，对应index.html
    children: [ // 二级路由。对应App.vue
      // 地址为空时跳转home页面
      {
        path: '',
        redirect: '/home'
      },
      // 首页城市列表页
      {
        path: '/home',
        component: home
      },
      // 当前选择城市页
      {
        path: '/city/:cityId',
        component: city
      },
      // 所有商铺列表页
      {
        path: '/msite',
        component: msite,
        meta: { keepAlive: true }
      },
      // 特色商铺列表页
      {
        path: '/food',
        component: food
      },
      // 搜索页
      {
        path: '/search/:geohash',
        component: search
      },
      // 商铺详情页
      {
        path: '/shop',
        component: shop,
        children: [{
          path: 'foodDetail', // 食品详情页
          component: foodDetail
        }, {
          path: 'shopDetail', // 商铺详情页
          component: shopDetail,
          children: [{
            path: 'shopSafe', // 商铺安全认证页
            component: shopSafe
          }]
        }]
      },
      // 确认订单页
      {
        path: '/confirmOrder',
        component: confirmOrder,
        children: [{
          path: 'remark', // 订单备注
          component: remark
        }, {
          path: 'invoice', // 发票抬头
          component: invoice
        }, {
          path: 'payment', // 付款页面
          component: payment
        }, {
          path: 'userValidation', // 用户验证
          component: userValidation
        }, {
          path: 'chooseAddress', // 选择地址
          component: chooseAddress,
          children: [{
            path: 'addAddress', // 添加地址
            component: addAddress,
            children: [{
              path: 'searchAddress', // 搜索地址
              component: searchAddress
            }]
          }]
        }]
      },
      // 登录注册页
      {
        path: '/login',
        component: login
      },
      // 个人信息页
      {
        path: '/profile',
        component: profile,
        children: [{
          path: 'info', // 个人信息详情页
          component: info,
          children: [{
            path: 'setUserName',
            component: setUserName
          }, {
            path: 'address',
            component: address, // 编辑地址
            children: [{
              path: 'add',
              component: add,
              children: [{
                path: 'addDetail',
                component: addDetail
              }]
            }]
          }]
        },
        {
          path: 'service', // 服务中心
          component: service
        }]
      },
      // 修改密码页
      {
        path: '/forget',
        component: forget
      },
      // 订单列表页
      {
        path: '/order',
        component: order,
        children: [{
          path: 'orderDetail', // 订单详情页
          component: orderDetail
        }]
      },
      // vip卡页
      {
        path: '/vipCard',
        component: vipCard,
        children: [{
          path: 'invoiceRecord', // 开发票
          component: invoiceRecord
        }, {
          path: 'useCart', // 购买会员卡
          component: useCart
        }, {
          path: 'vipDescription', // 会员说明
          component: vipDescription
        }]
      },
      // 发现页
      {
        path: '/find',
        component: find
      },
      // 下载页
      {
        path: '/download',
        component: download
      },
      // 服务中心
      {
        path: '/service',
        component: service,
        children: [{
          path: 'questionDetail', // 订单详情页
          component: questionDetail
        }]
      },
      // 余额
      {
        path: 'balance',
        component: balance,
        children: [{
          path: 'detail', // 余额说明
          component: balanceDetail
        }]
      },
      // 我的优惠页
      {
        path: 'benefit',
        component: benefit,
        children: [{
          path: 'coupon', // 代金券说明
          component: coupon
        }, {
          path: 'hbDescription', // 红包说明
          component: hbDescription
        }, {
          path: 'hbHistory', // 历史红包
          component: hbHistory
        }, {
          path: 'exchange', // 兑换红包
          component: exchange
        }, {
          path: 'commend', // 推荐有奖
          component: commend
        }]
      },
      // 我的积分页
      {
        path: 'points',
        component: points,
        children: [{
          path: 'detail', // 积分说明
          component: pointsDetail
        }]
      },
      {
        path: 'test',
        component: test
      },
      {
        path: '401',
        component: notAllow
      },
      {
        path: '404',
        component: notFound
      }
    ]
  }]
})
export default router
