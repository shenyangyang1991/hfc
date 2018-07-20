import wepy from 'wepy'
import Config from '@/config/index'
import { getUserInfo } from '@/utils/global'
import { getSessionByRemote, http } from '@/utils/request'
import { LOGIN_SUCCESS, LOGIN_ERROR, LOGIN_LOADING } from '@/constant/login'
import { SIGN_KEY } from '@/constant/global'

export default class welcomeMixin extends wepy.mixin {
  data = {
    loginState: 0
  }
  setLoginState(state) {
    this.loginState = state
    this.$apply()
  }
  getLoginState() {
    return this.loginState
  }
  checkLogin() {
    const { session, expire } = this.$parent.session
    return session && session.cookie && session.userinfo && expire > Date.now()
  }
  checkSign() {
    const welcome = this.$parent.welcome
    return welcome > Date.now()
  }
  async login(userinfo) {
    let logininfo = {}
    wepy.showLoading({
      title: '登录中...'
    })
    try {
      logininfo = await wepy.login()
    } catch (e) {
      return false
    }
    const success = await getSessionByRemote({
      url: Config.api.global.login.url,
      method: Config.api.global.login.method,
      data: {
        code: logininfo.code,
        nick_name: userinfo.nick_name,
        avatar_url: userinfo.avatar_url
      }
    })
    wepy.hideLoading()
    return success
  }
  async sign() {
    const responseWrap = await http({
      url: `${Config.api.global.sign.url}?timestamp=${Date.now()}`,
      method: Config.api.global.sign.method
    })
    if (responseWrap.status === '200') {
      wepy.setStorageSync(SIGN_KEY, responseWrap.data)
    }
  }
  async init() {
    if (this.checkLogin() && !this.checkSign()) {
      await this.sign()
    }
    if (this.checkLogin()) {
      this.setLoginState(LOGIN_SUCCESS)
      this.ready && await this.ready()
    } else {
      this.setLoginState(LOGIN_ERROR)
    }
  }
  loginModal() {
    const userinfo = getUserInfo()
    const param = {}
    param.desc = '嗨范儿是全球的最大青年文化资讯平台'
    param.btn = '我知道了'
    if (userinfo) {
      param.name = '欢迎回来'
      param.logo = userinfo.avatar_url
    } else {
      param.name = '欢迎加入'
      param.logo = '/assets/image/default-logo.png'
    }
    this.$invoke('login-modal', 'show', param)
  }
  async onShow() {
    if (!this.checkLogin()) {
      this.loginModal()
    } else if (!this.getLoginState()) {
      await this.init()
    }
  }
  events = {
    async 'login-event'(userinfo) {
      await this.login(userinfo)
      await this.init()
    }
  }
  onLoad() {
  }
}
