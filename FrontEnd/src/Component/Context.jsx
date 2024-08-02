import React, { useEffect, useState } from 'react'
import { useContext } from 'react';

const JoterContext = React.createContext();
export const JoterProvider = ({children}) =>{

    const url = "http://localhost:1999";
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
