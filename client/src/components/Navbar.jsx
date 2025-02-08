import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
  const { loggedIn } = useContext(AuthContext)

  return (
    <nav className='fixed top-0 w-full h-14 flex items-center justify-between text-white bg-black'>
      <ul className='flex items-center lg:gap-4'>
        <li className='flex items-center mr-2 lg:mr-8'>
          <Link to='/'><img src='/hoopflash/hoopflash-logo-black.png' alt='hoopflash logo' className='h-12'/></Link>
          <img src='/hoopflash/lightning-bolt.png' alt='lightning bolt'className='h-7'/>
        </li>
        <li><Link to='/teams' className='font-archivo mr-4 lg:mr-14 hover:text-neutral-300'>TEAMS</Link></li>
      </ul>
      <ul className='flex mr-2 lg:mr-4 gap-2 lg:gap-8'>
        {!loggedIn && <li><Link to='/login' className='font-archivo hover:text-neutral-300'>LOGIN</Link></li>}
        {!loggedIn && <li><Link to='/signup' className='font-archivo hover:text-neutral-300'>SIGNUP</Link></li>}
        {loggedIn && <li><Link to='/' className='font-archivo hover:text-neutral-300'>LOGOUT</Link></li>}
      </ul>
    </nav>
  )
}


export default Navbar
