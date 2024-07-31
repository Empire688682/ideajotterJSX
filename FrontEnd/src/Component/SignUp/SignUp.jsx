import React, { useState } from 'react';
import './SignUp.css';

const SignUp = () => {
    const [loginStage, setLogInStage] = useState("Login");
    return (
        <div className="sign-up">
            <div className="container">
                <h1>{loginStage === "Signup" ? "Signup" : "Login"}</h1>
                <form>
                    <div>
                        {loginStage === "Login" ?
                            null :
                            <input type="text" placeholder="Full Name" name="name" />
                        }
                    </div>
                    <div>
                        <input type="text" placeholder="Username" name="username" />
                    </div>
                    <div>
                        <input type="email" placeholder="Your Email" name="email" />
                    </div>
                    <div>
                        <input type="password" placeholder="Password" name="pwd" />
                    </div>
                    <div>
                        {loginStage === "Login" ?
                            null :
                            <input type="password" placeholder="Repeat Password" name="pwdRepeat" />
                        }
                    </div>
                    <button type="submit" name="submit">
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
                        <p className='create-already'>Already have an account? <span onClick={() => setLogInStage("Login")}>Login</span></p>
                    ) : (
                        <p className='create-already'>Create a new account? <span onClick={() => setLogInStage("Signup")}>Click here</span></p>
                    )}
                </div>
            </div>
        </div>
    )
}

export default SignUp
