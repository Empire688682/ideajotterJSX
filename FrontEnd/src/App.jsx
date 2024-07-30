import React from 'react';
import './App.css'
import NavBar from './Component/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';

const App = () => {
  return (
    <div className='app_container'>
      <div className="app">
        <NavBar/>
        <Routes>
          <Route path='/'></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
