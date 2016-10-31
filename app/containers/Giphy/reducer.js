/*
 *
 * Giphy reducer
 *
 */

import {
  LOADED
} from './constants'

import { uniqBy } from 'lodash'

const initialState = {
  data: [],
  pagination: {
    count: 0,
    offset: 0,
    total_count: 0
  }
}

function giphyReducer (state = initialState, action) {
  switch (action.type) {
    case LOADED:
      return {
        ...action.payload,
        data: uniqBy([...state.data, ...action.payload.data], e => e.id).sort(Math.random)
      }
    default:
      return state
  }
}

export default giphyReducer