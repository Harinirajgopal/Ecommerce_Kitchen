import { useEffect, useState } from "react"
import Footer from "./Footer";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";


function AddCart() {
  const [data, setData] = useState([])
  // const[quantity,setQuantity]=useState(1)
 
  useEffect(() => {
    fetch("https://e-backend-appj.onrender.com/AddedCart")
      .then((r) => {
        return r.json()
      })
      .then((res) => {
        setData(res)
        console.log(res)
      })
  }, [])


  // const handleUpdateQuantity = (id, newQuantity) => {
  //   const updatedData = data.map((item) =>
  //     item.id === id ? { ...item, Quantity: newQuantity } : item
  //   );
  const handleUpdateQuantity = (id, newQuantity) => {
    if (newQuantity < 0) {
      // Quantity should not go below 0
      return;
    }

    const updatedData = data.map((item) =>
      item.id === id ? { ...item, Quantity: newQuantity } : item
    );

    fetch(`https://e-backend-appj.onrender.com/AddedCart/${id}`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(updatedData.find((item) => item.id === id)),
    })
      .then(() => {
        setData(updatedData);
      })
      .catch((error) => console.error("Error updating quantity:", error));
  };

  const calculateProductTotal = (price, quantity) => {
    return price * quantity;
  };

  const calculateCartTotal = () => {
    return data.reduce(
      (total, item) => total + calculateProductTotal(item.price, item.Quantity),
      0
    );
  };

  const Del = (e) => {
    fetch("https://e-backend-appj.onrender.com/AddedCart/" + e, {
      method: "DELETE"
    })
    alert("Are you sure to Delete ?!!")
    window.location.reload()
  }
  
  //pagination
  const [page, setPage] = useState(1)
  const [records, setRecords] = useState(4)

  let lrecord = page * records //last record= 4
  let frecord = lrecord - records //first record =0
  let show = data.slice(frecord, lrecord)

  const npage = Math.ceil(data.length / records)
  const number = [...Array(npage + 1).keys()].slice(1)

  const updatepages = (num) => {
    setPage(num)
  }

  const Prev = () => {
    if (page !== 1) {
      setPage(page - 1)
    }
  }

  const Next = () => {
    if (page !== npage) {
      setPage(page + 1)
    }
  }
  return (
    <div className="container-fluid">
      <span className="d-flex justify-content-around mt-2">
        <h3>Your Cart</h3>
        <Link to="/home" className="btn btn-primary">Back to Home </Link>
      </span>
      <div className="row row-cols-1 row-cols-md-4 g-3 mt-3">
        {show.map((e) => (
          <div className="col">
            <div className="card h-100">
              <div className="card-body">
                <img src={e.Img} class="card-img-top" width="100%" height="200px" alt="..." />
                <h5 class="card-title">Title:{e.title}</h5>
                <h5 class="card-title">Amount:${e.price}</h5>
                <div className="d-flex">
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => handleUpdateQuantity(e.id, e.Quantity - 1)}
                  >
                    -
                  </button>
                  <h5 className="mx-2">{e.Quantity}</h5>
                  <button
                    className="btn btn-outline-primary"
                    onClick={() => handleUpdateQuantity(e.id, e.Quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <p className="mt-2">
                   <b>Product Total:</b> ${calculateProductTotal(e.price, e.Quantity)}
                  </p>
                <button className="btn btn-danger" onClick={() => Del(e.id)}> Delete<i class="bi bi-file-x mx-1"></i></button>
              </div>
            </div>
          </div>
        ))}

      </div>
      <p><b>Total Cart Value:</b> ${calculateCartTotal()}</p>
      <Pagination
        total={data.length}
        records={npage}
        update={updatepages}
        prev={Prev}
        next={Next}
        activepage={page}
      />

      <div>
        <Footer />
      </div>

    </div>

  )
}

export default AddCart;