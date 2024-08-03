import React, { useEffect, useState } from 'react';
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
    const [message, setMessage] = useState(null)

    const handleFormSubmision = (e) => {
        e.preventDefault();
        addNote();
    }

    useEffect(()=>{
        const savedNote = localStorage.getItem("note");
        if(savedNote){
            setNote(savedNote);
        }
    },[])

    console.log(url)

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    }

    const addNote = async () => {
        try {
            const response = await axios.post(url+"/api/note/add", data, {
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
                fetchNote()// Convert noteData map to array
                // Log the noteData for debugging
            }
            else {
                setMessage(response.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    };

    const fetchNote = async () =>{
        try {
            const response = await axios.get(url+"/api/note/get", {headers: {
                Authorization: `${token}`
            }})
            if(response.data.success){
                console.log(response.data.userNoteData);
                localStorage.setItem("note", Object.values(response.data.userNoteData))
            }
        } catch (error) {
            console.log(error);
        }
    }

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
                            <p>{message}</p>
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
                    </div>
                    <div className="note_section">
                        <h3>NOTES</h3>
                        {
                            note ? note.map((n) => {
                                return <div key={n.id}>
                                    <div className="header">
                                        <p className="title">{n.title}</p>
                                        <p className="date">{n.date}</p>
                                    </div>
                                    <p className="content">{n.content}</p>
                                </div>
                            }) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Add;
