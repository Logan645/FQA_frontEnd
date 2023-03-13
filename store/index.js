import Cookies from 'js-cookie'
// const cookieparser = require('cookieparser')

export const state = () => ({
  isLoggedIn: false,
  token: '',
  userName: ''
})
// 處理異步方法，但是不能直接修改 state 中的狀態，必須通過調用 commit 方法來觸發 mutations 中的方法。
export const actions = {
  // nuxtServerInit ({ commit }, { req }) {
  //   if (req.headers.cookie) {
  //     const parsed = cookieparser.parse(req.headers.cookie)
  //     const token = parsed.token
  //     console.log(token);
  //   }
  // },
async login({ commit }, loginData ) {
    try {
      const response = await this.$axios.post("/api/login", loginData);
      Cookies.set('token', response.data.token, { secure: true })
      Cookies.set('username',response.data.user.name, { secure: true })
      localStorage.setItem('token', response.data.token)
      localStorage.setItem('username', response.data.user.name)
      commit('setUserName', localStorage.getItem('username'))
      commit('setLoggedIn', true)
      return Promise.resolve(response)
    } catch (e) {
      console.log(e);
    }
  },
  // 登出
  async logout({ commit }){
    await this.$axios.delete("/api/logout",{
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    Cookies.remove('token')
    Cookies.remove('username')
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    this.$router.push({ path: '/' })
    commit('setLoggedIn', false)
    commit('setUserName', '')
  },
}
// 用於修改 state 中的數據和狀態
export const mutations = {
  setToken(state, token) {
    state.token = token
  },
  setLoggedIn(state, data) {
      state.isLoggedIn = data;
  },
  setUserName(state, data) {
    state.userName = data;
  }
}
