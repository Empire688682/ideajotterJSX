import React, { useState } from 'react';
import './Navbar.css';
import { AiOutlineMenuFold } from "react-icons/ai";
import { RxCross1 } from "react-icons/rx";
import { NavLink } from 'react-router-dom';
import logo_Icon from '../Assert/notejot_logo.png';


const NavBar = () => {
    const [showMenu, setShowMenu] = useState(false);
    console.log(showMenu)
    
    return (
        <div className="header">
            <div className="navbar-container">
                <div className="navbar">
                    <div className="logo logo-container">
                        <NavLink to="/" >
                            <img src={logo_Icon} alt="" />
                        </NavLink>
                    </div>
                    <nav>
                        <ul className={showMenu? "show-mobile-menu":""}>
                            <div>
                                <li><NavLink className="menu_link" to="/">Home</NavLink></li>
                                <li><NavLink className="menu_link" to="/about">About</NavLink></li>
                                <li><NavLink className="menu_link" to="/contact">Contact</NavLink></li>
                            </div>
                        </ul>
                    </nav>

                    <div className="menu" onClick={()=> setShowMenu(!showMenu)}>
                        {
                            showMenu? <RxCross1 className='menus_icon' />:<AiOutlineMenuFold className='menus_icon' />
                        }
                    </div>

                </div>
            </div>
        </div>
    )
}

export default NavBar
