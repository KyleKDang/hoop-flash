import React from 'react'
import teamLogos from '../images/team-logos.js'
import TeamSelector from '../apis/api'

const TeamCard = ({ team, selected }) => {

  const handleSelectTeam = async (teamId) => {
    console.log(teamId)
    await TeamSelector.post('/teams', {
        team_id: teamId
    })
  }

  const handleUnselectTeam = async (teamId) => {
    console.log(teamId)
    await TeamSelector.delete(`/teams/${teamId}`)
  }

  return (
    <div className='flex flex-col items-center'>
        <img 
            src={`/team-logos/${teamLogos[team.id - 1]}`} 
            alt={`${team.full_name} logo`}
            className='w-80'
        />
        <span>{team.full_name}</span>
        <button 
            onClick={() => selected ? handleUnselectTeam(team.id) : handleSelectTeam(team.id)} 
            className='button'>{selected ? 'Unselect' : 'Select'}
        </button>
    </div>
  )
}

export default TeamCard
