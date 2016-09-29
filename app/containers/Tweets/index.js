/*
 *
 * Tweets
 *
 */

import { connect } from 'react-redux'
import selectTweets from './selectors'
const mapStateToProps = selectTweets()

export default connect(state => ({list: mapStateToProps(state)}))
