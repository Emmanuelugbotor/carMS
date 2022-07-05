import React from "react";
import { Link } from "react-router-dom";
const NavBarHeading = () => {
  return (
    
    <div className="row">
    <div className="col-md-7 col-sm-12" style={{margin: "15%"}}>

        <h2 style={{fontWeight: 700, color: 'white', fontFamily: "Cambria, Cochin, Georgia, Times, 'Times New Roman', serif"}}>ONEFARM-TECH</h2>

        <p style={{fontSize: '18px', color: 'white', textAlign: 'left'}}>Buy agro-products directly from <br /> rural farmers around Nigeria.</p>
        
        <Link to="/products" className="btn btn-lg" style={{backgroundColor: '#14fd1cba', borderColor: '#14fd1cba',
        marginTop: '20px', color: 'white'}}> Shop now</Link>
    
    </div>

    <div className="col-md-3">

    </div>
</div>
  
  );
};

export default NavBarHeading;
