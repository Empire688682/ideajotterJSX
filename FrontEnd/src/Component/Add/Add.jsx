import React, { useState } from 'react';
import './Add.css';
import { useGlobalContex } from '../Context';
import { FaHeart } from "react-icons/fa";
import axios from 'axios';

const Add = () => {
    const { user, token, url } = useGlobalContex();
    const [note, setNote] = useState([]);
    const [data, setData] = useState({
        title: "",
        content: ""
    });

    const testing = (e) =>{
        note.map((note)=> note.i === e);
        console.log(e)
    }
    testing()

    const handleFormSubmision = (e) => {
        e.preventDefault();
        addNote();
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    }

    const addNote = async () => {
        try {
            const response = await axios.post(url + "/api/note/add", data, {
                headers: {
                    Authorization: `${token}`
                }
            });

            if (response.data.success) {
                setData({
                    title: "",
                    content: ""
                });

                // Update the note state with the new notes
                setNote(Object.values(response.data.noteData)); // Convert noteData map to array
                console.log(response.data.noteData); // Log the noteData for debugging
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <div className="add-header">
                <div className="container">
                    <h1> Add your great idea @ <p className='user'> {user} <FaHeart style={{ color: "red", minWidth: "40px" }} /></p></h1>
                </div>
            </div>
            <div className="add-section">
                <div className="container">
                    <div className="add-container">
                        <form onSubmit={handleFormSubmision}>
                            <h2 className="heading">That your awesome note</h2>
                            <div>
                                <label htmlFor="title">Title</label>
                                <input onChange={handleOnChange} type="text" value={data.title} name='title' required />
                            </div>
                            <div>
                                <label htmlFor="details">Details</label>
                                <textarea onChange={handleOnChange} cols="30" value={data.content} name='content' rows="5" required></textarea>
                            </div>
                            <button type="submit" className="submit-btn">Submit</button>
                        </form>
                        <div>
                <h2>Notes</h2>
                {note.map((n) => (
                    <div key={n.id}>
                        <h3>{n.title}</h3>
                        <p>{n.content}</p>
                        <small>{n.date}</small> {/* Display the date if available */}
                    </div>
                ))}
            </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Add;
