import React, { createContext, useState } from 'react'

export const TeamsContext = createContext()

const TeamsContextProvider = ({ children }) => {
  const [selectedTeams, setSelectedTeams] = useState([])
  const [unselectedTeams, setUnselectedTeams] = useState([])
  
  return (
    <TeamsContext.Provider value={{selectedTeams, setSelectedTeams, unselectedTeams, setUnselectedTeams}}>
      {children}
    </TeamsContext.Provider>
  )
}

export default TeamsContextProvider
