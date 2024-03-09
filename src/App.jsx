import { BrowserRouter,Routes,Route } from 'react-router-dom';
import { Main } from './modules/main/Main';
import { Dashboard } from './pages/dashboard/Dashboard';
import { PermissionList } from './pages/permissions/PermissionList';
import { RoleList } from './pages/roles/RoleList';
import { UserList } from './pages/users/UserList';



function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main /> }>
          <Route path="/" element={<Dashboard />} />
          <Route path="/permissions" element={<PermissionList />} />
          <Route path="/roles" element={<RoleList />} />
          <Route path="/users" element={<UserList />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  )
}

export default App
