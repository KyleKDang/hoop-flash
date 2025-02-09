import React, { useState, createContext } from 'react'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState({ userId: 1, username: 'guest' })

  return (
    <AuthContext.Provider value={{loggedIn, setLoggedIn, user, setUser}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
