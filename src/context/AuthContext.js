import React from 'react';
import axios from "axios";
import { createContext, useEffect, useState } from "react";
axios.defaults.withCredentials = true;

const AuthContext = createContext();

export const AuthContextProvider = ({children}) => {
    const [ loggedIn, setLoggedIn ] = useState(undefined);
    const getLoggedIn = async () => {
        const loggedInRes = await axios.get("http://127.0.0.1:4040/api/log/loggedin");
        setLoggedIn(loggedInRes.data);
    }
    useEffect(() => {
        getLoggedIn();
    }, [])
    return (
        <AuthContext.Provider value={{loggedIn, getLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;