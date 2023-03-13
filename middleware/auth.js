import Cookies from 'js-cookie'
const cookieparser = require('cookieparser')

// middleware一開始是在server端執行，因此要透過cookieparser解構req中帶來的cookie
// localStorage及Cookies.get是在瀏覽器端中

export default function ({ store, redirect, route, req }) {
  if (process.server) { // 判斷是否在server，server端驗證
    if (req.headers.cookie) { // 如果server有cookie
      const parsed = cookieparser.parse(req.headers.cookie) // 解構cookie
      if (parsed.token) {
        store.commit('setLoggedIn', true)
        store.commit('setUserName', parsed.username)
        console.log('server端驗證成功');
      }
    }
  } else if(Cookies.get('token')){ // 瀏覽器端驗證
    store.commit('setLoggedIn', true)
    store.commit('setUserName', Cookies.get('username'))
    console.log('瀏覽器端驗證成功');
  }
  else {
    return redirect('/', { to: route.path })
  }
}
