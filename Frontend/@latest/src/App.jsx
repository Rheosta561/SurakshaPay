import React from 'react'
import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Start from './Screens/Start'
import Login from './Screens/Login'
import SignUp from './Screens/Signup'

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Start/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/signup" element={<SignUp/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App