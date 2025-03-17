import React, { useState, useEffect } from 'react'
import GamesFinder from '../apis/api'
import GameCard from '../components/GameCard'

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
    <div className='flex flex-col items-center gap-6 pt-8 pb-8'>
    {games.map((game) => {
        return <GameCard game={game}/>
    })}
    </div>
    </>
  )
}

export default Games