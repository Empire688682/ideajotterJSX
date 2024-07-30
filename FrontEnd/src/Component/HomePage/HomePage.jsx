import React from 'react';
import './HomePage.css';
import noteJoter_Gif from '../Assert/notejot_gif.gif'
import { NavLink } from 'react-router-dom';


const HomePage = () => {
  return (
    <div className="ideasJotter">
        <div className="container">
            <div className="ideasJotter-homepage">
                <h1>Welcome to ideasjoter</h1>
                <h2>Preserve Your Innovative Concepts for Future Exploration</h2>
                <p>Jot down ideas you think is great</p>
                <NavLink to="/add" className='btn'>Add Your Note</NavLink>
            </div> 
            <div className="row">
                <div className="col-2">
                    <img src={noteJoter_Gif} alt="" />
                </div>
                <div className="col-2">
                    <h1>Ideas Rule the World you know</h1>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomePage
