import React, { useRef, useState } from 'react'

import { DashboardHook } from '../../../components/DashboardHook'

export const RefHook = () => {
    const timerRef = useRef(null)
    const [count, setCount] = useState(0);

    const startTimer =() =>{
        timerRef.current = setInterval(()=>{
            setCount((prevCount) => prevCount+1)
        },1000)
    }

    const stopTimer = () => {
        clearInterval(timerRef.current)
    }

  return (
    <DashboardHook title='useRef'>
        <b>The useRef Hook allows you to persist values between renders.It can be used to store a mutable value that does not cause a re-render when updated.It can be used to access a DOM element directly.</b>
        <p>Count { count }</p>
        <button className="btn btn-primary" onClick={startTimer}>Start Timer</button>
        <button className="btn btn-danger" onClick={stopTimer}>Stop Timer</button>

    </DashboardHook>
  )
}
