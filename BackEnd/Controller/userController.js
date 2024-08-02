import userModel from "../Model/userModel.js";
import jwt from 'jsonwebtoken';
import validator from 'validator';
import bcrypt from 'bcryptjs';



const tokenGenerator = (id) =>{
    return jwt.sign({id},process.env.TOKEN_KEY)
}

const registerUser = async (req,res) =>{
    try {
        const {name,username,email,password,pwdRepeat} = req.body;

        const userExist = await userModel.findOne({email});

        //checking is userExist
        if(userExist){
            return res.json({success:false, message:"Email has been taken"}); 
        }

        const userName = await userModel.findOne({username});

        //checking is userName
        if(userName){
            return res.json({success:false, message:"User Already exist"}); 
        }
        //checking is email
        if(!validator.isEmail(email)){
            return res.json({success:false, message:"Enter correct email"});
        }
        //checking is emptyInput
        if(!name || !username || !email || !password || !pwdRepeat){
            return res.json({success:false, message:"All filed required"});
        };
        //checking is password match
        if(password !== pwdRepeat){
            return res.json({success:false, message:"Password did not match"});
        }
        //checking is password strong
        if(password.length < 8){
            return res.json({success:false, message:"Password too short"});
        }
        //hashing the password for Db
        const hashPassword = await bcrypt.hash(password, 10);
        //creating new user
        const user = await new userModel({
            name:name,
            username:username,
            email:email,
            password:hashPassword,
            pwdRepeat:hashPassword
        });

        await user.save();

        const token = tokenGenerator(user._id);

        return res.json({success:true, token, message:"User saved"});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

const loginUser = async (req,res) =>{
    try {
        const {username,email,password} = req.body;

        const user = await userModel.findOne({email});


        // checking is user
        if(!user){
            return res.json({success:false, message:"No user found"});
        }

        //checking is emptyInput
        if(!username || !email || !password){
            return res.json({success:false, message:"All filed required"});
        };

        // checking is username
        if(username !== user.username){
            return res.json({success:false, message:"No user found"});
        }

         //checking is password match
         const isPasswordMatch = await bcrypt.compare(password, user.password)
         if(!isPasswordMatch){
            return res.json({success:false, message:"Password did not match"});
        }
        //generating token for login
        const token = tokenGenerator(user._id);
        const User = await user.username;
        return res.json({success:true, User, token, message:"Login successful"});

    } catch (error) {
        console.log(error);
        res.json({success:false, message:"Error"})
    }
}

export {registerUser, loginUser}