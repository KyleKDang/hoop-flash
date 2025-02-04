import React, { useState } from 'react'
import Auth from '../apis/auth'

const Signup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleSignUp = async (e) => {
        await Auth.post('/signup', {
            username,
            password
        })
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
                <button className='font-archivo text-white bg-black ' onClick={handleSignUp}>
                    Sign Up
                </button>
            </form>
        </div>
    </div>
  )
}

export default Signup