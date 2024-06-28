import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage.jsx'
import { Cart } from './pages/Cart.jsx'
import { Nav } from './components/Nav/Nav.jsx'
import { RegisterPage } from './pages/RegisterPage.jsx'
import { LoginPage } from './pages/LoginPage.jsx'
import axios from "axios"

axios.defaults.baseURL = "http://localhost:4000"

function App() {


  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
      </Routes>
    </>

  )

  // url: / -> Header, Body (HomePage)
  // url: /login -> Header, LoginPage 
  // url: /register ->  Header, RegisterPage
}
export default App

