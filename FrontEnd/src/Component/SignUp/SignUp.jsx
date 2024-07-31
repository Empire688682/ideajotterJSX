import React, { useState } from 'react';
import './SignUp.css';
import { useGlobalContex } from '../Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [loginStage, setLogInStage] = useState("Login");
    const [errorMessage, setErrorMessage] = useState(null);
    const { url,token } = useGlobalContex();
    const navigate = useNavigate()
    const [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        pwdRepeat: ""
    });

    const clearInputField = () =>{
        setData({name: "",
            username: "",
            email: "",
            password: "",
            pwdRepeat: ""})
    };

    const handleOnchange = (e) =>{
        const {name, value} = e.target;
        setData((prev) =>({...prev, [name]:value}));
        setErrorMessage("")
    };

    const handleFormSubmision = (e) =>{
        e.preventDefault();
        signUpLogIn()
    };

    const signUpLogIn = async () =>{
        let newUrl = url;
        if(loginStage === "Login"){
            newUrl += "/api/user/login"
        }
        else{
            newUrl += "/api/user/register"
        }
        try {
            const response = await axios.post(newUrl, data, {headers:{token}});
            if(response.data.success){
                clearInputField()
                localStorage.setItem("token",response.data.token);
                localStorage.setItem("user",response.data.User);
                setLogInStage("Login");
                if(loginStage === "Login"){
                    navigate("/")
                    window.location.reload()
                }
            }
            else{
                setErrorMessage(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <div className="sign-up">
            <div className="container">
                <h1>{loginStage === "Signup" ? "Signup" : "Login"}</h1>
                <form onSubmit={handleFormSubmision}>
                    <div>
                        {loginStage === "Login" ?
                            null :
                            <input required onChange={handleOnchange} value={data.name} type="text" placeholder="Full Name" name="name" />
                        }
                    </div>
                    <div>
                        <input required onChange={handleOnchange} value={data.username} type="text" placeholder="Username" name="username" />
                    </div>
                    <div>
                        <input required onChange={handleOnchange} value={data.email} type="email" placeholder="Your Email" name="email" />
                    </div>
                    <div>
                        <input required onChange={handleOnchange} value={data.password} type="password" placeholder="Password" name="password" />
                    </div>
                    <div>
                        {loginStage === "Login" ?
                            null :
                            <input required onChange={handleOnchange} value={data.pwdRepeat} type="password" placeholder="Repeat Password" name="pwdRepeat" />
                        }
                    </div>
                    {
                        errorMessage? <p>{errorMessage}</p>:null
                    }
                    <button type="submit">
                        {loginStage === "Login" ?
                            "Login"
                            :
                            "Signup"}
                    </button>
                </form>
                <p className='form-policy'>
                    <input type='checkbox' required />
                    <span>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet illo laborum accusamus modi consequuntur ipsam iusto quas saepe eveniet nulla, ipsa doloremque soluta velit minus ea rerum consequatur, vero deserunt.</span>
                </p>
                <div className="login-status">
                    {loginStage === "Signup" ? (
                        <p onClick={clearInputField} className='create-already'>Already have an account? <span onClick={() => setLogInStage("Login")}>Login</span></p>
                    ) : (
                        <p onClick={clearInputField} className='create-already'>Create a new account? <span onClick={() => setLogInStage("Signup")}>Click here</span></p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SignUp
