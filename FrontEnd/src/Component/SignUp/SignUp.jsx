import React, { useState } from 'react';
import './SignUp.css';
import { useGlobalContex } from '../Context';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [loginStage, setLogInStage] = useState("Login");
    const [errorMessage, setErrorMessage] = useState(null);
    const { url } = useGlobalContex();
    const navigate = useNavigate();
    const [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        password: "",
        pwdRepeat: ""
    });
    const [loading, setLoading] = useState(false);

    const clearInputField = () => {
        setData({
            name: "",
            username: "",
            email: "",
            password: "",
            pwdRepeat: ""
        });
    };

    const handleOnchange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
        setErrorMessage("");
    };

    const handleFormSubmision = (e) => {
        e.preventDefault();
        signUpLogIn();
    };

    const signUpLogIn = async () => {
        let newUrl = url;
        if (loginStage === "Login") {
            newUrl += "/api/user/login";
        } else {
            newUrl += "/api/user/register";
        }

        try {
            setLoading(true);
            const response = await axios.post(newUrl, data);

            if (response.data.success) {
                clearInputField();
                localStorage.setItem("token", response.data.token);
                localStorage.setItem("user", response.data.User);
                navigate("/");
                window.location.reload();
            } else {
                setErrorMessage(response.data.message);
            }
        } catch (error) {
            setErrorMessage("An error occurred, please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="sign-up">
            <div className="container">
                <h1>{loginStage === "Signup" ? "Signup" : "Login"}</h1>
                <h4>{loginStage === "Signup" ? "" : "WELCOME BACK"}</h4>
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
                    {errorMessage ? <p>{errorMessage}</p> : null}
                    <button type="submit">
                        {loading ? "Processing..." : (loginStage === "Login" ? "Login" : "Signup")}
                    </button>
                </form>
                <div className="login-status">
                    {loginStage === "Signup" ? (
                        <p onClick={clearInputField} className='create-already'>Already have an account? <span onClick={() => setLogInStage("Login")}>Login</span></p>
                    ) : (
                        <p onClick={clearInputField} className='create-already'>Create a new account? <span onClick={() => setLogInStage("Signup")}>Click here</span></p>
                    )}
                </div>
                <div className="user_agreement">
                    <h3>User Agreement</h3>
                    <ul>
                        <li><b>Account Responsibility:</b> You are responsible for all activities under your account. Keep your login credentials secure.</li>
                        <li><b>Appropriate Use:</b> Use IdeaJotter responsibly. Do not upload harmful, offensive, or illegal content.</li>
                        <li><b>Data Privacy:</b> Your data is important to us. We will not share your personal information without your consent, except as required by law.</li>
                        <li><b>Modification and Termination:</b> We may modify or discontinue the platform at any time. Accounts may be suspended or terminated for violations.</li>
                        <li><b>Limitation of Liability:</b> IdeaJotter is provided "as is." We are not liable for any damages resulting from your use of the platform.</li>
                    </ul>
                    <p>
                        <li>I have read and agree to the User Agreement.</li>
                        <input type="checkbox" name="" id="" />
                        I agree to the terms and conditions
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
