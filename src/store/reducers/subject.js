import { handleActions } from 'redux-actions'
import { HOT_SUBJECT_LIST, FOLLOW_SUBJECT_LIST } from '../types/subject'

export default handleActions({
  [HOT_SUBJECT_LIST] (state, action) {
    return {
      ...state,
      hotList: action.payload.list
    }
  },
  [FOLLOW_SUBJECT_LIST] (state, action) {
    return {
      ...state,
      followList: action.payload.list
    }
  }
}, {
  hotList: [],
  followList: []
})