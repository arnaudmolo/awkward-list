/**
*
* Image
*
*/

import React from 'react'
import Linkify from 'react-linkify'
import styles from './styles.css'
import cx from 'classnames'
import ReactGA from 'react-ga'

const biggy = _ => Math.random() > 0.5
const isTweet = tweet => tweet.id_str

import { withProps } from 'recompose'

const nLog = withProps(props => {
  console.log(props)
  return props
})

const Instagram = ({caption: {text}}) =>
  <div className={cx(styles.text, biggy() ? styles.textMedium : styles.textBig)}>
    <p className={styles.Linkify}><Linkify properties={{target: '_blank'}}>{text}</Linkify></p>
  </div>

const informGA = id => e =>
  ReactGA.event({
    category: 'Social',
    action: 'click-tweet',
    id
  })

const Tweet = ({text, id_str, user}) =>
  <div className={cx(styles.text, biggy() ? styles.textMedium : styles.textBig)} >
    <p className={styles.Linkify}>
      <a className={styles.textLink} target='_blank' href={`https://twitter.com/${user.name}/status/${id_str}`}>
        <Linkify properties={{target: '_blank', onClick: informGA(id_str)}}>{}</Linkify>
      </a>
    </p>
  </div>

export default props => isTweet(props)
  ? <Tweet {...props} />
  : <Instagram {...props} />
