import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Landing from './pages/Landing'
import Auth from './pages/Auth'

function App() {
  return (
   <>
    
      <Routes>
        <Route path='/' element={<Landing/>} />
        <Route path='/login' element={<Auth/>}/> 
      </Routes>
   </>
  )
}

export default App
