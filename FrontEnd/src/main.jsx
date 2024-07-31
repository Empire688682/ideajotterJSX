import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import JoterProvider from './Component/Context.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <JoterProvider>
        <App />
      </JoterProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
