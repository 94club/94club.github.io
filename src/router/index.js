import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '../page/main/main'
import CityPage from '../page/city/city'
import LoginPage from '../page/login/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/main',
      component: MainPage
    },
    {
      path: '/city/:cityId',
      component: CityPage
    },
    {
      path: '/login',
      component: LoginPage
    }
  ]
})
