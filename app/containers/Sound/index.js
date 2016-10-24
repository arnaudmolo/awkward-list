/*
 *
 * Sound
 *
 */

import React from 'react'
import { connect } from 'react-redux'
import selectSound from './selectors'
import { FormattedMessage } from 'react-intl'
import messages from './messages'

export class Sound extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render () {
    return (
      <div>
        <FormattedMessage {...messages.header} />
      </div>
    )
  }
}

const mapStateToProps = selectSound()

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Sound)
