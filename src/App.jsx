import { BrowserRouter, Route, Routes } from 'react-router'
import Register from './components/auth/register/Register'
import Login from './components/auth/login/Login'
import Home from './components/dashboard/home/Home'
import NotFound from './components/notFound/NotFound'
import ProtectedRoutes from './routes/ProtectedRoutes'
import User from '@components/dashboard/user/User'

import Loan from '@components/dashboard/loan/Loan'
import Material from '@components/dashboard/material/Material'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<NotFound />} />
        {/* rutas protegidas */}
        <Route element={<ProtectedRoutes />}>
          <Route path='/home' element={<Home />} />
          <Route path='/users' element={<User />} />
          <Route path='/materials' element={<Material />} />
          <Route path='/loans' element={<Loan />} />

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
