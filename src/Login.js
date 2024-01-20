import { useState } from "react";
import { initializeApp } from "firebase/app";
import {getAuth,signInWithEmailAndPassword} from "firebase/auth"
import { Link, useNavigate } from "react-router-dom";
function Login() {
    const [email, setEmail] = useState("")
    const [pswd, setPswd] = useState("")
    let navigate=useNavigate()

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
    const submitdata = (e) => {
        e.preventDefault()
        let obj = {
            Email: email,
            Password: pswd
        }
        signInWithEmailAndPassword(reg,obj.Email,obj.Password)
        .then(()=>{
            alert(" Logged in successfully")
            navigate ("/home")
        })
        .catch(()=>{
            alert("error")
        })
    }

    return (
        <div style={{backgroundImage:`url("https://wallpapercave.com/wp/wp6603070.png")`,backgroundSize:"cover",backgroundRepeat:"no-repeat",padding:"20px", minHeight:"100vh"}}>
        <div className="container mt-5" style={{maxWidth:"500px"}}>
            <div className="card  border border-3" style={{backgroundColor:"rgba(12, 106, 214, 0.688)"}}>
                <div className="card-title">
                    <h1 className="text-center"><b><u>Login Form</u></b></h1>
                </div>
                <div className="card-body">
                    <form onSubmit={submitdata}>
                        <div class="mb-3">
                            <label class="form-label"><b>Email:</b></label>
                            <input type="email" value={email} class="form-control" onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail1" />
                        </div>
                       
                        <div class="mb-3">
                            <label class="form-label"><b>Password:</b></label>
                            <input type="password" value={pswd} class="form-control" onChange={(e) => setPswd(e.target.value)} id="exampleInputEmail1" />
                        </div>
                       
                        <button type="submit" class="btn btn-primary me-2">Submit</button> <a><b>If you dont have account</b><Link className="mx-3 text-white" to="/"><b>Register Here</b></Link></a>
                    </form>
                </div>
            </div>

        </div>
        </div>
    )
}
export default Login;