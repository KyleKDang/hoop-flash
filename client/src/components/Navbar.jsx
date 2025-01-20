import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='fixed top-0 w-full h-14 flex items-center justify-between text-white bg-black'>
      <ul className='flex items-center'>
        <li><Link to='/'><img src='/hoopflash/hoopflash-logo-black.png' alt='hoopflash logo' className='h-12'/></Link></li>
        <li><img src='/hoopflash/lightning-bolt.png' className='h-7'/></li>
      </ul>
      <ul className='flex'>
        <li><Link to='/teams' className='font-archivo pr-14'>TEAMS</Link></li>
      </ul>
    </nav>
  )
}


export default Navbar
