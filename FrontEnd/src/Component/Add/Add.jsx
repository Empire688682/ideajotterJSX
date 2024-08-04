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
    const [message, setMessage] = useState(null);
    const [netError, setNetError] = useState(null)

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

                const fetchedNote = Object.values(response.data.noteData);
                setNote(fetchedNote);
                setMessage("Note added successfully");
                setTimeout(()=>{
                    setMessage(null)
                },2000);
            }
            else {
                setMessage(response.data.message)
            }
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(()=>{
        const fetchNote = async () =>{
            try {
                const response = await axios.get(url+"/api/note/get", {headers: {
                    Authorization: `${token}`
                }})
                if(response.data.success){
                    const fetchedNote = Object.values(response.data.userNoteData)
                    setNote(fetchedNote);
                }
                else{
                    setMessage(response.data.message)
                }
                setNetError(null)
            } catch (error) {
                console.log(error);
                setNetError(error.message)
            }
        }
        fetchNote()
    },[token,url]);

    const deleteNote = async (noteId) => {
        try {
            const response = await axios.post(url + "/api/note/del", { noteId }, {
                headers: {
                    Authorization: `${token}`
                }
            });
    
            if (response.data.success) {
                const updatedNote = Object.values(response.data.noteData);
                setNote(updatedNote);
                console.log("Note deleted successfully");
            } else {
                setMessage(response.data.message);
            }
        } catch (error) {
            console.log("Error deleting note:", error);
            setMessage("Error deleting note. Please try again later.");
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
                                <br/>
                                <p>{message}</p>
                            </div>
                            <button type="submit" className="submit-btn">Submit</button>
                        </form>
                    </div>
                    <div className="note_section">
                        <h2>USER NOTES</h2>
                        {
                            netError? <h3 style={{color:"red"}}>!{netError} try to login again or refresh the page</h3>:null
                        }
                        {
                            note ? note.map((n) => {
                                return <div className='note' key={n.id}>
                                    <div className="header">
                                        <p className="title">{n.title}</p>
                                        <p className="date">{n.date}</p>
                                    </div>
                                    <p className="content">{n.content}</p>
                                    <div className="edit_con">
                                    <button className="submit-btn">Edit</button>
                                    <button className="delete-btn" onClick={()=>deleteNote(n.id)}>Delete</button>
                                    </div>
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
