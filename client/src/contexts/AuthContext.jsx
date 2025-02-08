import React, { useState, createContext } from 'react'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [userId, setUserId] = useState(1)

  return (
    <AuthContext.Provider value={{loggedIn, setLoggedIn, userId, setUserId}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
