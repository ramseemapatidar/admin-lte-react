import React,{useState, useEffect} from 'react'
import { DashboardHook } from '../../../components/DashboardHook';

export const SideEffectHook = () => {
    const [count,setCount] = useState(0);
    
    // useEffect(()=>{
    //    // your side effect code here
    //    return () =>{
    //     //cleanup code here (optional)
    //    }
    // },[dependencies])
    useEffect(()=>{
        const timer = setInterval( () =>{

            setCount(preCount =>preCount+1)
        },1000)

        return () => clearInterval(timer);
    },[])
    return (
        <DashboardHook title="useeffect">
            <b>useEffect hook is used to perform side effects (such as data fetching, subscriptions, manual DOM updates)</b>
            <p>You are click {count}</p>
        </DashboardHook>
        
    )
}
