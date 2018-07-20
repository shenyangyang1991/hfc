import wepy from 'wepy'

export default class nextMixin extends wepy.mixin {
  data = {
    page: 0,
    next: Date.now(),
    isHasNext: true
  }

  async onPullDownRefresh() {
    this.page = 0
    this.next = Date.now()
    try {
      await this.ready()
    } catch (error) {
    } finally {
      wepy.stopPullDownRefresh()
    }
  }

  async onReachBottom() {
    if (this.isHasNext) {
      this.setNext()
      await this.nextPage()
    }
  }

  setNext() {
    if (this.isHasNext) {
      this.page ++
    }
  }
}
