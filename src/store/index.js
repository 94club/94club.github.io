/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'

Vue.use(Vuex)
const state = {
	userInfo: null, // 用户信息
	latitude: '', // 当前位置纬度
	longitude: '', // 当前位置经度
	geohash: ''
}
export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})
