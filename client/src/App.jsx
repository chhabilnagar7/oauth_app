import React from 'react'
import Home from './Pages/Home'
import Signup from './Pages/Signup'
import Login from './Pages/Login'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/home' element={<Home/>}/>
        </Routes>
      </BrowserRouter>
      
      
    </div>
  )
}

export default App
