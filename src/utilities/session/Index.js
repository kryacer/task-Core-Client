export default {
  getAuth () {
    return JSON.parse(window.localStorage.getItem('auth'))
  },
  setAuth (obj) {
    window.localStorage.setItem('auth', JSON.stringify(obj))
  },
  getUserInfo () {
    return JSON.parse(window.localStorage.getItem('userinfo'))
  },
  setUserInfo (obj) {
    window.localStorage.setItem('userinfo', JSON.stringify(obj))
  },
  clear () {
    window.localStorage.removeItem('auth')
    window.localStorage.removeItem('userinfo')
  }
}
