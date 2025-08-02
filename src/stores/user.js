import { defineStore, acceptHMRUpdate } from 'pinia'
import { LocalStorage } from 'quasar'
import { userApi, userAppToken } from 'src/dist/api'
import { customAlert, emptyString } from 'src/dist/tools'

export const useUserStore = defineStore('user', {
  state: () => ({
    fullLoading: false,
    fullLoadingText: '',
    openLogin: false,
    loginCallback: () => {},
    isLogin: false,
    isXCallback: false,
    loginError: '',
    userInfo: {
      id: 0,
      display_name: '······',
      user_img: 'https://cdn.quasar.dev/img/avatar.png',
      x_verify: {
        kyc_status: 'unverified',
        x_verify: {},
      },
    },
  }),

  actions: {
    setFullLoading(loading, text) {
      this.fullLoading = loading
      this.fullLoadingText = text
    },
    setIsXCallback(isXCallback) {
      this.isXCallback = isXCallback
      this.openLogin = true
    },
    setOpenLogin(open, callback) {
      this.openLogin = open
      this.loginCallback = callback
      if (open == true) {
        LocalStorage.set('login_url', window.location.href)
      }
    },
    loginSuccess(token) {
      this.getUserInfo()
      this.isLogin = true
      this.setOpenLogin(false)
      customAlert.success('Login success!')
      userAppToken.save(token)
      // clear the url query
      if (window.history && window.history.replaceState) {
        const cleanUrl = window.location.pathname + window.location.hash
        window.history.replaceState({}, document.title, cleanUrl)
      }

      const loginUrl = LocalStorage.getItem('login_url')
      if (!emptyString(loginUrl)) {
        window.location.href = loginUrl
        LocalStorage.remove('login_url')
      }
    },
    loginOut() {
      this.userInfo = {}
      this.isLogin = false
      userAppToken.del()
    },
    clearUserAddress() {
      this.userAddress = ''
      this.isConnected = false
    },
    async getUserInfo() {
      try {
        const res = await userApi.info()
        this.userInfo = res.data
        this.isLogin = true
      } catch (error) {
        console.error(error)
      }
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
}
