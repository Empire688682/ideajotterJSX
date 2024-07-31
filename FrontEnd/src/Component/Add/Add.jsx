import React from 'react';
import './Add.css';
import { useGlobalContex } from '../Context';
import { FaHeart } from "react-icons/fa";

const Add = () => {
    const {user} = useGlobalContex();
    return (
        <div>
            <div className="add-header">
                <div className="container">
                    <h2> Add your great idea @ <h1>{user} <FaHeart style={{color:"red", minWidth:"40px"}}/></h1></h2>
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
