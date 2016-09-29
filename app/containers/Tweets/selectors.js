import { createSelector } from 'reselect'

/**
 * Direct selector to the tweets state domain
 */
const selectTweetsDomain = () => state => state.get('tweets')

/**
 * Other specific selectors
 */

/**
 * Default selector used by Tweets
 */

const selectTweets = () => createSelector(
  selectTweetsDomain(),
  (substate) => substate.toJS().list
)

export default selectTweets
export {
  selectTweetsDomain
}
