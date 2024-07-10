import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import PrivateRoute  from './routes/PrivateRoute';
import  PublicRoute  from './routes/PublicRoute';
import { Login } from '@app/modules/login/Login';
import { Main } from '@app/modules/main/Main';
import { Dashboard } from '@pages/dashboard/Dashboard';
import { PermissionList } from '@pages/permissions/PermissionList';
import { RoleList } from '@pages/roles/RoleList';
import { UserList } from '@pages/users/UserList';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/login" element={<PublicRoute />} >
            <Route path="login" element={<Login />} />
          </Route>
          <Route path="/" element={<PrivateRoute />}> */}
            <Route path="/" element={<Main />}>
            <Route path="login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/permissions" element={<PermissionList />} />
              <Route path="/roles" element={<RoleList />} />
              <Route path="/users" element={<UserList />} />
            </Route>
          {/* </Route> */}

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
