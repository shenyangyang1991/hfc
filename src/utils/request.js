import wepy from 'wepy'

export default async function request(options) {
  if (options.header) {
    options.header['Content-Type'] = 'application/json'
  } else {
    options.header = {
      'Content-Type': 'application/json'
    }
  }

  let err = {}
  let response = {}
  try {
    response = await wepy.request(options)
  } catch (e) {
    err.code = '0000'
    err.message = '网络异常，请检查网络'
  }

  if (response.statusCode === 200) {
    let resp = response.data
    if (resp) {
      let {code, data, message} = resp
      if (code === 200) {
        return resp
      } else if (code === 4003) { // 过期
        err.code = '4003'
        err.message = '我们有段时间没见了，快来一起玩'
      } else {
        err.code = '0001'
        err.message = '发生什么事情了，我脑袋短路了'
      }
    }
  } else if (response.statusCode === 404) {
    err.code = '0002'
    err.message = '您迷路了吗？'
  } else if (response.statusCode === 500) {
    err.code = '0003'
    err.message = '您真会玩，我已经崩溃了'
  } else {
  }

  return err
}