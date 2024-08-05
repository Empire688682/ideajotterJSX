import noteModel from "../Model/noteModel.js";
import userModel from "../Model/userModel.js";
import { tokenVerify } from "../Middleware/middleware.js";


const addNote = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.json({ success: false, message: "Title and content are required" });
        }
        const newNote = await new noteModel({
            title: title,
            content: content
        });

        const userId = req.userId;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        //formating date
        const formatDate = (date) => {
            const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            const day = days[date.getDay()];
            const month = months[date.getMonth()];
            const dayOfMonth = date.getDate().toString().padStart(2, '0');
            const year = date.getFullYear();

            return `${day} ${month} ${dayOfMonth}, ${year}`;
        };

        const date = new Date();
        const formattedDate = formatDate(date);

        user.noteData = user.noteData || {}

        user.noteData.set(newNote._id.toString(), {
            id: newNote._id.toString(),
            title: newNote.title,
            content: newNote.content,
            date: formattedDate
        })

        await user.save();
        await newNote.save();

        // Fetch updated user data including noteData
        const updatedUser = await userModel.findById(userId);
        const noteData = updatedUser.noteData;
        console.log(noteData);

        res.json({ success: true, noteData, message: "Note Saved" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
};

const fetchNote = async (req, res) => {
    try {
        const userId = req.userId
        if (!userId) {
            return res.json({ success: false, message: "Not Authorize" })
        }
        const user = await userModel.findById(userId);
        const userNoteData = user.noteData;
        res.json({ success: true, userNoteData, message: "Note fetched" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
};



const deleteNote = async (req, res) => {
    try {
        const userId = req.userId;
        const { noteId } = req.body;

        if (!userId) {
            return res.json({ success: false, message: "Not Authorized" });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        if (!user.noteData || !user.noteData[noteId]) {
            return res.json({ success: false, message: "Note not found" });
        }

        // Delete the note
        user.noteData.delete(noteId);

        // Save the updated user
        await user.save();

        console.log("user after delete:", user.noteData)

        res.json({ success: true, message: "Note deleted successfully", noteData: user.noteData });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" });
    }
};


export { addNote, fetchNote, deleteNote }