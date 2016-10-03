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
import AllTextContainer from 'containers/AllText'
import Image from 'components/Image'
import Text from 'components/Text'
import Masonry from 'react-masonry-component'

const masonryOptions = {
  transitionDuration: 0
}

const AllImages = AllImagesContainer(({list}) =>
  <Masonry
    className='my-gallery-class'
    elementType='div'
    options={masonryOptions}
    disableImagesLoaded={false}
    updateOnEachImageLoad={false}
  >
    {list.map(element =>
      <Image {...element} key={element.id_str || element.id} />
    )}
  </Masonry>
)

const style = {
  position: 'absolute',
  left: 0,
  top: 0,
  height: '100vh',
  width: '100vw'
}

const AllText = AllTextContainer(({list}) =>
  <div style={style}>
    <Masonry
      className={'my-gallery-class'}
      elementType={'div'}
      options={masonryOptions}
      disableImagesLoaded={false}
      updateOnEachImageLoad={false}
    >
      {list.map(element => <Text {...element} key={element.id_str || element.id} />)}
    </Masonry>
  </div>
)

export default class HomePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render () {
    return (
      <div>
        <AllImages />
        <AllText />
      </div>
    )
  }
}
