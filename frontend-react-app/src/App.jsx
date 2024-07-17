import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage.jsx'
import { Cart } from './pages/Cart.jsx'
import { Navbar } from './components/Nav/Navbar.jsx'
import { RegisterPage } from './pages/RegisterPage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import axios from "axios"
import { UserContextProvider } from './userContext.jsx'
import { ProfilePage } from './pages/ProfilePage.jsx'
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import { AddEvent } from './pages/AddEvent.jsx'
import { EventGrid } from './components/EventGrid/EventGrid.jsx'
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute.jsx'

axios.defaults.baseURL = "http://localhost:4000"
axios.defaults.withCredentials = true


function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <UserContextProvider>
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route element={<PrivateRoute />} >
              <Route path='/profile' element={<ProfilePage />} />
              <Route path="/cart" element={<Cart />} />
            </Route>

            <Route path='/addevent' element={<AddEvent />} /> {/* Change this route */}
            <Route path='/getevent' element={<EventGrid />} />  {/* Change this route */}

          </Routes>
        </>
      </UserContextProvider>
    </LocalizationProvider>
  )

}
export default App

