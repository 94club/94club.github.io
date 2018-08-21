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
  // 获取用户信息存入vuex
	[types.GET_USERINFO] (state, info) {
		if (state.userInfo && (state.userInfo.username !== info.username)) {
			return
		}
		if (!state.login) {
			return
		}
		if (info) {
			state.userInfo = {...info}
		} else {
			state.userInfo = null
		}
	},
	// 保存geohash
	[types.SAVE_GEOHASH] (state, geohash) {
		state.geohash = geohash
	},
	// 记录当前经度纬度
	[types.RECORD_ADDRESS] (state, {
		latitude,
		longitude
	}) {
		state.latitude = latitude;
		state.longitude = longitude;
	},
	// 退出登录
	[types.OUT_LOGIN] (state) {
		state.userInfo = {}
		state.login = false
	},
	// 保存图片
	[types.SAVE_AVANDER] (state, imgPath) {
		state.imgPath = imgPath
	},
	// 会员卡价格纪录
	[types.BUY_CART] (state, price) {
		state.cartPrice = price;
	},
	//下单成功，保存订单返回信息
	[types.ORDER_SUCCESS] (state, order) {
		state.cartPrice = null;
		state.orderMessage = order;
	},
}