/*
 *
 * AllImages
 *
 */

import { connect } from 'react-redux'
import selectTweets from 'containers/Tweets/selectors'
import selectInstagram from 'containers/Instagram/selectors'
import { createSelector } from 'reselect'

const mapStateToProps = createSelector(
  selectTweets(),
  selectInstagram(),
  (tweets, instas) =>
    [...tweets].sort(Math.random)
)

export default connect(state => ({list: mapStateToProps(state)}))
