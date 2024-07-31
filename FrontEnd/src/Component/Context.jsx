import React, { useState } from 'react'
import { useContext } from 'react';

const JoteContext = React.createContext();
export const JoterProvider = ({children}) =>{
    return <JoteContext.Provider value={{
        
    }}>
        {children}
    </JoteContext.Provider>
};


export const useGlobalContex = () =>{
    return useContext(JoteContext);
}

export default JoterProvider
