/* eslint-disable */
import * as types from './mutations-types'
import {setStore, getStore} from '../config/mUtils'
export default {
  // 记录用户信息
	[types.RECORD_USERINFO] (state, info) {
		state.userInfo = info
		state.login = true
		setStore('user_id', info.user_id)
  },
  //获取用户信息存入vuex
	[types.GET_USERINFO] (state, info) {
		if (state.userInfo && (state.userInfo.username !== info.username)) {
			return
		}
		if (!state.login) {
			return
		}
		if (!info.message) {
			state.userInfo = {...info}
		} else {
			state.userInfo = null
		}
	}
}