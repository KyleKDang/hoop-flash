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
            alert('The info entered is not valid. Please try again.')
        }
    }

  return (
    <div className='flex justify-center items-center pt-32'>
        <div className='w-1/4 flex flex-col items-center justify-center outline bg-gray-800 rounded-lg aspect-square'>
            <form className='w-8/12 h-8/12 flex flex-col gap-10' onSubmit={handleLogin}>
                <span className='text-2xl text-white font-archivo text-center'>LOG IN</span>
                <input
                    type='text' 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder='Username' 
                    required
                    className='h-10 text-md px-4'
                />
                <input 
                    type='password' 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder='Password' 
                    required
                    className='h-10 text-md px-4'
                />
                <button className='h-10 font-archivo text-white bg-black rounded-full' type='submit'>
                    Log In
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login
