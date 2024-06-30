import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage.jsx'
import { Cart } from './pages/Cart.jsx'
import { Nav } from './components/Nav/Nav.jsx'
import { RegisterPage } from './pages/RegisterPage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import axios from "axios"
import { UserContextProvider } from './userContext.jsx'
import { ProfilePage } from './pages/ProfilePage.jsx'
import { LogoutPage } from './pages/LogoutPage.jsx'

axios.defaults.baseURL = "http://localhost:4000"
axios.defaults.withCredentials = true



function App() {
  return (
    <UserContextProvider>
      <>
        <Nav />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/logout' element={<LogoutPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>
      </>
    </UserContextProvider>
  )

  // url: / -> Header, Body (HomePage)
  // url: /login -> Header, LoginPage 
  // url: /register ->  Header, RegisterPage
}
export default App

