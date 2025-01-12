import React from 'react'

const VideoCard = ({ video }) => {

    console.log(video.videoid)
  return (
    <div>
      <p>{video.title}</p>
      <iframe width="560" height="315" src={`https://www.youtube.com/embed/${video.video_id}?si=lJ3L2zcSp0wNlaVq`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    </div>
  )
}

export default VideoCard
