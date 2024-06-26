import React, {useState} from 'react'
import { DashboardHook } from '../../../components/DashboardHook';
export const StateHook = () => {
    const [count,setCount] = useState(0);

    const myButtonClick = () => {
        setCount(count+1)
    }
  return (
    // <div className="col-md-4">
    //         <div className="card">
    //             <div className="card-header">
    //             <h3 className="card-title">useState</h3>
    //             </div>
    //             <div className="card-body">
    //                 <b>useState is a hook that allows using state variables in React components</b>
    //                 <p>You are click {count}</p>
    //                 <button className="btn btn-primary" onClick={()=>setCount(count+1)}>Click</button>
    //             </div>
    //         </div>
    //     </div>
    <DashboardHook title="useState">
        <b>useState is a hook that allows using state variables in React components</b>
        <p>You are click {count}</p>
        <button className="btn btn-primary" onClick={()=>setCount(count+1)}>Click</button>
    </DashboardHook>
        
  )
}
