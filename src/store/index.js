import Vue from 'vue'
import Vuex from 'vuex'

import { getItem, setItem } from '../utils/storage'

Vue.use(Vuex)

const TOKEN_KEY = 'TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    // 注释为老方法
    // user: JSON.parse(window.localStorage.getItem(TOKEN_KEY))
    user: getItem(TOKEN_KEY)
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload

      // window.localStorage.setItem(TOKEN_KEY, JSON.stringify(state.user))
      setItem(TOKEN_KEY, state.user)
    }
  },
  actions: {
  },
  modules: {
  }
})
