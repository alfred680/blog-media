import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Sidebar from './pages/Sidebar'
import Homepage from './pages/Homepage'
import Profile from './pages/Profile'

function App() {
  return (
   <>
    
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/login' element={<Auth/>}/> 
        <Route path='/register' element={<Auth regester />}/>
        <Route path='/sidebar' element={<Sidebar/>} />
        <Route path='/home' element={<Homepage/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>
   </>
  )
}

export default App
