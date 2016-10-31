import { get } from 'axios'
import { put, call, select } from 'redux-saga/effects'
import { takeEvery } from 'redux-saga'
import { load, loaded, loadError } from './actions'
import { NEXT } from './constants'
import { stringify } from 'qs'

// Individual exports for testing
function * getGiphies () {
  yield put(load())
  try {
    const { data } = yield call(get, '/api/giphy?' + stringify({
      q: 'fun',
      limit: 25,
      offset: yield select(state => state.get('giphy').pagination.count + state.get('giphy').pagination.offset)
    }))
    return yield put(loaded(data))
  } catch (e) {
    yield put(loadError(e))
  }
  return
}

function * defaultSaga () {
  yield call(getGiphies)
  yield takeEvery(NEXT, getGiphies)
}

// All sagas to be loaded
export default [
  defaultSaga
]
