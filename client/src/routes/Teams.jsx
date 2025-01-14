import React, { useEffect, useContext } from 'react'
import TeamsFinder from '../apis/api'
import TeamsList from '../components/TeamsList'
import { TeamsContext } from '../contexts/TeamsContext'

const Teams = () => {
  const { selectedTeams, setSelectedTeams, unselectedTeams, setUnselectedTeams } = useContext(TeamsContext)

  useEffect(() => {
    const fetchTeams = async () => {
        try {
            const response = await TeamsFinder.get('/teams')
            setSelectedTeams(response.data.data.selectedTeams)
            setUnselectedTeams(response.data.data.unselectedTeams)
        } catch (err) {
            console.log(err)
        }
    }
    fetchTeams()
  })

  return (
    <>
    <TeamsList teams={selectedTeams} selected={true} />
    <TeamsList teams={unselectedTeams} selected={false} />
    </>
  )
}

export default Teams
