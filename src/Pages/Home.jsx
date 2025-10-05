import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import axios from 'axios'
import Loading from '../Components/Loading'
import attendenceCalculator from '../utils/main'
import { getSundays } from '../utils/utils'
const Home = () => {
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
    const result = attendenceCalculator(holidaysArray, leavesArray, 28, data.present, data.held, today.getDate(), sundayArray, 7)
    setAttendanceArray(result)
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
  const url = `https://attendance-4dtj.onrender.com/api/attendance?student_id=${redgNo}&password=${password}`


  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const response = await axios.get(url);
      setAttendanceData(response.data);
      setData(prev => ({
        ...prev,
        present: response.data.total_info?.total_attended || '',
        held: response.data.total_info?.total_held || '',
        hours_can_skip: response.data.total_info?.hours_can_skip || '',
        total_percentage: response.data.total_info?.total_percentage || ''
      }));
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
    finally {
      setLoading(false);
    }
  }
 

  useEffect(() => {
    fetchAttendance();
  }, [redgNo, password])




  return (
    <section>

      <Header />
      {
        loading ? (
          <div className='pt-6'>
            <Loading />
          </div>
        ) : (
          <div className='mt-4 flex justify-around'>
            <div className=' bg-blue-300 rounded py-1 font-semibold text-sm px-8'>Hours can skip : {data.hours_can_skip}</div>
            <div className=' bg-blue-300 rounded py-1 font-semibold text-sm px-8'>Total percentage : {data.total_percentage}</div>
          </div>
        )
      }
      <div className='top-0 bottom-0 left-0 right-0 flex justify-center mt-10'>

        <div className='border border-slate-300 rounded w-105'>
          <form className='grid p-5 rounded gap-6' onSubmit={handleSubmit}>

            <div className='grid grid-cols-2 gap-2'>
              <label htmlFor="present" className='font-semibold text-slate-900 text-sm'>
                Number of periods attended
              </label>
              <input
                type='number'
                id='present'
                className='border border-slate-300 rounded px-2 py-1 bg-blue-50 text-sm'
                name='present'
                value={data.present}
                required
                onChange={handleOnChange}
              />
            </div>


            <div className='grid grid-cols-2 gap-2'>
              <label htmlFor="held" className='font-semibold text-slate-900 text-sm'>
                Number of periods held
              </label>
              <input
                type='number'
                id='held'
                className='border border-slate-300 rounded px-2 py-1 bg-blue-50 text-sm'
                name='held'
                value={data.held}
                required
                onChange={handleOnChange}
              />
            </div>


            <div className='grid grid-cols-2 gap-2'>
              <label className='font-semibold text-slate-900 text-sm'>Leave dates</label>
              <button type='button' onClick={() => setShowLeaveCalendar(!showLeaveCalendar)} className='bg-slate-400 cursor-pointer rounded py-1 font-semibold text-sm w-25'>{
                showLeaveCalendar ? "Submit" : "Calender"
              }</button>
              {
                showLeaveCalendar && (

                  <Calendar
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
              <label className='font-semibold text-slate-900 text-sm'>Holiday dates</label>
              <button type='button' onClick={() => setShowHolidayCalendar(!showHolidayCalendar)} className='bg-slate-400 cursor-pointer rounded py-1 font-semibold text-sm w-25'>{
                showHolidayCalendar ? "Submit" : "Calender"
              }</button>
              {
                showHolidayCalendar && (
                  <>
                    <Calendar
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
              <button type='submit' className='cursor-pointer bg-orange-400 rounded py-1 font-semibold text-sm mt-4 hover:bg-orange-500'>
                Submit
              </button>
              <button type='button' onClick={handleReset} className='cursor-pointer bg-orange-400 rounded py-1 font-semibold text-sm mt-4 hover:bg-orange-500'>
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className='mt-10 mb-7'>
        <h1 className='text-center text-2xl font-bold text-slate-600'>Attendance as per data</h1>
      </div>
      <div className='flex flex-col items-center justify-center gap-2'>
        {

          attendanceArray?.map((item, index) => {
            return (
              <div key={index} className={`w-110 lg:w-150  ${item.absent ? "bg-orange-400" : "bg-blue-300"} py-1.5 shadow font-bold flex justify-around text-sm`}>
                <p>{item.day}</p>
                <p>{item.attendence}</p>
                <p>{item.absent ? "Absent" : "Present"}</p>
              </div>
            )
          })
          
        }
      </div>
    </section>
  )
}

export default Home
