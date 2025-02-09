import React, { useState } from 'react'
import Auth from '../apis/auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()

        try {
            const response = await Auth.post('/login', {
                username,
                password
            })
             console.log('successfully logged in')
    
            const accessToken = response.data.data.accessToken
            localStorage.setItem('accessToken', accessToken)

            navigate('/')
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <div className='flex justify-center items-center pt-32'>
        <div className='w-1/4 flex flex-col items-center justify-center outline bg-gray-800 rounded-lg aspect-square'>
            <form className='flex flex-col jus' onSubmit={handleLogin}>
                <input
                    type='text' 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder='Username' 
                    required
                />
                <input 
                    type='password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder='Password' 
                    required
                />
                <button className='font-archivo text-white bg-black ' type='submit'>
                    Login
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login
