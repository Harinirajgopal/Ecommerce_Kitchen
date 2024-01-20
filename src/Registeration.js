import { useState } from "react";
import { initializeApp } from "firebase/app";
import {getAuth,createUserWithEmailAndPassword} from "firebase/auth"
import { Link, useNavigate } from "react-router-dom";
import "./App.css"
function Register() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [mobile, setMobile] = useState("")
    const [pswd, setPswd] = useState("")
    const [cpswd, setCpswd] = useState("")

    const navigate=useNavigate()

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
        if(name.length<6){
            alert("Name should contain minimum 4 characters")
        }
        if(pswd != cpswd)
        {
            alert("Password does not match")
        }
        let obj = {
            Email: email,
            Password: pswd
        }
        createUserWithEmailAndPassword(reg,obj.Email,obj.Password)
        .then(()=>{
            alert(" registered successfully")
            navigate ("/login")
        })
        .catch(()=>{
            alert("error")
        })
    }

    return (
        <div style={{backgroundImage:`url("https://img.freepik.com/free-photo/html-css-collage-concept-with-person_23-2150061967.jpg?w=740&t=st=1702923250~exp=1702923850~hmac=689d0617043e546a46afb0075b4af6f164ee99061d993d5edb81c443434d2631")`,backgroundSize:"cover",backgroundRepeat:"no-repeat",padding:"20px",minHeight:"100vh"}}>
        <div className="container" style={{maxWidth:"500px"}}>
            <div className="card border border-3  mt-3" style={{backgroundColor:" rgba(68, 104, 145, 0.688)"}}>
                <div className="card-title">
                    <h1 className="text-center"><b><u>Registeration Form</u></b></h1>
                </div>
                <div className="card-body">
                    <form onSubmit={submitdata} >
                        <div class="mb-3">
                            <label class="form-label"><b>Name:</b></label>
                            <input type="text" value={name} class="form-control" onChange={(e) => setName(e.target.value)} id="exampleInputEmail1" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label"><b>Email:</b></label>
                            <input type="email" value={email} class="form-control" onChange={(e) => setEmail(e.target.value)} id="exampleInputEmail1" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label"><b>Mobile:</b></label>
                            <input type="number" value={mobile} class="form-control" onChange={(e) => setMobile(e.target.value)} id="exampleInputEmail1" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label"><b>Password:</b></label>
                            <input type="password" value={pswd} class="form-control" onChange={(e) => setPswd(e.target.value)} id="exampleInputEmail1" />
                        </div>
                        <div class="mb-3">
                            <label class="form-label"><b> Confirm Password:</b></label>
                            <input type="password" value={cpswd} class="form-control" onChange={(e) => setCpswd(e.target.value)} id="exampleInputEmail1" />
                        </div>
                        <button type="submit" class="btn btn-primary me-4">Register</button><a><b>If you already have account<Link className="mx-2 text-white" to="/login"> Login Here</Link></b></a>
                    </form>
                </div>
            </div>

        </div>
        </div>
    )
}
export default Register;