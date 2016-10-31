/**
*
* Image
*
*/

import React from 'react'

const isTweet = tweet => {
  return tweet.id_str
}

const Instagram = props => props.type === 'video'
  ? <InstagramVideo {...props} />
  : <InstagramImage {...props} />

const InstagramImage = ({images}) =>
  <img
    width={images.low_resolution.width * 2}
    height={images.low_resolution.height * 2}
    src={images.standard_resolution.url} />

const InstagramVideo = ({videos}) =>
  <video controls autoPlay loop muted
    width={videos.standard_resolution.width}
    height={videos.standard_resolution.height}
    src={videos.standard_resolution.url}
  />

const TweetImage = ({sizes, media_url_https}) =>
  <img height={sizes.large.h * 2}
    width={sizes.large.w * 2}
    src={media_url_https} />

const TweetVideo = ({video_info}) =>
  <video controls autoPlay loop muted>
    {video_info.variants.map(variant =>
      <source src={variant.url} type={variant.content_type} key={`${variant.content_type}-${variant.bitrate}`} />
    )}
  </video>

const Tweet = props => props.type === 'video'
  ? <TweetVideo {...props} />
  : <TweetImage {...props} />

export default props => isTweet(props)
  ? <Tweet {...props} />
  : <Instagram {...props} />
