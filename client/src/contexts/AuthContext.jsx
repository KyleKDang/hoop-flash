import React, { useState, createContext } from 'react'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [userId, setUserId] = useState(1)
    const [username, setUsername] = useState('')

  return (
    <AuthContext.Provider value={{loggedIn, setLoggedIn, userId, setUserId, username, setUsername}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
