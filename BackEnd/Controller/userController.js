import userModel from "../Model/userModel.js";
import jwt from 'jsonwebtoken';
import validator from 'validator';
import bcrypt from 'bcryptjs';

const tokenGenerator = (id) =>{
    return jwt.sign({id}, process.env.TOKEN_KEY);
}

const registerUser = async (req, res) => {
    try {
        const {name, username, email, password, pwdRepeat} = req.body;

        const userExist = await userModel.findOne({email});

        if (userExist) {
            return res.json({success: false, message: "Email has been taken"});
        }

        const userName = await userModel.findOne({username});

        if (userName) {
            return res.json({success: false, message: "Username already exists"});
        }

        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "Enter correct email"});
        }

        if (!name || !username || !email || !password || !pwdRepeat) {
            return res.json({success: false, message: "All fields are required"});
        }

        if (password !== pwdRepeat) {
            return res.json({success: false, message: "Passwords do not match"});
        }

        if (password.length < 8) {
            return res.json({success: false, message: "Password too short"});
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const user = new userModel({
            name,
            username,
            email,
            password: hashPassword,
            pwdRepeat: hashPassword
        });

        await user.save();

        const token = tokenGenerator(user._id);
        return res.json({success: true, token, User: user.username, message: "User saved"});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

const loginUser = async (req, res) => {
    try {
        const {username, email, password} = req.body;

        const user = await userModel.findOne({email});

        if (!user) {
            return res.json({success: false, message: "No user found"});
        }

        if (!username || !email || !password) {
            return res.json({success: false, message: "All fields are required"});
        }

        if (username !== user.username) {
            return res.json({success: false, message: "No user found"});
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.json({success: false, message: "Password did not match"});
        }

        const token = tokenGenerator(user._id);
        return res.json({success: true, User: user.username, token, message: "Login successful"});

    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error"});
    }
}

export {registerUser, loginUser};
