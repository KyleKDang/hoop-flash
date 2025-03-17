import React from 'react'
import teamLogosAlpha from '../images/team-logos-alpha.js'

const GameCard = ({ game }) => {
  const dateTime = new Date(game.datetime)
  const formattedDateTime = dateTime.toLocaleString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/Los_Angeles'
  }).replace(' at', ',')

  return (
    <>
    <div className='flex justify-between items-center pt-4 pb-4 pl-20 pr-20 bg-zinc-800 text-white'>
        <div className='text-2xl text-center text-nowrap pr-20'>{formattedDateTime}</div> 
        <img 
            src={`/team-logos/${teamLogosAlpha[game.visitor_team.id - 1]}`} 
            alt={`${game.visitor_team.full_name} logo`}
            className='w-1/6 pr-10'
        />
        <div className='grid grid-cols-[2fr_1fr_2fr] gap-x-2 w-2/3 items-center text-white text-wrap font-archivo'>
            <div className='text-3xl text-center'>{game.visitor_team.full_name}</div>
            <div className='text-2xl text-center'>at</div> 
            <div className='text-3xl text-center'>{game.home_team.full_name}</div>
        </div>
        <img 
            src={`/team-logos/${teamLogosAlpha[game.home_team.id - 1]}`} 
            alt={`${game.home_team.full_name} logo`}
            className='w-1/6 pl-10'
        />
    </div>
    </>
  )
}

export default GameCard
