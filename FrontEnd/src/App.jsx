import React from 'react';
import './App.css'
import NavBar from './Component/NavBar/NavBar';
import { Route, Routes } from 'react-router-dom';
import Footer from './Component/Footer/Footer';
import About from './Component/About/About';
import HomePage from './Component/HomePage/HomePage';
import Contact from './Component/Contact/Contact';
import Add from './Component/Add/Add';

const App = () => {
  return (
    <div className='app_container'>
      <div className="app">
        <NavBar/>
        <Routes>
          <Route path='/' element={<HomePage/>}></Route>
          <Route path='/about' element={<About/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/add' element={<Add/>}></Route>
        </Routes>
        <Footer/>
      </div>
    </div>
  )
}

export default App
