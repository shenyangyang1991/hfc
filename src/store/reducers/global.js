import { handleActions } from 'redux-actions'
import { GLOBAL_LOGIN_STATE, GLOBAL_SIGN_DAY } from '../types/global'

export default handleActions({
  [GLOBAL_LOGIN_STATE] (state, action) {
    console.log(action)
    return {
      ...state,
      loginState: action.payload
    }
  },
  [GLOBAL_SIGN_DAY] (state, action) {
    return {
      ...state,
      signDay: action.payload
    }
  }
}, {
  signDay: 0,
  loginState: false
})