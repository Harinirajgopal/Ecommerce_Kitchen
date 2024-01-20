import { useEffect } from "react"
import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import Footer from "./Footer";
import { initializeApp } from "firebase/app";
import { getAuth, signOut } from "firebase/auth"
import User from "./user";
import Pagination from "./Pagination";

function Home() {
  const [data, setData] = useState([])
  const [value, setValue] = useState("")// search purpose
  const [sort, setSort] = useState("")// sorting purpose
  const [count, setCount] = useState(0) // cart number count

  let Currentuser = User()

  useEffect(() => {
    fetch("https://e-backend-appj.onrender.com/Products")
      .then((res) => {
        return res.json()
      })
      .then((resp) => {
        setData(resp)
      })
  }, [])

  const search = async (e) => {
    e.preventDefault()
    return await axios.get(`https://e-backend-appj.onrender.com/Products?q=${value}`)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log("err")
      })
  }

  let options = ["title", "price"]
  const sorting = async (e) => {
    let abc = e.target.value
    setSort(abc)
    return await axios.get(`https://e-backend-appj.onrender.com/Products?_sort=${abc}&_order=asc`)
      .then((res) => {
        setData(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const Addcart = (id) => {
    fetch("https://e-backend-appj.onrender.com/Products/" + id)
      .then((res) => {
        return res.json()
      })
      .then((resp) => {
        console.log(resp)
        fetch("https://e-backend-appj.onrender.com/AddedCart/",
          {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(resp)
          })
          .then(() => {
            badge();
          })
      })
  }

const badge=() => {
    fetch("https://e-backend-appj.onrender.com/AddedCart")
      .then((res) => {
        return res.json()
      })
      .then((resp) => {
        setCount(resp)        
      })
      .catch((err)=>{
        console.log(err)
      })
      
  }

  useEffect(()=>{
      badge()
  },[])
 
  let navigate = useNavigate()

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

    signOut(reg)
      .then(() => {
        alert(" Logged Out successfully")
        navigate("/login")
      })
      .catch(() => {
        alert("error")
      })
  }

  //pagination
  const [page, setPage] = useState(1)
  const [records, setRecords] = useState(4)

  let lrecord = page * records //last record= 4
  let frecord = lrecord - records //first record =0
  let show = data.slice(frecord, lrecord)

  const npage=Math.ceil(data.length/records)
  const number=[...Array(npage+1).keys()].slice(1)

  const updatepages = (num) => {
    setPage(num)
  }

  const Prev = () => {
    if(page!==1)
    {
    setPage(page - 1)
    }
  }

  const Next = () => {
    if(page!==npage)
    {
    setPage(page + 1)
    }
  }
  return (
    <div id="hello">
      <nav class="navbar navbar-expand-lg border border-black fixed-top" style={{backgroundColor:"rgb(192, 141, 166)"}}>
        <div class="container-fluid">
          <a class="navbar-brand" href="#"><img src="https://www.zarla.com/images/zarla-our-kitchen-1x1-2400x2400-20210607-g7q69ybhqxvvy7rtwvvj.png?crop=1:1,smart&width=250&dpr=2" height="50px" alt="" /></a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav me-auto mb-2 mb-lg-0 mx-5">
              <form class="d-flex" onSubmit={search}>
                <input class="form-control ms-5 me-1" type="text" onChange={(e) => setValue(e.target.value)} placeholder="Search your product" />
                <button class="btn btn-outline-success" type="submit">Search</button>
              </form>
            </ul>
            <span class="navbar-text mx-5 d-flex">
              <div class="nav-item">
                <a class="nav-link mx-5" href="#">
                  <Link to="/cart"><i class="bi bi-cart-plus-fill h3"></i></Link>
                  <span class="position-absolute top-7 start-70 fs-6 translate-middle badge rounded-pill bg-danger">
                    {count.length}
                    <span class="visually-hidden"></span>
                  </span></a>
              </div>
              <a class="nav-link"><i class="bi bi-person-circle" style={{ fontSize: "20px" }}></i>{Currentuser?.email}</a>
            </span>
            <div class="d-flex" role="search">
              <button class="btn btn-outline-success" onClick={submitdata} type="submit">Logout</button>
            </div>
          </div>
        </div>
      </nav>
      <div className=" row mx-2 container-fluid " id="body" style={{marginTop:"80px"}}>
        <div className="col-md-3 mt-5" id="left">
          <div>
            <form class="form-control" id="a" >
              <select class="form-select mt-3" disabled aria-label="Default select example">
                <option selected>Shop by Concern</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select><br />
              <select class="form-select" disabled aria-label="Default select example">
                <option selected>Shop by Category</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select>
              <br />
              <select class="form-select" value={sort} onChange={sorting} aria-label="Default select example">
                <option selected>---Sort---</option>
                {options.map((item) => (
                  <option>{item}</option>
                ))}

              </select>
              <br />
              <select class="form-select mt-3 bg-light" disabled aria-label="Default select example">
                <option selected>Shop All</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
              </select><br />
              <br />
            </form >
          </div>
          <br /><br />
          <div>
            <form className="form-control" id="b">
              <div className="container">
                <label for="customRange2" class="form-label">Example range</label>
                <input type="range" class="form-range" min="0" max="4" id="customRange2" /><br /><br />
                <label for="customRange2" class="form-label">Example range</label>
                <input type="range" class="form-range" min="0" max="3" id="customRange2" />
                <br />
                <br />
              </div>
            </form>
          </div>

        </div>
        <div className="col-md-9" id="right">
          <h3 className="text-center m-1">Product Display</h3>
          <div className="row row-cols-1 row-cols-md-3 g-3" >
            {show.map((e) => (
              <div className="col">
                <div className="card h-100" id="c">
                  <div className="card-body">
                    <img src={e.Img} class="card-img-top" width="100%" height="200px" alt="..." />
                    <h5 class="card-title">Title:{e.title}</h5>
                    <h5 class="card-title">Amount:${e.price}</h5>
                    <h5 class="card-title">Quantity:{e.Quantity}</h5>
                    <button className="btn btn-success" onClick={() => Addcart(e.id)}>Add to Cart<i class="bi bi-bag-plus mx-1"></i></button>
                  </div>
                </div>
              </div>
            ))}

          </div>
          <Pagination
            total={data.length}
            records={npage}
            update={updatepages}
            prev={Prev}
            next={Next}
            activepage={page}
          />
        </div>



      </div>

      {/* <div>
          <Module search={search} cat={count.length} setValue={setValue}/>
      </div> */}
      <div>
        <Footer />
      </div>




    </div>


  )
}



export default Home;
