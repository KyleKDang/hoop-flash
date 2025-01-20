import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='h-14 flex items-center justify-between text-white bg-black'>
        <Link to='/'><img src='/hoopflash/hoopflash-logo-black.png' alt='hoopflash logo' className='h-12'/></Link> 
        <ul className='flex'>
            <Link to='/teams' className='font-archivo pr-14'>TEAMS</Link>
        </ul>
    </nav>
  )
}


export default Navbar
