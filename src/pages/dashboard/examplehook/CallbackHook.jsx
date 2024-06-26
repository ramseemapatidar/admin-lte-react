import React, { useCallback, useState } from 'react'
import { DashboardHook } from '../../../components/DashboardHook'

const ChildComponent = 
React.memo(({ onClick}) =>{
    return <button className="btn btn-primary" onClick={onClick}>Click</button>
});

export const CallbackHook = () => {
    const [count,setCount] = useState(0);
    const handleClick = useCallback(()=>{
        setCount(count+1);
    },[count])
  return (
    <DashboardHook title="useCallback">
        <b>The React useCallback Hook returns a memoized callback function.</b>
        <p>Count {count}</p>
        <ChildComponent onClick={handleClick}>click</ChildComponent>
    </DashboardHook>
  )
}
