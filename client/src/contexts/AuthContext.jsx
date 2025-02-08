import React, { useState, createContext } from 'react'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false)

  return (
    <AuthContext.Provider value={{loggedIn, setLoggedIn}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
