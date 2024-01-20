
import "./App.css"
function Footer(){
    return(
        <div className="footer mx-2" style={{marginTop:"15px"}}>
            <div className="row">
                <div className="col-md-4">
                    <label><b>Logo</b></label>
                    <p className="mt-2"> Subline</p>
                </div>
                <div className="col-md-2">
                <label><b>Paged</b></label>
                <p className="mt-2"> About Us</p>
                <p className="mt-2"> Our Expertise</p>
                <p className="mt-2"> Testimonials</p>
                <p className="mt-2"> Skin & Hair</p>
                <p className="mt-2"> Shop</p>
                </div>
                <div className="col-md-2">
                <label><b>Legal & Help</b></label>
                <p className="mt-2"> FAQ's</p>
                <p className="mt-2"> Terms of Use</p>
                <p className="mt-2"> Privacy Policy</p>
                </div>
                <div className="col-md-2">
                <label><b>Contact-Us</b></label>
                <p className="mt-2"><i class="bi bi-geo-alt"></i> Address</p>
                <p className="mt-2"><i class="bi bi-telephone-fill"></i> Phone numbers</p>
                <p className="mt-2"><i class="bi bi-envelope"></i> Mail id</p>
                </div>
                <div className="col-md-2">
                <label><b>Social -Links</b></label>
                <div><span>
                <i class="bi bi-facebook"></i> &nbsp;
                <i class="bi bi-twitter"></i> &nbsp;
                <i class="bi bi-linkedin"></i> &nbsp;
                <i class="bi bi-youtube"></i>


                </span>
                <div><br/>
                <i class="bi bi-google-play"><b>Google Play</b></i><br/>

                <i class="bi bi-apple"><b>Apple Store</b></i>
                </div>
                </div>
                
                </div>

                

            </div>
        </div>
    )
}

export default Footer;