/*
 *
 * Tweets reducer
 *
 */

import { fromJS } from 'immutable'
import {
  TWEETS_SUCCESS
} from './constants'

const initialState = fromJS({list: []})

function tweetsReducer (state = initialState, action) {
  switch (action.type) {
    case 'tweet':
      return state.set('list', state.get('list').unshift(action.payload))
    case TWEETS_SUCCESS:
      return state.set('list', fromJS(action.payload.tweets))
    default:
      return state
  }
}

export default tweetsReducer
