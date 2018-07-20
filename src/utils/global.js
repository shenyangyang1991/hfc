import { SESSION_KEY } from '@/constant/global'
import wepy from 'wepy'

export const getUserInfo = () => {
  const object = wepy.getStorageSync(SESSION_KEY)
  return (object ? object.session.userinfo : '')
}

export const timeFormat = (int) => {
  let second = int % 60
  let minute = parseInt(int / 60)
  second = second > 9 ? second : '0' + second
  minute = minute > 9 ? minute : '0' + minute
  return `${minute}:${second}`
}