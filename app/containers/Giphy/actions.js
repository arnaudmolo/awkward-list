/*
 *
 * Giphy actions
 *
 */

import {
  LOAD,
  LOADED,
  LOAD_ERROR,
  NEXT
} from './constants'

export function load () {
  return {
    type: LOAD
  }
}

export function loaded (giphs) {
  return {
    type: LOADED,
    payload: giphs
  }
}

export function loadError (error) {
  console.log(error)
  return {
    type: LOAD_ERROR,
    payload: error
  }
}

export function next () {
  return {
    type: NEXT
  }
}
