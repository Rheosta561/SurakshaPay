import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Start from './Screens/Start'
import Login from './Screens/Login'
import SignUp from './SignUp'
import Home from './Screens/Home'
import Navbar from './Navbar'
import Payment from './Screens/Payment'
import Transaction from './Screens/Transaction'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Start/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />
      
    </Routes>
    <Navbar/>
    <Routes>
 
    <Route path ="/home" element={<Home/>} />
    <Route path ="/payment" element={<Payment/>} />
    <Route path = '/transaction' element={<Transaction/>} />

    </Routes>
    </BrowserRouter>
  )
}

export default App