/*
 *
 * Sound
 *
 */

import React from 'react'
import { throttle } from 'lodash'
import autoCorrelate from './autoCorrelate'
import { createAudioMeter } from './volumeMetter'

const errorCallback = e => console.log(e)
const audioContext = new window.AudioContext()
const buflen = 1024
let buf = new Float32Array(buflen)
const noteStrings = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

const gotStream = props => stream => {
  const mediaStreamSource = audioContext.createMediaStreamSource(stream)
  // Connect it to the destination.
  const analyser = audioContext.createAnalyser()
  analyser.fftSize = 2048

  const meter = createAudioMeter(audioContext, 0.1)
  mediaStreamSource.connect(meter)

  mediaStreamSource.connect(analyser)
  window.requestAnimationFrame(updatePitch(analyser, meter, props))
}

const noteFromPitch = fq =>
  Math.round(12 * (Math.log(fq / 440) / Math.log(2))) + 69

let prev
function updatePitch (analyser, meter, props) {
  analyser.getFloatTimeDomainData(buf)
  const ac = autoCorrelate(buf, audioContext.sampleRate)
  if (ac !== -1) {
    if (ac < 200) {
      console.log(ac)
      props.onSoundLevelChange('heyyyy')
    }
    const note = noteFromPitch(ac)
    const noteString = noteStrings[note % 12]
    if (prev !== noteString) {
      props.onPitchChange(noteString)
      prev = noteString
    }
  }
  window.requestAnimationFrame(() => updatePitch(analyser, meter, props))
}

import { compose, withState, withProps } from 'recompose'

const styles = {
  position: 'absolute',
  left: 0,
  top: 0,
  width: '100vw',
  height: '100vh',
  fontSize: '50em',
  filter: 'hue-rotate(180deg) invert()',
  mixBlendMode: 'exclusion'
}

class Sound extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount () {
    // Not showing vendor prefixes.
    navigator.getUserMedia({
      'audio': {
        'mandatory': {
          'googEchoCancellation': 'false',
          'googAutoGainControl': 'false',
          'googNoiseSuppression': 'false',
          'googHighpassFilter': 'false'
        },
        'optional': []
      }
    }, gotStream(this.props), errorCallback)
  }
  render (props = this.props) {
    return <div style={styles}>{props.note}</div>
  }
}

export default compose(
  withState('note', 'setNote', '...'),
  withProps(props => ({
    onPitchChange: note => props.setNote(state => note),
    onSoundLevelChange: throttle(props.onSoundLevelChange, 50)
  }))
)(Sound)
