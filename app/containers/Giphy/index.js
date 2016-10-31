/*
 *
 * Giphy
 *
 */

import React from 'react'
import { connect } from 'react-redux'
import selectGiphy from './selectors'
import { next } from './actions'

export class Giphy extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render () {
    return (
      <div />
    )
  }
}

const giphySelector = selectGiphy()

const mapStateToProps = (state, props) => {
  const list = giphySelector(state, props)
  return {
    list: list.data
  }
}

const mapDispatchToProps = (dispatch, ownProps) => ({
  add: (e) => dispatch(next())
})

export default connect(mapStateToProps, mapDispatchToProps)
