import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { GoogleOAuthProvider } from '@react-oauth/google'
import ContextShare from './context/ContextShare.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId='115378667466-5joo4107s28e3j1nl62hho7kic4n5ute.apps.googleusercontent.com'>
        <ContextShare>
          <App />
        </ContextShare>

      </GoogleOAuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
