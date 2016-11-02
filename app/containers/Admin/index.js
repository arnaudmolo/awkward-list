/*
 *
 * Admin
 *
 */

import React from 'react'
import { connect } from 'react-redux'
import selectAdmin from './selectors'
import styles from './styles.css'

const refresh = () => {}

export class Admin extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render () {
    return (
      <div className={styles.admin}>
        <form action='/api/giphy' method='post'>
          <input name='tag' type='text' />
        </form>
        <button onClick={refresh}>Refresh</button>
      </div>
    )
  }
}

const mapStateToProps = selectAdmin()

function mapDispatchToProps (dispatch) {
  return {
    dispatch
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin)
