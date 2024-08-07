import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PublicRoute = () => {
    const isLoggedIn = useSelector((state) => state.auth.authentication);
    console.log('PublicRoute');

    return isLoggedIn ? <Navigate to="/" /> : <Outlet />;
  
}

export default PublicRoute;

