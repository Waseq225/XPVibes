import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon'
import axios from "axios"
import { Route, Routes } from 'react-router-dom'
import { Navbar } from './components/Nav/Navbar.jsx'
import { PrivateRoute } from './components/PrivateRoute/PrivateRoute.jsx'
import { AddEvent } from './pages/AddEvent.jsx'
import { Cart } from './pages/Cart.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import { ProfilePage } from './pages/ProfilePage.jsx'
import { RegisterPage } from './pages/RegisterPage.jsx'
import { SnackbarContextProvider } from './snackbarContext.jsx'
import { UserContextProvider } from './userContext.jsx'

axios.defaults.baseURL = "http://localhost:4000"
axios.defaults.withCredentials = true


function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterLuxon}>
      <SnackbarContextProvider>
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

            </Routes>
          </>
        </UserContextProvider>
      </SnackbarContextProvider>

    </LocalizationProvider>
  )

}
export default App

