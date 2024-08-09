import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import { Login } from '@app/modules/login/Login';
import { Main } from '@app/modules/main/Main';
import { Dashboard } from '@pages/dashboard/Dashboard';
import { PermissionList } from '@pages/permissions/PermissionList';
import { RoleList } from '@pages/roles/RoleList';
import { UserList } from '@pages/users/UserList';
import { useDispatch, useSelector } from 'react-redux';
import { checkSession, checkTokenExpiration } from '@store/reducers/auth';
import { Profile } from '@pages/profile/Profile';

function App() {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const dispatch = useDispatch();
  // For token expiration check page refresh then logout
  // useEffect(() => {
  //   dispatch(checkTokenExpiration()); // Token expiration check
  //   dispatch(checkSession()).then(() => {
  //     setIsAppLoading(false);
  //   }).catch(() => {
  //     setIsAppLoading(false);
  //   });
  // }, [dispatch]);
  // auto logout when token expire
  useEffect(() => {
    const checkExpirationInterval = setInterval(() => {
      dispatch(checkTokenExpiration());
      console.log(1)
    }, 10000); // Check every 10 seconds

    dispatch(checkSession()).then(() => {
      setIsAppLoading(false);
    }).catch(() => {
      setIsAppLoading(false);
    });

    return () => clearInterval(checkExpirationInterval); // Clear interval on component unmount
  }, [dispatch]);

  if (isAppLoading) {
    return <p>Loading</p>;
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<PublicRoute />}>
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
  );
}

export default App;
