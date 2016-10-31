/**
*
* Image
*
*/

import React from 'react'
import { compose } from 'recompose'

const isMounted = callback => e => e && callback(e)

class Gif extends React.PureComponent {
  render (props = this.props) {
    return (
      <div style={{display: props.selected ? 'block' : 'none'}}>
        <video muted
          ref={isMounted(e => {
            if (props.selected) {
              e.play()
            } else {
              e.pause()
              e.load()
            }
          })}
          style={{width: '100vw', height: '100vh'}}
          src={props.images.looping.mp4}
        />
      </div>
    )
  }
}

export default compose()(Gif)
