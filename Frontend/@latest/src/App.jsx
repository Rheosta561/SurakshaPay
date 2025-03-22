import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Start from './Screens/Start'
import Login from './Screens/Login'
import SignUp from './SignUp'
import Home from './Screens/Home'
import Navbar from './Navbar'
import Payment from './Screens/Payment'
import Transaction from './Screens/Transaction'
import Dashboard from './Dashboard'
import About from "./Screens/About"
import Chatbot from './Screens/Chatbot'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Start/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />
      <Route path="/about" element={<About/>} />
      
    </Routes>
    <Navbar/>
    <Routes>
 
    <Route path ="/home" element={<Home/>} />
    <Route path ="/payment" element={<Payment/>} />
    <Route path = '/transaction' element={<Transaction/>} />
    <Route path = '/track' element={<Dashboard/> } />
    <Route path = '/chatbot' element={<Chatbot/>} />

    </Routes>
    </BrowserRouter>
  )
}

export default App