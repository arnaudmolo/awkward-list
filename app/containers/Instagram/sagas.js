import { get } from 'axios'
import { put, call } from 'redux-saga/effects'
import { CALL_SUCESS } from './constants'

// Individual exports for testing
export function * defaultSaga () {
  try {
    const {data} = yield call(get, '/api/instagram')
    yield put({type: CALL_SUCESS, payload: data.data})
  } catch (e) {
    console.log('API Error')
    console.warn(e)
    throw e
  }
  return
}

// All sagas to be loaded
export default [
  defaultSaga
]
