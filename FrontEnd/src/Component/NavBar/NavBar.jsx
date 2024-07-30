import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  return (
    <div className="header">
        <div className="navbar-container">
            <div className="navbar">
                <div className="logo logo-container">
                    <NavLink to="/" href="index.html">
                        <img src="" alt="" />
                    </NavLink>
                </div>
                <nav>
                    <ul id="menuBox">
                        <div>
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/about">About</NavLink></li>
                            <li><NavLink to="/contact">Contact</NavLink></li>
                        </div>
                    </ul>
                </nav>
               
                <div className="menu menu-close">
                    <img src="" alt=""  />
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default NavBar
