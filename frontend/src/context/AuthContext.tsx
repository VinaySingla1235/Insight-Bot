import { ReactNode, createContext, useContext, useEffect, useState } from "react"; 
import { loginUser,checkAuthStatus, logoutUser, signupUser } from "../helpers/api-communicators";

type User={
    name:string,
    email:string,
}
type userAuth={
    isLoggedIn:boolean;
    user:User | null;
    login:(email:string,password:string)=>Promise<void>;
    signup:(name:string,email:string,password:string)=>Promise<void>;
    logout:()=>Promise<void>;
}
const AuthContext=createContext<userAuth |null>(null);
export const AuthProvider=({children}:{children:ReactNode})=>{
    const [user,setUser]=useState<User | null>(null);
    const [isLoggedIn,setIsLoggedIn]=useState(false);

    useEffect(()=>{
        async function checkStatus(){
            // const data=await checkAuthStatus().then((result)=>{
            //         let obj={
            //         email:result.email,
            //         name:result.name
            //     }
            //     setUser(obj);
            //     setIsLoggedIn(true);
            // })
            try {
                const data=await checkAuthStatus();
            if(data){
                console.log(data);
                let obj={
                    email:data.email,
                    name:data.name
                }
                console.log(obj);
                setUser(obj);
                setIsLoggedIn(true);
            }
            // console.log(user);
            } catch (error) {
                console.log(error);
            }
        }
        checkStatus();
    },[]);
    console.log(user);
    const login=async(email:string,password:string)=>{
        const data=await loginUser(email,password);
        console.log(data);
        if(data){
            setUser({email:data.email,name:data.name});
            setIsLoggedIn(true);
        }
        else{
            setIsLoggedIn(false);
            setUser(null);
        }

    }
    const signup=async(name:string,email:string,password:string)=>{
        const data=await signupUser(name,email,password);
        setIsLoggedIn(true);
        if(data){
            setUser({name:data.name,email:data.email});
            setIsLoggedIn(true);
        }
    }
    const logout=async()=>{
        await logoutUser();
        setIsLoggedIn(false);
        setUser(null);
        window.location.reload();
    }

    const value={
        user,
        isLoggedIn,
        login,
        logout,
        signup,
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth=()=>useContext(AuthContext);