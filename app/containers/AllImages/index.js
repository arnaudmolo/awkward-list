/*
 *
 * AllImages
 *
 */

import { connect } from 'react-redux'
import selectTweets from 'containers/Tweets/selectors'
import selectInstagram from 'containers/Instagram/selectors'
import { createSelector } from 'reselect'

const tweetsToImages = tweets => {
  return tweets.filter(tweet => tweet.extended_entities)
    .reduce((previous, current) =>
      [...previous, ...current.extended_entities.media]
    , [])
}

const mapStateToProps = createSelector(
  selectTweets(),
  selectInstagram(),
  (tweets, instas) =>
    [...instas, ...tweetsToImages(tweets)].sort(Math.random)
)

export default connect(state => ({list: mapStateToProps(state)}))
