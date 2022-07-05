import React from "react";
import AboutContainer from "./AboutContainer";
import NavBar from "./navBar";
import NavBarHeading from "./NavBarHeading";

const NavBarContainer = (props:any) => {
  // let {height, url1, url2} = props
  return (
    <section>
      <div className="bg-light"
      style={{
        backgroundImage: 'linear-gradient(to right, rgba(56, 56, 56, 0.973), rgba(255, 255, 255, 0.1)), url(/images/bg4.jpg)',
        // height: height ,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        clipPath: 'polygon(0 0, 100% 0, 100% 90vh, 0 100%)',
        width: "100%"
       
      }}>
      {/* <NavBar url1={url1} url2={url2} /> */}
      <NavBarHeading />
       </div>
    </section>


  );
};

export default NavBarContainer;
