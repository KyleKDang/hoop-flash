import React from 'react'
import VideoCard from './VideoCard'

const VideosList = ({ videos }) => {
    console.log(videos)

  return (
    <>
    {videos && videos.map((video) => {
        return <VideoCard video={video} />
    })}
    </>
  )
}

export default VideosList
