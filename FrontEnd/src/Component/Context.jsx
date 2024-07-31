import React, { useEffect, useState } from 'react'
import { useContext } from 'react';

const JoteContext = React.createContext();
export const JoterProvider = ({children}) =>{

    const url = "http://localhost:1999";
    const [token, setToken] = useState(localStorage.getItem("token")||null);
    const [user, setUser] = useState(localStorage.getItem("user") ||'');

    console.log(user)

    //logout user
    const logOutUser = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.replace("/");
    };

    return <JoteContext.Provider value={{
        url,
        token, 
        setToken,
        user, 
        setUser,
        logOutUser
    }}>
        {children}
    </JoteContext.Provider>
};



export const useGlobalContex = () =>{
    return useContext(JoteContext);
}

export default JoterProvider
