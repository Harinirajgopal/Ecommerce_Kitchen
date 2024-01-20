
import { initializeApp } from "firebase/app";
import {getAuth,onAuthStateChanged} from "firebase/auth";
import { useEffect, useState } from "react";


const firebaseConfig = {
    apiKey: "AIzaSyCBrdNQODqSaqrbLWb0mFxqh0cNVvq_SNw",
    authDomain: "kitchen-1629b.firebaseapp.com",
    projectId: "kitchen-1629b",
    storageBucket: "kitchen-1629b.appspot.com",
    messagingSenderId: "900572452211",
    appId: "1:900572452211:web:e3c42e77e2d0c66016a106",
    measurementId: "G-KC1160MZC5"
};

const app = initializeApp(firebaseConfig);
const reg = getAuth()
function User(){
    const[user,setUser]=useState("")
    useEffect(()=>{
        let x=onAuthStateChanged(reg,user=>setUser(user))
        return x;
    },[])
    return user;
    return(
        <div>

        </div>
    )
}
export default User;