// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'
import './config/rem'
import axios from 'axios'
import FastClick from 'fastclick'
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', function () {
    FastClick.attach(document.body)
  }, false)
}
Vue.use(MintUI)
Vue.use(VueAwesomeSwiper)
Vue.config.productionTip = false // 生产环境去掉vue的警告信息

const axiosIns = axios.create()
// 在main.js设置全局的请求次数，请求的间隙
axiosIns.defaults.retry = 4
axiosIns.defaults.retryDelay = 1000
if (process.env.NODE_ENV === 'development') {
  axiosIns.defaults.baseURL = 'http://192.168.***:8080'
}
axiosIns.defaults.retry = 4
axiosIns.defaults.retryDelay = 1000
axiosIns.defaults.timeout = 5000
// 添加请求拦截器
axiosIns.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // const token = window.localStorage.getItem('token')
  // 把token放到header里面
  // if (token) {
  //   config.headers['token'] = token
  // }
  return config
}, function (error) {
  // 对请求错误做些什么
  console.log('错误的传参')
  return Promise.reject(error)
})

axiosIns.interceptors.response.use(function (response) {
  // 对响应数据做些事
  return response
}, function (error) {
  // 请求错误时做些事
  // 请求超时的之后，抛出 error.code = ECONNABORTED的错误..错误信息是 timeout of  xxx ms exceeded
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
    var config = error.config
    config.__retryCount = config.__retryCount || 0
    if (config.__retryCount >= config.retry) {
      // Reject with the error
      // window.location.reload()
      return Promise.reject(error)
    }
    // Increase the retry count
    config.__retryCount += 1
    // Create new promise to handle exponential backoff
    var backoff = new Promise(function (resolve) {
      setTimeout(function () {
        // console.log('resolve')
        resolve()
      }, config.retryDelay || 1)
    })
    return backoff.then(function () {
      return axiosIns(config)
    })
  } else {
    return Promise.reject(error)
  }
})
const ajaxMethod = ['get', 'post']
const api = {}
ajaxMethod.forEach((method) => {
  api[method] = function (uri, data, config) {
    return new Promise(function (resolve, reject) {
      axiosIns[method](uri, data, config).then((response) => {
        if (response.data.code === 401) {
          instance.$router.replace('/login')
        } else if (response.data.code === 200) {
          resolve(response)
        }
      }).catch(function (error) {
        console.log(error)
        if (error.response) {
          // 请求已发出，但服务器响应的状态码不在 2xx 范围内
          // console.log(error.response.data)
          // console.log(error.response.status)
          // console.log(error.response.headers)
        } else {
          // console.log(error)
          // Something happened in setting up the request that triggered an Error
          // console.log('Error', error.message)
        }
        // console.log(error.config)
      })
    })
  }
})
Vue.prototype.$axios = api
const instance = new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
