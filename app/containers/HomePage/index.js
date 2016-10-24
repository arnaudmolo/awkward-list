/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react'
import AllImagesContainer from 'containers/AllImages'
import Sound from 'containers/Sound'
import Image from 'components/Image'
// import Text from 'components/Text'
import { compose, withState, branch, withProps } from 'recompose'

const State = compose(
  withState('visible', 'setVisible', 0),
  withProps(props => ({
    next () {
      props.setVisible(state =>
        (state + 1) >= props.list.length ? 0 : (state + 1)
      )
    }
  })))

const AllImages = compose(
  AllImagesContainer,
  branch(props => props.list.length, C => C, C => props => <div>loading</div>),
  State
)(({list, visible, next}) =>
  <div>
    <Sound onSoundLevelChange={next} />
    <Image {...list[visible]} />
  </div>
)

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render () {
    return (
      <div>
        <AllImages />
      </div>
    )
  }
}
