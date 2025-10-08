import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import { useLocation, useNavigate } from 'react-router-dom'
import ToastNotification, { showToast } from '../Components/ToastNotification';
import { toast } from 'react-toastify';

const Login = () => {
  const location = useLocation()
  const {error, message} = location.state || {}
  
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
  useEffect(() => {
  if (error) {
    showToast("NetworkError or Invaild Credentials");
  }
}, [error]);
  return (
    <section className='bg-[#1a0f20] text-slate-300 h-screen'>
      <ToastNotification/>
      <Header />
      <div className='top-0 bottom-0 left-0 right-0 flex justify-center items-end h-105'>
        <div className='border border-purple-950 rounded-2xl  w-85'>
          <form action="" className='grid p-5 rounded-2xl gap-4 bg-[#111214]' onSubmit={handleSubmit}>
            <div className='flex justify-center'>
              <p className='font-bold mb-4 text-slate-300'>Login</p>
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="RedgNo" className='font-semibold text-sm'>Registration Number</label>
              <input type='text' id='RedgNo' className='border text-center bg-[#1a0f20] border-purple-900 rounded px-2 py-1 text-sm' onChange={handleOnChange} name="redgNo" value={data.redgNo}/>
            </div>
            <div className='flex flex-col gap-2'>
              <label htmlFor="pass" className='font-semibold t text-sm'>Password</label>
              <input type='text' id='pass' className='border text-center bg-[#1a0f20] border-purple-900 rounded px-2 py-1  text-sm' onChange={handleOnChange} name='password' value={data.password}/>
            </div>
            <button className='bg-purple-950 cursor-pointer rounded py-1.5 font-semibold text-sm mt-4'>Submit</button>
          </form>
        </div>
      </div>
      <div className='font-semibold text-center text-slate-300 mt-10'>Login once, use it forever</div>

    </section>
  )
}

export default Login
