import noteModel from "../Model/noteModel.js";


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
       await newNote.save();
        res.json({success:true, message:"Note Saved"})
    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

export {addNote}