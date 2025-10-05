import React from 'react'
import logo from '../assets/logo.png'
const Header = () => {
  
  return (
    <section className='flex items-center justify-center gap-2 bg-gradient-to-r px-2 py-3 shadow-md'>
      <div className='w-13 h-13'>
        <img src={logo} alt="logo" />
      </div>
      <div className='flex font-bold text-2xl gap-1 rounded p-2'>
        <span className='text-orange-500 '>Attendance</span>
        <span className=''>Tracker</span>
      </div>
    </section>
  )
}

export default Header
