import React from 'react'
import logo from '../assets/logo.png'
import { useLocation, useNavigate } from 'react-router-dom'
const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = () => {
    localStorage.clear();
    navigate('/')
  }
  return (
    <section className='flex items-center lg:justify-center lg:gap-2 bg-gradient-to-r px-2 py-3 bg-[#110a15] relative '>
      <div className='w-13 h-13 sm:w-10 sm:h-10'>
        <img src={logo} alt="logo" />
      </div>
      <div className=' flex flex-col sm:flex-row font-bold text-lg lg:text-2xl rounded p-2 '>
        <span className='text-purple-400 '>Attendance</span>
        <span className='text-white'>Tracker</span>
      </div>
      {
        (location.pathname != '/') && (

          <button type='button' onClick={handleClick} className='cursor-pointer  bg-purple-600 px-3 font-semibold text-sm rounded-2xl py-2 absolute top-7 sm:top-4 right-5'>Logout</button>
        )
      }
    </section>
  )
}

export default Header
