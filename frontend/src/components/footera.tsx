import { Link } from "react-router-dom";

const Heading4 = () => {
  return (
    
<footer className="footer">
            <div className="container">
                    <div className="footer-col-1">
                        <h3>Download Our App</h3>
                        <p>Download App for Android and ios mobile phone.</p>
                        <div className="app-logo">
                            <img src="/images/IMG_0243.PNG" alt="IMG_0243.PNG"/>
                            <img src="/images/IMG_0228.PNG" alt="IMG_0228.PNG"/>
                        </div>
                    </div>
                    <div className="footer-col-3">
                        <h3>Useful Links</h3>
                        <ul>
                            <li><Link to="/about" style={{textDecoration: "none", color: "#555"}} >About</Link> </li>
                            <li><Link to="/products" style={{textDecoration: "none", color: "#555"}}>Products</Link></li>
                            <li><Link to="#" style={{textDecoration: "none", color: "#555"}}>Blog post</Link> </li>
                            <li><Link to="#" style={{textDecoration: "none", color: "#555"}}>Return Policy</Link></li>
                            <li><Link to="#" style={{textDecoration: "none", color: "#555"}}>join Affiliate</Link></li>
                        </ul>
                    </div>
                    <div className="footer-col-2">
                        <div className="footer-col-2-logo">
                        <img src="/img/logo.png" alt="IMG_0251.PNG"/>
                        </div>
                        <p>Our Purpose Is To Sustainly Make the Pleasurable
                        and Benefit of agricultural produces accessible to many.</p>
                    </div>
                    <div className="footer-col-4">
                        <h3>Contact us</h3>
                        <ul>
                            <li>+2348037135296 </li>
                            <li>Abuja, Nigeria </li>
                            <li>info@onefarmtech.com </li>
                            <li>support@onefarmtech.com </li>
                        </ul>
                    </div>
            </div>
            {/* <hr/>   */}
        <div className="copyright__container">
            <p className="copyright"> Copyright &copy;2021 - <span className="year"></span> - onefarm<span className="green">tech</span> - All right reserved</p>
        </div>
    </footer>
  );
};

export default Heading4;
