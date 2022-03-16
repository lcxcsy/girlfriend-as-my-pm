/*
 * @Author: 刘晨曦
 * @Date: 2022-03-08 16:04:02
 * @LastEditTime: 2022-03-10 16:41:17
 * @LastEditors: your name
 * @Description: Vuex 存储用户信息
 * @FilePath: \client\src\store\modules\users.js
 */
import { TOKEN_NAME, STORE_USER_INFO } from '@/config/constant';
import { setLocalStore, getLocalStore, removeLocalStore } from '@/utils'

export const SET_TOKEN = 'SET_TOKEN'
export const REMOVE_TOKEN = 'REMOVE_TOKEN'
export const SET_USER_INFO = 'SET_USER_INFO'
export const REMOVE_USER_INFO = 'REMOVE_USER_INFO'

export default {
  state: {
    token: getLocalStore(TOKEN_NAME) || '',
    userInfo: getLocalStore(STORE_USER_INFO) ? JSON.parse(getLocalStore(STORE_USER_INFO)) : {},
  },

  getters: {
    token: state => state.token,
    userInfo: state => state.userInfo,
  },

  mutations: {
    // 保存token到本地
    SET_TOKEN: (state, token) => {
      state.token = token
      setLocalStore(TOKEN_NAME, token)
    },
    // 删除token
    REMOVE_TOKEN: () => {
      removeLocalStore(TOKEN_NAME)
    },
    // 保存用户账号到本地
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
      setLocalStore(STORE_USER_INFO, userInfo)
    },
    // 删除本地的用户信息
    REMOVE_USER_INFO: () => {
      removeLocalStore(STORE_USER_INFO)
    }
  },

  actions: {
    // 同步token
    syncToken({ commit }, token) {
      commit(SET_TOKEN, token)
    },
    // 删除token
    removeToken({ commit }) {
      commit(REMOVE_TOKEN)
    },
    // 同步用户信息
    syncUserInfo({ commit }, userInfo) {
      commit(SET_USER_INFO, userInfo)
    },
    removeUserInfo({ commit }) {
      commit(REMOVE_USER_INFO)
    },
  }
}
