import React, { useState } from 'react'
import { useContext } from 'react';

const JoterContext = React.createContext();
export const JoterProvider = ({children}) =>{

    const url = "https://ideajotter-backend.onrender.com";

    const [token, setToken] = useState(localStorage.getItem("token")||null);
    const [user, setUser] = useState(localStorage.getItem("user") ||'');

    //logout user
    const logOutUser = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.replace("/");
    };

    return <JoterContext.Provider value={{
        url,
        token, 
        setToken,
        user, 
        setUser,
        logOutUser
    }}>
        {children}
    </JoterContext.Provider>
};



export const useGlobalContex = () =>{
    return useContext(JoterContext);
}

export default JoterProvider
