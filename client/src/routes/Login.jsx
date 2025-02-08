import React, { useState } from 'react'
import Auth from '../apis/auth'

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (e) => {
        try {
            const response = await Auth.post('/login', {
                username,
                password
            })
    
            const accessToken = response.data.data.accessToken
            localStorage.setItem('accessToken', accessToken)
        } catch (err) {
            console.log(err)
        }
    }

  return (
    <div className='flex justify-center items-center pt-32'>
        <div className='w-1/4 flex flex-col items-center justify-center outline bg-gray-800 rounded-lg aspect-square'>
            <form className='flex flex-col jus'>
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
                <button className='font-archivo text-white bg-black ' onClick={handleLogin}>
                    Login
                </button>
            </form>
        </div>
    </div>
  )
}

export default Login
