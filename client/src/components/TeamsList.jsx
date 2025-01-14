import React from 'react'
import TeamCard from './TeamCard'

const TeamsList = ({ teams, selected }) => {
  return (
    <div className='flex flex-wrap justify-center'>
    {teams.map((team) => {
        return <TeamCard key={team.id} team={team} selected={selected} />
    })}
    </div>
  )
}

export default TeamsList
