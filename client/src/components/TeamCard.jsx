import React from 'react'
import teamLogos from '../images/team-logos.js'
import TeamSelector from '../apis/api'
import { IoMdCheckmark } from "react-icons/io"

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
    <div className='lg:w-1/3 p-8'>
      <div className='flex flex-col items-center outline bg-gray-800 rounded-lg aspect-square'>
        <div className='p-10'>
          <img 
                src={`/team-logos/${teamLogos[team.id - 1]}`} 
                alt={`${team.full_name} logo`}
                className='object-fill'
            />
        </div>
        <div className='flex flex-col gap-8 pb-4 items-center'>
          <span className='text-white font-archivo text-2xl'>{team.full_name}</span>
          <button 
              onClick={() => selected ? handleUnselectTeam(team.id) : handleSelectTeam(team.id)} 
              className='w-72 button text-white font-archivo bg-black p-2 rounded-full hover:outline active:bg-neutral-700 active:outline group'>
              <div className='flex justify-center items-center gap-2'>
                <span className='group-active:hidden group-hover:hidden'>{selected ? 'Selected' : 'Select'}</span>
                <span className='hidden group-active:block group-hover:block'>{selected ? 'Unselect' : 'Select'}</span>
                {selected && <IoMdCheckmark className='group-hover:hidden group-active:hidden'/>}
              </div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default TeamCard
