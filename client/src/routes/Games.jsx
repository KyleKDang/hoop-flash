import React, { useState, useEffect } from 'react'
import GamesFinder from '../apis/api'

const Games = () => {
  const [games, setGames] = useState([])

  useEffect(() => {
    const fetchGames = async () => {
        try {
            const response = await GamesFinder.get(`/games`)
            setGames(response.data.data.games)
        } catch (err) {
            console.log(err)
        }
    }
    fetchGames()
  })

  return (
    <>
    <h1 className='place-self-center text-white text-4xl mt-20 mb-12'>Today's Games</h1>
    <div className='flex flex-col items-center'>
    {games.map((game) => {
        return <div className='text-white'>{game.home_team.full_name} vs {game.visitor_team.full_name}</div> 
    })}
    </div>
    </>
  )
}

export default Games