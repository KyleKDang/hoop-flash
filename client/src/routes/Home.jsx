import React, { useState, useEffect, useContext } from 'react'
import Finder from '../apis/api'
import VideosList from '../components/VideosList'
import { AuthContext } from '../contexts/AuthContext'

const Home = () => {
  const accessToken = localStorage.getItem('accessToken')

  const [videos, setVideos] = useState([])
  const { user, setUser, setLoggedIn } = useContext(AuthContext)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await Finder.get(`/user`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        })

        const user = response.data.data.user

        if (user.userId !== 1) {
            setLoggedIn(true)
            setUser(user)
        }

      } catch (err) {
          console.log(err)
      }
    }

      fetchUser()
  }, [accessToken, setLoggedIn, setUser])

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await Finder.get(`/videos`, {
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

  return (
    <div className='flex flex-col items-center'>
    <h1 className='text-white'><em>{`Logged in as ${user.username}`}</em></h1>
    <VideosList videos={videos} />
    </div>
  )
}

export default Home
