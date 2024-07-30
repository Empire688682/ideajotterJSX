import React from 'react';
import './About.css';
import notejot_Logo from '../Assert/notejot_logo.png';

const About = () => {
  return (
    <div className='about'>
      <div className="container">
            <h1>About</h1>
            <div className="row">
                <div className="col-2">
                    <p>Introducing IdeaJotter, my brainchild crafted with a passion for web development using HTML, CSS, JavaScript, and PHP. This platform is designed to be your effortless companion for capturing notes and exploring imaginative ideas.
                        Beyond being a mere web application, IdeaJotter mirrors my dedication to providing an uncomplicated and user-friendly haven for your thoughts. The seamless integration of HTML, CSS, JavaScript, and PHP guarantees a smooth and responsive experience, allowing you to capture ideas on the go.
                        Envision a polished interface and dynamic functionality – that's the essence of IdeaJotter. It's not about complex features; it's about enhancing your creative process. Whether you're a spontaneous idea generator or someone who craves meticulous organization, this platform celebrates the fusion of technology and creativity.</p>
                </div>
                <div className="col-2">
                    <img src={notejot_Logo} alt="IMG" />
                </div>
            </div>
        </div>
    </div>
  )
}

export default About
