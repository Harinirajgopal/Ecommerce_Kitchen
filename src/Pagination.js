import { useState } from "react"

function Pagination({ records, update, prev, next,index,activepage }) {
    // let n = Math.ceil(total / records)
    // let pages = []
    // for (let i = 1; i <= n; i++) {
    //     pages.push(i)
    // }
    // console.log(pages)
    // const[active,setActive]=useState(1)
    // const change=(n)=>{
    //     setActive(n)
    // }

    let n=records
    let page=[]
    for (let i=1;i<=n;i++){
        page.push(i)
    }

    return (
        <div>
            <ul className="pagination mt-5 mx-5">

                <li className="page-item">
                    <a href="#" className="page-link" onClick={prev}>Prev</a>
                </li>
                {page.map((p,index) => (
                    <li className={`page-item ${activepage === p? "active":""} `}>
                        <a href="#" className="page-link" onClick={() => {update(p)}}>{p}</a>
                    </li>
                ))}
                <li className="page-item">
                    <a href="#" className="page-link" onClick={next}>Next</a>
                </li>

            </ul>
        </div>
    )
}
export default Pagination;