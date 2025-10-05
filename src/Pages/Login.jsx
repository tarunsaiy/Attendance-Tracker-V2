import React, { useState } from 'react'
import Header from '../Components/Header'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    redgNo : localStorage.getItem("redgNo") || "",
    password : localStorage.getItem("password") || ""
  })
  const handleOnChange = (e) => {
    const {name, value} = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name] : value,
      }
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    const redgNo = data.redgNo
    const password = data.password
    localStorage.setItem("redgNo", redgNo)
    localStorage.setItem("password", password)
    if (redgNo && password) {
      navigate("/home");
    }
    setData({
      redgNo : "",
      password : ""
    })
  }
  return (
    <section>
      <Header />
      <div className='top-0 bottom-0 left-0 right-0 flex justify-center items-end h-105'>
        <div className='border border-slate-300 rounded w-85'>
          <form action="" className='grid p-5 rounded gap-4' onSubmit={handleSubmit}>
            <div className='flex justify-center'>
              <p className='font-bold mb-4'>Login</p>
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="RedgNo" className='font-semibold text-slate-900 text-sm'>Registration Number</label>
              <input type='text' id='RedgNo' className='border border-slate-300 rounded px-2 py-1 bg-blue-50 text-sm' onChange={handleOnChange} name="redgNo" value={data.redgNo}/>
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="pass" className='font-semibold text-slate-900 text-sm'>Password</label>
              <input type='text' id='pass' className='border border-slate-300 rounded px-2 py-1 bg-blue-50 text-sm' onChange={handleOnChange} name='password' value={data.password}/>
            </div>
            <button className='bg-orange-400 rounded py-1 font-semibold text-sm mt-4'>Submit</button>
          </form>
        </div>
      </div>
      <div className='font-semibold text-center text-slate-900 mt-10'>Login once, use it forever</div>

    </section>
  )
}

export default Login
