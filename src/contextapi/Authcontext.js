import { useState,createContext,useContext,useEffect } from "react";
import axios from "axios";

const AuthContext=createContext();

const AuthProvider=(props)=>{
      
    const[auth,setAuth]=useState({
        user:null,
        token:" ",
    });

    //default axios function;
axios.defaults.headers.common["Authorization"] = auth?.token;
    
    useEffect(()=>{
        const data=localStorage.getItem('auth');
        if(data){
            const parsed=JSON.parse(data);
            setAuth({
                ...auth,
                user:parsed.user,
                token:parsed.token,
            })
        }
        //eslint-disable-next-line
    },[])
          

    return(
        <AuthContext.Provider value={[auth,setAuth]}>
            {props.children}
        </AuthContext.Provider>

    )
};

const useAuth=()=>useContext(AuthContext);

export {useAuth,AuthProvider};
