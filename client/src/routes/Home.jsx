import React, { useState, useEffect, useContext } from 'react'
import Finder from '../apis/api'
import VideosList from '../components/VideosList'
import { AuthContext } from '../contexts/AuthContext'
import { TeamsContext } from '../contexts/TeamsContext'

const Home = () => {
  const accessToken = localStorage.getItem('accessToken')

  const [videos, setVideos] = useState([])
  const { setUser, setLoggedIn } = useContext(AuthContext)
  const { selectedTeams } = useContext(TeamsContext)

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
    {
      selectedTeams.length === 0 && 
      <h1 className='text-white font-archivo text-2xl pt-8 mb-8'>SELECT A TEAM FROM THE TEAMS PAGE TO VIEW HIGHLIGHTS</h1>
    }
    {selectedTeams.length === 0 && <img src='/screenshots/nba-poster.png' alt='nba poster'/>}
    <VideosList videos={videos} />
    </div>
  )
}

export default Home
