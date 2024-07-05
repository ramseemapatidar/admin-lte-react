import React from 'react'
import { StateHook } from './examplehook/StateHook'
import { SideEffectHook } from './examplehook/SideEffectHook'
import { ReducerHook } from './examplehook/ReducerHook'
import { CallbackHook } from './examplehook/CallbackHook'
import { RefHook } from './examplehook/RefHook'
import { Todo } from './todo/Todo'
export const Dashboard = () => {
  return (
    <>
    <div className="row">
      <Todo/>
      <StateHook/>
      <SideEffectHook/>
      <ReducerHook/>
      <CallbackHook/>
      <RefHook/>
    </div>
    

    </>
  )
}
