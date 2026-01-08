import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Sidebar from './pages/Sidebar'
import Homepage from './pages/Homepage'
import Profile from './pages/Profile'
import Premiem from './pages/Premiem'
import Topauthor from './pages/Topauthor'
import Adminpage from './Adminpage'
import Topauhoroption from './pages/Topauhoroption'
import Premiemform from './Premiemform'
import PageNotFound from './pages/PageNotFound'
import Paymentsucess from './pages/Paymentsucess'
import Paymentfail from './pages/Paymentfail'
import Inbox from './pages/Inbox'
import FogetPassword from './pages/FogetPassword'
import ResetPassword from './pages/ResetPassword'

function App() {
  return (
    <>

      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth regester />} />
        <Route path='/sidebar' element={<Sidebar />} />
        <Route path='/home' element={<Homepage />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/premiem' element={<Premiem />} />
        <Route path='/topauthor' element={<Topauthor />} />
        <Route path='/admin' element={<Adminpage />} />
        <Route path='/optionauthor' element={<Topauhoroption />} />
        <Route path='/Premiemform' element={<Premiemform />} />
        <Route path='/paymentsucess' element={<Paymentsucess/>} />
        <Route path='/paymentfail' element={<Paymentfail/>} />
       <Route path='/inbox/:blogId' element={<Inbox/>} />
        <Route path='/inbox' element={<Inbox/>} />
        <Route  path='/forgetpassword' element={<FogetPassword/>}   />
        <Route path='/resetpassword' element={<ResetPassword/>} />
        

        <Route path='*' element={<PageNotFound />}/>
      </Routes>
    </>
  )
}

export default App
