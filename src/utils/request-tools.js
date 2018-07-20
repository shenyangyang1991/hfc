import { SESSION_KEY } from '@/constant/global'
import wepy from 'wepy'

const getExpire = () => {
  return (Date.now() + 1800000)
}

const getCookieHeader = (response) => {
  return response.header['set-cookie'] || response.header['Set-Cookie']
}

export const setHeader = (prev) => {
  const next = prev || {}
  next['x-requested-with'] = 'XMLHttpRequest'
  next['content-type'] = 'application/json'
  return next
}

export const getCookie = () => {
  const object = wepy.getStorageSync(SESSION_KEY)
  return object.session.cookie
}

export const setCookieHeader = (prev, cookie) => {
  const next = prev || {}
  next['cookie'] = cookie || ''
  return next
}

export const setSession = (responseWrap) => {
  if (responseWrap.success) {
    const responseData = responseWrap.body
    if (responseData.code === '200') {
      const cookie = getCookieHeader(responseWrap)
      const userinfo = responseData.data
      wepy.setStorageSync(SESSION_KEY, {
        session: {
          cookie, userinfo
        },
        expire: getExpire()
      })
    }
  }
  return responseWrap.success
}

export const updateSession = () => {
  const session = wepy.getStorageSync(SESSION_KEY)
  session.expire = getExpire()
  wepy.setStorageSync(SESSION_KEY, session)
}

export const checkSession = () => {
  const object = wepy.getStorageSync(SESSION_KEY)
  return (object && object.session && object.session.userinfo && object.session.cookie && object.expire > Date.now())
}

export const responseHandler = (response) => {
  let responseWrap = {}
  if (response.statusCode === 200) {
    responseWrap.success = true
    responseWrap.body = response.data
  } else if (response.statusCode === 403) {
    responseWrap.success = false
    responseWrap.body = {
      errCode: '0004',
      errMsg: '我不认识你'
    }
  } else if (response.statusCode === 404) {
    responseWrap.success = false
    responseWrap.body = {
      errCode: '0002',
      errMsg: '您好像迷路了'
    }
  } else if (response.statusCode === 500) {
    responseWrap.success = false
    responseWrap.body = {
      errCode: '0003',
      errMsg: '我已经被玩崩溃了'
    }
  } else if (response.statusCode) {
    responseWrap.success = false
    responseWrap.body = {
      errCode: '0001',
      errMsg: '我脑袋短路了'
    }
  } else {
    responseWrap.success = false
    responseWrap.body = {
      errCode: '0000',
      errMsg: '我们之间的距离有点远'
    }
  }
  responseWrap.header = response.header
  return responseWrap
}