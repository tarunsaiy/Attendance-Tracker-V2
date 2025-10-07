import React from 'react'
import { Link } from 'react-router-dom'
const FooterComponent = () => {
  return (
    <section className='bg-[#181a1b] border-t mt-17  border-slate-700  text-slate-500 pt-5 pb-1  '>
      <div className="flex flex-col items-center justify-center gap-4">
        {/* <div className="flex items-center gap-2">
          <p>All Study Materials</p>
          <Link to="https://btechvault.vercel.app">click</Link>
        </div> */}
        <Link to='https://github.com/tarunsaiy' className='text-xs font-semibold'>github</Link>
        <p className='text-xs font-bold'>#Salaar #Shouryanga</p>
      </div>
    </section>
  )
}

export default FooterComponent
