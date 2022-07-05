import React from "react";

import DirectionsCarFilledIcon from "@mui/icons-material/DirectionsCarFilled";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import bg from "../assets/images/rug.jpg";

export default function Footer() {
  return (
    <footer
      className="footerClass"
      style={{
        background: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <div className="logo">
        <span>
          <div className="icon">
            <DirectionsCarFilledIcon />
          </div>
          <span>greenCar</span>
          <span>autocare</span>
        </span>
      </div>
      <p>
        Etiam consequat sem ullamcorper, euismod metus sit amet, tristique
        justo. Vestibulum mattis, nisi ut faucibus commodo, risus ex commodo
      </p>
      <ul>
        <li>
          <div className="icon">
            <LocalPhoneIcon />
          </div>
          <h2>234 (814) 922 989 21</h2>
          <span>Round-the-clock</span>
        </li>
        <li>
          <div className="icon">
            <LocationOnIcon />
          </div>
          <h2>Car Washing Point (HQTR)</h2>
          <p>1353 Locust St, Kansas City, MO 64106</p>
        </li>
        <li>
          <div className="icon">
            <EmailIcon />
          </div>
          <p>info@aql-theme.com</p>
          <p>info@aql-theme.com</p>
        </li>
        <li>
          <div className="icon">
            <AccessTimeIcon />
          </div>
          <p>
            <span>Mon-Sat:</span> 7:00am - 8pm
          </p>
          <p>
            <span>Sun:</span> 7:00am - 2pm
          </p>
        </li>
      </ul>
      <div className="copyright">
        <p>
          <span>GreenCar</span> Autocare © All Rights Reserved - 2022 -{" "}
          <span>Purchase</span>
        </p>
      </div>
    </footer>
  );
}
