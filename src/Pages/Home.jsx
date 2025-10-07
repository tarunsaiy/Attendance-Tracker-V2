import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import axios from 'axios'
import ToastNotification from '../Components/ToastNotification';
import { showToast } from '../Components/ToastNotification';
import Loading from '../Components/Loading'
import attendenceCalculator from '../utils/main'
import { attendencePerform, getSundays } from '../utils/utils'
import { useNavigate } from 'react-router-dom'
import getAttendanceCounts from '../utils/helper'
import FooterComponent from '../Components/FooterComponent'
import getAttendanceTotals from '../utils/getAttendanceTotals'
import attendanceTarget from '../utils/AttendanceTarget'
const Home = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    present: '',
    held: '',
    leaves: [],
    holidays: [],
    hours_can_skip: "",
    total_percentage: ""
  })

  const [loading, setLoading] = useState(false)
  const [attendanceData, setAttendanceData] = useState()
  const [showLeaveCalendar, setShowLeaveCalendar] = useState(false)
  const [showHolidayCalendar, setShowHolidayCalendar] = useState(false)
  var leavesArray = [];
  var holidaysArray = [];
  const [attendanceArray, setAttendanceArray] = useState([]);
  const [cnt, setCnt] = useState(0)
  const [skip, setSkip] = useState(null)
  const today = new Date();
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 1);
  const sundays = getSundays(today);
  const sundayArray = sundays.map(sun => sun.getDate());

  const handleOnChange = (e) => {
    const { name, value } = e.target
    setData(prev => ({
      ...prev,
      [name]: value
    }))
  }


  const handleLeaveDayClick = (date) => {
    setData(prev => {
      const exists = prev.leaves.some(d => d.toDateString() === date.toDateString())
      return {
        ...prev,
        leaves: exists
          ? prev.leaves.filter(d => d.toDateString() !== date.toDateString()) // remove if clicked again
          : [...prev.leaves, date] // add new date
      }
    })
  }

  const handleHolidayDayClick = (date) => {
    setData(prev => {
      const exists = prev.holidays.some(d => d.toDateString() === date.toDateString())
      return {
        ...prev,
        holidays: exists
          ? prev.holidays.filter(d => d.toDateString() !== date.toDateString())
          : [...prev.holidays, date]
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    leavesArray = data.leaves.map(d => d.getDate());
    holidaysArray = data.holidays.map(d => d.getDate());
    const result = attendenceCalculator(holidaysArray, leavesArray, 28, data.present - cnt, data.held - cnt, today.getDate(), sundayArray, 7)
    setAttendanceArray(result)
    console.log(cnt)
  }
  const handleReset = () => {
    setData(prev => ({
      ...prev,
      leaves: [],
      holidays: []
    }));
    setAttendanceArray([])
  }

  const redgNo = localStorage.getItem("redgNo");
  const password = localStorage.getItem("password");
  const url1 = `https://attendance-4dtj.onrender.com/api/attendance?student_id=${redgNo}&password=${password}`
  const url2 = `https://vignanattendancescraping.onrender.com/attendance?regno=${redgNo}&password=${password}`

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url2);      
      const totals = getAttendanceTotals(response.data)
      setData(prev => ({
        ...prev,
        present: totals.attended || '',
        held: totals.held || '',
        total_percentage: attendencePerform(totals.attended, totals.held) || ''
      }));
      const temp = attendanceTarget(totals.attended, totals.held);
      setSkip(temp);      
    } catch (error) {
      navigate('/', {
        state: {
          error: true,
        }
      })
    }
    finally {
      setLoading(false);
    }
  }
  const fetchPosted = async() => {
    try {
      const response = await axios.get(url1);
      const result = getAttendanceCounts(response.data)
      setCnt(result.totalClasses);
      console.log(result.totalClasses)
    }
    catch (error) {
      showToast(error.message)
    }
  }

  useEffect(() => {
    fetchAttendance();
    fetchPosted();
  }, [redgNo, password])




  return (

    <section className='bg-[#0f1720] text-slate-200 min-h-screen'>
      <ToastNotification />
      <Header />
      {
        loading ? (
          <div className='pt-6'>
            <Loading />
          </div>
        ) : (
          <div className='mt-4 mx-1 flex items-center justify-around'>
            <div className=' bg-green-400 text-green-900 h-13 min-h-13 max-h-13  rounded py-1  font-bold text-sm '>
              
              {
                data.total_percentage >= 75 ? (
                  <div className='flex flex-col items-center justify-center px-4 w-45'>
                    <div>Periods can skip</div>
                    <div>{skip?.canDecrease}</div>
                  </div>) : (
                  <div className='flex flex-col items-center justify-center px-4 w-45'>
                    <div>Periods to attend</div>
                    <div>{skip?.neededToReach}</div>
                  </div>
                )
              }
            </div>
            <div className=' bg-blue-700 h-13 min-h-13 max-h-13 rounded py-1 font-semibold text-sm w-45 rounded  font-semibold text-sm flex flex-col items-center justify-center px-4'>
              <div>Present attendance</div>
              <div>{data.total_percentage}</div>
            </div>
          </div>
        )
      }
      <div className='top-0 bottom-0 left-0 right-0 flex justify-center mt-10'>

        <div className='border border-slate-800 rounded w-105'>
          <form className='grid p-5 rounded gap-6 bg-[#111214]' onSubmit={handleSubmit}>
            <div className='font-semibold text-2xl text-blue-300'>Hi, {localStorage.getItem("redgNo")}</div>
            <div className='grid grid-cols-2 gap-2'>
              <label htmlFor="present" className='font-semibold  text-sm'>
                Number of periods attended
              </label>
              <input
                type='number'
                id='present'
                
                className='border bg-gray-800 border-blue-300 rounded px-2 py-1  text-sm text-center'
                name='present'
                value={data.present}
                readOnly
                required
                onChange={handleOnChange}
              />
            </div>


            <div className='grid grid-cols-2 gap-2'>
              <label htmlFor="held" className='font-semibold  text-sm'>
                Number of periods held
              </label>
              <input
                type='number'
                id='held'
                readOnly
                className='border bg-gray-800 border-blue-300 text-center rounded px-2 py-1  text-sm'
                name='held'
                value={data.held}
                required
                onChange={handleOnChange}
              />
            </div>


            <div className='grid grid-cols-2 gap-2'>
              <label className='font-semibold text-sm'>Leave dates</label>
              <button type='button' onClick={() => setShowLeaveCalendar(!showLeaveCalendar)} className='border bg-gray-800 border-gray-50 cursor-pointer rounded py-1 font-semibold text-sm w-25'>{
                showLeaveCalendar ? "Submit" : "Calender"
              }</button>
              {
                showLeaveCalendar && (

                  <Calendar
                  className={'text-black'}
                    onClickDay={handleLeaveDayClick}
                    value={null}
                    tileClassName={({ date }) =>
                      data.leaves.some(d => d.toDateString() === date.toDateString())
                        ? 'bg-red-500 text-white rounded-full'
                        : ''
                    }
                    minDate={today}
                    maxDate={maxDate}
                  />
                )
              }
            </div>


            <div className='grid grid-cols-2 gap-2'>
              <label className='font-semibold text-sm'>Holiday dates</label>
              <button type='button' onClick={() => setShowHolidayCalendar(!showHolidayCalendar)} className='border bg-gray-800 border-gray-50 cursor-pointer rounded py-1 font-semibold text-sm w-25'>{
                showHolidayCalendar ? "Submit" : "Calender"
              }</button>
              {
                showHolidayCalendar && (
                  <>
                    <Calendar
                      className={'text-black'}
                      onClickDay={handleHolidayDayClick}
                      value={null}
                      tileClassName={({ date }) =>
                        data.holidays.some(d => d.toDateString() === date.toDateString())
                          ? 'bg-green-500 text-white rounded-full'
                          : ''
                      }
                      minDate={today}
                      maxDate={maxDate}
                    />

                  </>
                )
              }

            </div>

            <div className='grid grid-cols-2 gap-3'>
              <button type='submit' className='cursor-pointer bg-orange-500 text-slate-900 rounded py-2 font-semibold text-sm mt-4 hover:bg-orange-500'>
                Submit
              </button>
              <button type='button' onClick={handleReset} className='cursor-pointer bg-orange-500 text-slate-900 rounded py-2 font-semibold text-sm mt-4 hover:bg-orange-500'>
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='mt-10 mb-7'>
        <h1 className='text-center text-2xl font-bold text-slate-400'>Attendance as per data</h1>
      </div>
      <div className='flex flex-col items-center justify-center gap-2'>
        {

          attendanceArray?.map((item, index) => {
            return (
              <div key={index} className={`w-110 lg:w-150  ${item.absent ? "" : "bg-[rgba(10, 44, 17, 0.517)]"} ${item.absent ? "text-red-200" : "text-green-200"}  ${item.absent ? "border border-red-600" : "border border-green-400"} py-1.5 shadow font-bold flex justify-around text-sm`}>
                <p>{item.day} th</p>
                <p>{item.attendence}</p>
                <p>{item.absent ? "Absent" : "Present"}</p>
              </div>
            )
          })

        }
      </div>
      <FooterComponent/>
    </section>

  )
}

export default Home
