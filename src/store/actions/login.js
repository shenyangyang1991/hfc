import { GLOBAL_LOGIN_STATE, GLOBAL_SIGN_DAY } from '../types/global'
import { createAction } from 'redux-actions'
import Config from '@/config/index'
import request from '@/utils/request'

export const login = createAction(GLOBAL_LOGIN_STATE, async ({ code, nick_name, avatar_url }) => {
  // 登录
  // return state
  let resp = await request({
    url: Config.api.global.login.url,
    method: Config.api.global.login.method,
    data: {
      code,
      nick_name,
      avatar_url
    }
  })
  if (resp.code === 200) {
    return true
  } else {
    return false
  }
})

export const sign = createAction(GLOBAL_SIGN_DAY, async () => {
  // 签到
  // return day
})