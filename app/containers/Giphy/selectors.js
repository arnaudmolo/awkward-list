import { createSelector } from 'reselect'

/**
 * Direct selector to the giphy state domain
 */
const selectGiphyDomain = () => state => state.get('giphy')

/**
 * Other specific selectors
 */

/**
 * Default selector used by Giphy
 */

const selectGiphy = () => createSelector(
  selectGiphyDomain(),
  (substate) => substate
)

export default selectGiphy
export {
  selectGiphyDomain
}
