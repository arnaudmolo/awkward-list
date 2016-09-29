/*
 *
 * Instagram reducer
 *
 */

import { fromJS } from 'immutable'
import {
  CALL_SUCESS
} from './constants'

const initialState = fromJS({list: []})

function instagramReducer (state = initialState, action) {
  switch (action.type) {
    case CALL_SUCESS:
      return state.set('list', fromJS(action.payload))
    default:
      return state
  }
}

export default instagramReducer
