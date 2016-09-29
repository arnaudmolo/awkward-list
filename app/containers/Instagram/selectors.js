import { createSelector } from 'reselect'

/**
 * Direct selector to the instagram state domain
 */
const selectInstagramDomain = () => state => state.get('instagram')

/**
 * Other specific selectors
 */

/**
 * Default selector used by Instagram
 */

const selectInstagram = () => createSelector(
  selectInstagramDomain(),
  (substate) => substate.toJS().list
)

export default selectInstagram
export {
  selectInstagramDomain
}
