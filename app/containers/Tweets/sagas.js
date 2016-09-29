import { get } from 'axios'
import { put, call } from 'redux-saga/effects'
import { TWEETS_SUCCESS } from './constants'

// Individual exports for testing
export function * defaultSaga () {
  try {
    const {data} = yield call(get, '/api/tweets')
    if (typeof data === 'string') {
      throw new Error('API Not installed')
    }
    yield put({type: TWEETS_SUCCESS, payload: {tweets: data}})
  } catch (e) {
    console.log(e)
    throw e
  }
  return
}

function * streamSaga () {

}

// All sagas to be loaded
export default [
  defaultSaga,
  streamSaga
]
