import noteModel from "../Model/noteModel.js";
import userModel from "../Model/userModel.js";
import { tokenVerify } from "../Middleware/middleware.js";


const addNote = async (req,res) =>{
    try {
        const {title, content} = req.body;

        if (!title || !content) {
            return res.json({ success: false, message: "Title and content are required" });
        }
        const newNote = await new noteModel({
            title:title,
            content:content
        });

        const userId = req.userId;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

       const note = user.noteData = user.noteData || {};
        user.noteData[newNote._id] = {
            id: newNote._id,
            title: newNote.title,
            content:newNote.content
        };

        await userModel.findByIdAndUpdate(userId);
       await newNote.save();

        res.json({success:true, newNote, note:note, message:"Note Saved"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

export {addNote}