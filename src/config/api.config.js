export default {
  global: {
    login: {
      url: '/session',
      method: 'post'
    },
    sign: {
      url: '/sign',
      method: 'get'
    }
  },
  subject: {
    hot: {
      url: '/subject/hot',
      method: 'get'
    },
    follow: {
      url: '/subject/follow',
      method: 'get'
    },
    follower: {
      url: '/subject/follower',
      method: 'post'
    },
    topic: {
      url: '/topic',
      method: 'get'
    },
    subject: {
      url: '/subject',
      method: 'get'
    },
    like: {
      url: '/topic/like',
      method: 'post'
    },
    commentlist: {
      url: '/comment',
      method: 'get'
    },
    comment: {
      url: '/comment',
      method: 'post'
    },
    upImg: {
      url: '/topic',
      method: 'post'
    }
  },
  user: {
    save: {
      url: '/user',
      method: 'post'
    },
    info: {
      url: '/user',
      method: 'get'
    },
    topic: {
      url: '/user/topic',
      method: 'get'
    }
  }
}