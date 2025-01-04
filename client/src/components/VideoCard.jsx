import React from 'react'

const VideoCard = ({ video }) => {

    console.log(video.videoid)
  return (
    <div>
      <p>{video.title}</p>
      <p>{video.description}</p>
      <iframe width="560" height="315" src={`https://www.youtube.com/embed/${video.video_id}?si=lJ3L2zcSp0wNlaVq`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <p>{video.publish_date}</p>
    </div>
  )
}

export default VideoCard
