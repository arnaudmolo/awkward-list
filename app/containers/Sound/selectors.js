import { createSelector } from 'reselect'

/**
 * Direct selector to the sound state domain
 */
const selectSoundDomain = () => state => state.get('sound')

/**
 * Other specific selectors
 */

/**
 * Default selector used by Sound
 */

const selectSound = () => createSelector(
  selectSoundDomain(),
  (substate) => substate.toJS()
)

export default selectSound
export {
  selectSoundDomain
}
