import { useState,useEffect } from 'react';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import  PrivateRoute  from './routes/PrivateRoute';
import  PublicRoute  from './routes/PublicRoute';
import { Login } from '@app/modules/login/Login';
import { Main } from '@app/modules/main/Main';
import { Dashboard } from '@pages/dashboard/Dashboard';
import { PermissionList } from '@pages/permissions/PermissionList';
import { RoleList } from '@pages/roles/RoleList';
import { UserList } from '@pages/users/UserList';
import { useDispatch } from 'react-redux';
import { checkSession } from './service/authuser';
import { Profile } from '@pages/profile/Profile';
function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const dispatch = useDispatch();
  
  

  useEffect(() => {
    checkSession(dispatch,setIsAppLoading);

  }, []);
  if (isAppLoading) {
    return <p>Loading</p>;
  }
  return (
    <>
      <BrowserRouter>
        <Routes>
           <Route path="/login" element={<PublicRoute />} >
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/" element={<PrivateRoute />}> 
            <Route path="/" element={<Main />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/permissions" element={<PermissionList />} />
              <Route path="/roles" element={<RoleList />} />
              <Route path="/users" element={<UserList />} />
            </Route>
          </Route> 

        </Routes>
      </BrowserRouter>
      <ToastContainer
        autoClose={3000}
        draggable={false}
        position="top-right"
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnHover
      />
    </>
  )
}

export default App
