import React, { useState, useEffect } from 'react'
import VideosFinder from '../apis/VideosFinder'
import VideosList from '../components/VideosList'

const Home = () => {
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const videos = await VideosFinder.get('/videos')
        setVideos(videos)
      } catch (err) {
        console.log(err)
      }
    }

    fetchVideos()
  }, [])

  console.log(videos)
  return (
    <>
    <h1>Home</h1>
    <VideosList videos={videos.data} />
    </>
  )
}

export default Home
