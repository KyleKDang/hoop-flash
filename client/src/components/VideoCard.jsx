import React from 'react'

const VideoCard = ({ video }) => {
  return (
    <div>
      <p>{video.title}</p>
      <p>{video.description}</p>
      <p>{video.thumbnail}</p>
      <p>{video.channel}</p>
      <p>{video.publishDate}</p>
    </div>
  )
}

export default VideoCard
