import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className='flex items-center justify-between text-black'>
        <Link to='/'>HoopFlash</Link> 
        <ul className='flex'>
            <Link to='/teams'>Teams</Link>
        </ul>
    </nav>
  )
}


export default Navbar
