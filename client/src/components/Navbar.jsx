import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import Auth from '../apis/auth'
import Cookies from 'js-cookie'

const Navbar = () => {
  const { loggedIn, setLoggedIn, setUser } = useContext(AuthContext)

  const handleLogout = async () => {
    try {
      setLoggedIn(false)
      setUser({ userId: 1, username: 'guest' })

      localStorage.clear()
      const refreshToken = Cookies.get('refreshToken')
      await Auth.delete(`/logout/${refreshToken}`)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <nav className='fixed top-0 w-full h-14 flex items-center justify-between text-white bg-black text-sm md:text-lg lg:text-md'>
      <ul className='flex items-center md:gap-4 lg:gap-4'>
        <li className='flex items-center mr-2 md:mr-4 lg:mr-8'>
          <Link to='/'><img src='/hoopflash/hoopflash-logo-black.png' alt='hoopflash logo' className='h-8 md:h-12 lg:h-12'/></Link>
          <img src='/hoopflash/lightning-bolt.png' alt='lightning bolt'className='h-5 md:h-7 lg:h-7'/>
        </li>
        <li><Link to='/teams' className='font-archivo mr-4 md:mr-4 lg:mr-8 hover:text-neutral-300'>TEAMS</Link></li>
        <li><Link to='/games' className='font-archivo mr-4 md:mr-4 lg:mr-8 hover:text-neutral-300'>GAMES</Link></li>
      </ul>
      <ul className='flex mr-2 md:mr-4 lg:mr-4 gap-4 md:gap-8 lg:gap-8'>
        {!loggedIn && <li><Link to='/login' className='font-archivo hover:text-neutral-300'>LOGIN</Link></li>}
        {!loggedIn && <li><Link to='/signup' className='font-archivo hover:text-neutral-300'>SIGNUP</Link></li>}
        {loggedIn && <li><Link to='/' className='font-archivo hover:text-neutral-300' onClick={handleLogout}>LOGOUT</Link></li>}
      </ul>
    </nav>
  )
}


export default Navbar
