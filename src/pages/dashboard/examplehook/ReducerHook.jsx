import React, {useReducer} from 'react'
import { DashboardHook } from '../../../components/DashboardHook'

export const ReducerHook = () => {

  const initialState = { count : 0 }

  const upDown = (state,action) =>{
    switch(action.type){
      case 'increment':
      return {count : state.count+1 }
      case 'decrement':
      return { count : state.count-1 }
      default:
      throw new Error('error');
    }
  }
  const [state,dispatch] = useReducer(upDown,initialState)

  

  return (
    <DashboardHook title="useReducer">
      <b>useReducer hook is used to manage complex state logic</b>
      <p>You are click {state.count}</p>

      <div className="row">
        <div className="col-md-6">
          <button className="btn btn-primary" onClick={()=> dispatch({type : 'increment'})}>Increment</button>
        </div>
        <div className="col-md-6">
          <button className="btn btn-danger" onClick={()=> dispatch({type : 'decrement'})}>Decriment</button>
        </div>
      </div>
    </DashboardHook>
  )
}
