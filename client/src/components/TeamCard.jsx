import React from 'react'
import teamLogos from '../images/team-logos.js'

const TeamCard = ({ team, selected }) => {
  
  return (
    <div className='flex flex-col items-center'>
        <img 
        src={`/team-logos/${teamLogos[team.id - 1]}`} 
        alt={`${team.full_name} logo`}
        className='w-80'
        />
        <span>{team.full_name}</span>
    </div>
  )
}

export default TeamCard
