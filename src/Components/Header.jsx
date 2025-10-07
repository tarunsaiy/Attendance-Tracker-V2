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
    <section className='flex items-center lg:justify-center lg:gap-2 bg-gradient-to-r px-2 py-3 shadow-md bg-[#181a1b] relative'>
      <div className='w-13 h-13'>
        <img src={logo} alt="logo" />
      </div>
      <div className='flex font-bold text-lg lg:text-2xl gap-1 rounded p-2'>
        <span className='text-orange-500 '>Attendance</span>
        <span className='text-white'>Tracker</span>
      </div>
      {
        (location.pathname != '/') && (

          <button type='button' onClick={handleClick} className='cursor-pointer  bg-orange-500 px-3 font-semibold text-sm rounded py-2 absolute top-5 right-5'>Logout</button>
        )
      }
    </section>
  )
}

export default Header
