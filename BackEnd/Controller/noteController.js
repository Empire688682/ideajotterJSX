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
        const formatDate = () => {
            const now = new Date();
            const options = { weekday: 'short', year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
            return now.toLocaleString('en-US', options).replace(',', ''); // Removing comma to match the format
        }

        user.noteData = user.noteData || {}

       user.noteData.set(newNote._id.toString(), {
        id:newNote._id.toString(),
        title:newNote.title,
        content:newNote.content,
        date:formatDate()
       })

        await user.save();
        await newNote.save();
        
        // Fetch updated user data including noteData
        const updatedUser = await userModel.findById(userId);

        console.log('User after save:', await userModel.findById(userId)); // Debugging line

        res.json({ success: true, noteData:updatedUser.noteData, message: "Note Saved" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}

export { addNote }