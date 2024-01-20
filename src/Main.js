import Home from "./Home";
import AddCart from "./Cart";
import { BrowserRouter as Router ,Routes,Route } from "react-router-dom";
import Register from "./Registeration";
import Login from "./Login";

function Module(){
    return(

        <div>
            <Router>
                
                <Routes>
                    <Route path="/" element={<Register/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/home" element={<Home/>}/>
                    <Route path="/cart" element={<AddCart/>}/>
                </Routes>
                
            </Router>
        </div>


    )
}
export default Module;