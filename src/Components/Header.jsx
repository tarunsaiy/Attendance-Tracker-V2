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
    <section className='flex items-center justify-center gap-2 bg-gradient-to-r px-2 py-3 shadow-md'>
      <div className='w-13 h-13'>
        <img src={logo} alt="logo" />
      </div>
      <div className='flex font-bold text-2xl gap-1 rounded p-2'>
        <span className='text-orange-500 '>Attendance</span>
        <span className=''>Tracker</span>
      </div>
      {
        (location.pathname != '/') && (

          <button type='button' onClick={handleClick} className='cursor-pointer ml-auto bg-orange-400 px-3 font-semibold text-sm rounded py-1'>Logout</button>
        )
      }
    </section>
  )
}

export default Header
