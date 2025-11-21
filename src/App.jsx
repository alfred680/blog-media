import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Sidebar from './pages/Sidebar'

function App() {
  return (
   <>
    
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/login' element={<Auth/>}/> 
        <Route path='/register' element={<Auth regester />}/>
        <Route path='/sidebar' element={<Sidebar/>} />
      </Routes>
   </>
  )
}

export default App
