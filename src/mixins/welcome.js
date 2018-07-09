import wepy from 'wepy'

export default class welcomeMixin extends wepy.mixin {
  data = {
    loginState: false
  }
  methods = {
  }

  onShow() {
    // 签到逻辑
    if (!this.$parent.welcome || Date.now() > this.$parent.welcome) {
      // 签到
    }

    // 登录逻辑
    if (!this.$parent.session || !this.$parent.session.cookie || !this.$parent.session.expire || Date.now() > this.$parent.session.expire) {
      // 登录
    }

    // 登录成功之后，进入页面逻辑
  }

  onLoad() {
  }
}
