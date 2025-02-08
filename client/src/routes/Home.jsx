import React, { useState, useEffect } from 'react'
import VideosFinder from '../apis/api'
import VideosList from '../components/VideosList'

const Home = () => {
  const accessToken = localStorage.getItem('accessToken')
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await VideosFinder.get(`/videos`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })
        setVideos(response.data.data.videos)
      } catch (err) {
        console.log(err)
      }
    }
    fetchVideos()
  }, [accessToken])

  console.log(videos)
  return (
    <div className='flex flex-col items-center'>
    <VideosList videos={videos} />
    </div>
  )
}

export default Home
