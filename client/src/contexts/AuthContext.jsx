import React, { useState, createContext, useEffect } from 'react'
import UserFinder from '../apis/api'

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const accessToken = localStorage.getItem('accessToken')
    
    const [loggedIn, setLoggedIn] = useState(false)
    const [user, setUser] = useState({ userId: 1, username: 'guest' })

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await UserFinder.get(`/user`, {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`
                    }
                })

                const user = response.data.data.user

                if (user) {
                    setLoggedIn(true)
                    setUser(user)
                }

            } catch (err) {
                console.log(err)
            }
        }

        fetchUser()
    }, [])

  return (
    <AuthContext.Provider value={{loggedIn, setLoggedIn, user, setUser}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContextProvider
