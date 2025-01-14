import React, { useState, useEffect } from 'react'
import VideosFinder from '../apis/VideosFinder'
import VideosList from '../components/VideosList'

const Home = () => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await VideosFinder.get('/videos')
        setVideos(response.data.data.videos)
      } catch (err) {
        console.log(err)
      }
    }

    fetchVideos()
  }, [])

  console.log(videos)
  return (
    <>
    <VideosList videos={videos} />
    </>
  )
}

export default Home
