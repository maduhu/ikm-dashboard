// import { loginAPI} from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    // User Information
    token: getToken()
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    }
  },
  actions: {
    LoginByUser ({ commit }, userInfo) {
      commit('SET_TOKEN', 'admin')
      setToken('admin')
    },
    Logout ({ commit, state }) {
      // Need to call Logout API to destroy token
      commit('SET_TOKEN', '')
      removeToken()
    },
    FrontEndLogout ({ commit }) {
      commit('SET_TOKEN', '')
      removeToken()
    }
  }
}

export default user
