import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const isLoggedIn = useSelector((state) => state.auth.authentication);
    console.log('ram');
    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
  
}

export default PrivateRoute;