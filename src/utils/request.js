import wepy from 'wepy'
import { setHeader, getCookie, responseHandler, setSession, checkSession, updateSession, setCookieHeader } from './request-tools'

export const getSessionByRemote = async (options) => {
  const response = await request(options)
  const responseWrap = responseHandler(response)
  return setSession(responseWrap)
}

export const http = async (options) => {
  const wrap = {}
  if (!checkSession()) {
    wrap.status = '0004'
  } else {
    updateSession()
    options.header = setCookieHeader(options.header, getCookie())
    const response = await request(options)
    const responseWrap = responseHandler(response)
    if (responseWrap.success) {
      wrap.status = responseWrap.body.code
      wrap.data = responseWrap.body.data
    } else {
      wrap.status = responseWrap.body.errCode
    }
  }
  return wrap
}

const request = async (options) => {
  options.header = setHeader(options.header)
  let response = {}
  try {
    response = await wepy.request(options)
  } catch (e) {
  }
  return response
}