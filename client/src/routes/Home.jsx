import React, { useState, useEffect, useContext } from 'react'
import VideosFinder from '../apis/api'
import VideosList from '../components/VideosList'
import { AuthContext } from '../contexts/AuthContext'

const Home = () => {
  const { userId } = useContext(AuthContext)
  const [videos, setVideos] = useState([])

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await VideosFinder.get(`/videos/${userId}`)
        setVideos(response.data.data.videos)
      } catch (err) {
        console.log(err)
      }
    }
    fetchVideos()
  }, [])

  console.log(videos)
  return (
    <div className='flex flex-col items-center'>
    <VideosList videos={videos} />
    </div>
  )
}

export default Home
