import React from 'react'
import VideoCard from './VideoCard'

const VideosList = ({ videos }) => {

  return (
    <>
    {videos && videos.map((video) => {
        return <VideoCard video={video} key={video.id}/>
    })}
    </>
  )
}

export default VideosList
