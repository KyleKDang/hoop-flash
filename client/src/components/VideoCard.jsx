import React from 'react'

const VideoCard = ({ video }) => {

  return (
    <div className='w-10/12 lg:w-5/12 flex flex-col justify-center items-center my-4 lg:my-8 bg-gray-800 p-4 lg:p-8 rounded-lg outline gap-3'>
        <div className='font-archivo text-white my-2 lg:my-4 max-w-96 text-sm lg:text-lg text-center'>{video.title}</div>
        <iframe src={`https://www.youtube.com/embed/${video.video_id}?si=lJ3L2zcSp0wNlaVq`} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className='aspect-video w-full h-full outline bg-black'></iframe>
    </div>
  )
}

export default VideoCard
