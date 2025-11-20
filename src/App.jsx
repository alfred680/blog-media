import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Landing from './pages/Landing'

function App() {
  return (
   <>
    
      <Routes>
        <Route path='/' element={<Landing/>} />
      </Routes>
   </>
  )
}

export default App
