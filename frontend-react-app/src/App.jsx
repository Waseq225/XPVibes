import { Route, Routes } from 'react-router-dom'
import { HomePage } from './pages/HomePage.jsx'
import { Cart } from './pages/Cart.jsx'
import { Nav } from './components/Nav/Nav.jsx'
// import LoginPage from './pages/LoginPage.jsx'
// import Layout from './pages/Layout.jsx'
// import RegisterPage from './pages/RegisterPage.jsx'

function App() {


  return (
    <>
      <Nav />
      <Routes>
        {/* <Route path="/" element={<Layout />} /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<Cart />} />
        {/* <Route path='/login' element={<LoginPage />} />
    <Route path='/register' element={<RegisterPage />} /> */}
      </Routes>
    </>

  )

  // url: / -> Header, Body (HomePage)
  // url: /login -> Header, LoginPage 
  // url: /register ->  Header, RegisterPage
}
export default App

