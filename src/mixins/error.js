import wepy from 'wepy'

export default class ErrMixin extends wepy.mixin {
  data = {
    error: {}
  }
  events = {
    'error-clean'(type, param) {
      this.error = {}
      this.$apply()
    }
  }
  errorHandler(err) {
    this.error = err
    this.$apply()
    this.$invoke('error-modal', 'show', err.message)
  }
}
