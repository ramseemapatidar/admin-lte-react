import React from 'react'

export const DashboardHook = ({title,children}) => {
  return (
    <>
        <div className="col-md-4">
            <div className="card">
                <div className="card-header">
                    <h3 className="card-title">{title}</h3>
                </div>
                <div className="card-body">
                {children}
                </div>
            </div>
        </div>
    </>
  )
}
