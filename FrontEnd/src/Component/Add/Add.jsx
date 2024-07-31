import React from 'react';
import './Add.css';

const Add = () => {
    return (
        <div>
            <div className="add-header">
                <div className="container">
                    <h1> Add your great idea @ User <i className='fa fa-heart'></i></h1>
                </div>
            </div>
            <div className="add-section">
                <div className="container">
                    <div className="add-container">
                        <form>
                            <h2 className="heading">That your awsome note</h2>
                            <div>
                                <label htmlFor="title">Title</label>
                                <input type="text" id="title" required />
                            </div>
                            <div>
                                <label htmlFor="details">Details</label>
                                <textarea id="details" cols="30" rows="5" required></textarea>
                            </div>
                            <button type="submit" className="submit-btn" >Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Add
