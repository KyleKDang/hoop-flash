import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='fixed top-0 w-full h-14 flex items-center justify-between text-white bg-black'>
      <ul className='flex items-center gap-4'>
        <li className='flex items-center pr-8'>
          <Link to='/'><img src='/hoopflash/hoopflash-logo-black.png' alt='hoopflash logo' className='h-12'/></Link>
          <img src='/hoopflash/lightning-bolt.png' alt='lightning bolt'className='h-7'/>
        </li>
        <li><Link to='/teams' className='font-archivo pr-14 hover:text-neutral-300'>TEAMS</Link></li>
      </ul>
      <ul className='flex pr-4 gap-8'>
        <li><Link to='/login' className='font-archivo hover:text-neutral-300'>LOGIN</Link></li>
        <li><Link to='/signup' className='font-archivo hover:text-neutral-300'>SIGNUP</Link></li>
      </ul>
    </nav>
  )
}


export default Navbar
