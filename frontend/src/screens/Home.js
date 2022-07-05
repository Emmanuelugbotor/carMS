import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import { Helmet } from "react-helmet";

import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";

import Footer from "../components/Footer";
import DryCleaning from "../components/DryCleaning";
import Offers from "../components/Offers";
import Testimonial from "../components/Testimonial";
import Message from "../components/Message";
import SideNav from "../components/SideNav";
import bg from "../assets/images/rug.jpg";
import lastBg from "../assets/images/4.jpg";

export default function Home() {
  const [active, setActive] = useState(false);
  function handleToggle() {
    setActive(!active);
  }
  const [position, setPosition] = useState(0);
  useEffect(() => {
    window.addEventListener("scroll", () => {
      setPosition(window.scrollY);
    });
  }, []);

  return (
    <div>
      <Helmet>
        <link type="text/css" rel="stylesheet" href="/css/home.css" />
      </Helmet>
      <SideNav status={active} handleRemove={handleToggle} />
      <Header handleToggle={handleToggle} active={active} position={position} />
      <section className="modernEquipment">
        <div className="top">
          <div className="left">
            <h3>
              {" "}
              <span className="design"></span> MODERN EQUIPMENT
            </h3>
            <h2>Professional washing and cleaning of your car</h2>
            <p>
              Phasellus in arcu dapibus, lobortis est in, suscipit diam. Vivamus
              faucibus faucibus eros et porttitor. Sed est nulla, tincidunt ac
              ex eget, dictum mollis tortor. Vivamus faucibus nec ipsum id
              aliquam lobortis est.
            </p>
            <h4>
              Call for book: <span> 08153217377</span>
            </h4>
            <button className="btn black">
              <span className="text">Read More</span>
            </button>
          </div>
          <div className="right">
            <img src="/images/washer.png" alt="" width={1600} height={710} />
          </div>
        </div>
        <div className="bottom">
          <ul>
            <li>
              <div className="image">
                <img src="/images/modern.png" alt="topless" />
              </div>

              <h1>Extensive Washing</h1>
              <p>
                Vestibulum tortor risus, rutrum at congue sed ultricies finibus.
              </p>
            </li>
            <li>
              <div className="image">
                <img src="/images/use.png" alt="topless" />
              </div>

              <h1>Safety Materials</h1>
              <p>
                Vestibulum tortor risus, rutrum at congue sed ultricies finibus.
              </p>
            </li>
            <li>
              <div className="image">
                <img src="/images/spray_1.png" alt="topless" />
              </div>

              <h1>Modern Equipment</h1>
              <p>
                Fusce maximus molestie nisl, ut dapibus libero vestibulum
                aliquam
              </p>
            </li>
            <li>
              <div className="image">
                <img src="/images/stalling.webp" alt="topless" />
              </div>

              <h1>Intensive Cleaning</h1>
              <p>
                Sestibulum non dolor sit amet mi moles tincidunt vel non velit.
              </p>
            </li>
          </ul>
        </div>
      </section>
      <Offers />
      <section className="price">
        <h1>WASHING PRICE</h1>
        <h2>Choose Your Plan</h2>
        <p>
          Sed non dapibus dolor, non rhoncus dui. Ut eleifend justo at ipsum
          aliquam, vel cursus tellus pulvinar. Nulla vel tempus diam. Nunc
          vulputate, quam sit amet commodo tincidunt, enim lorem scelerisque
          massa, vel ultricies
        </p>
        <div className="car_gallery"></div>
        <div className="price_categories">
          <ul>
            <li>
              <h1 className="heading">Express Washing</h1>
              <h2 className="price">
                $12<sup>.99</sup>
              </h2>
              <ul>
                <li>
                  <DoneIcon /> Exterior Washing
                </li>
                <li>
                  <CloseIcon />
                  Vacuum cleaning
                </li>
                <li>
                  <CloseIcon />
                  Interior Wet Cleaning
                </li>
                <li>
                  <CloseIcon />
                  Window Wiping
                </li>
              </ul>
              <button className="btn black">
                <span>Get Plan</span>
              </button>
            </li>
            <li>
              <h1 className="heading">Basic Cleaning</h1>
              <h2 className="price">
                $12<sup>.99</sup>
              </h2>
              <ul>
                <li>
                  <DoneIcon /> Exterior Washing
                </li>
                <li>
                  <DoneIcon />
                  Vacuum cleaning
                </li>
                <li>
                  <CloseIcon />
                  Interior Wet Cleaning
                </li>
                <li>
                  <CloseIcon />
                  Window Wiping
                </li>
              </ul>
              <button className="btn black">
                <span>Get Plan</span>
              </button>
            </li>
            <li>
              <h1 className="heading">Premium Services</h1>
              <h2 className="price">
                $12<sup>.99</sup>
              </h2>
              <ul>
                <li>
                  <DoneIcon /> Exterior Washing
                </li>
                <li>
                  <DoneIcon />
                  Vacuum cleaning
                </li>
                <li>
                  <DoneIcon />
                  Interior Wet Cleaning
                </li>
                <li>
                  <CloseIcon />
                  Window Wiping
                </li>
              </ul>
              <button className="btn black">
                <span>Get Plan</span>
              </button>
            </li>
            <li
              style={{
                background: `linear-gradient(to right, rgba(0,0,0,.3), rgba(0,0,0,.3)),url(${lastBg})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
              }}
            >
              <h1 className="heading">Full Complex</h1>
              <h2 className="price">
                $12<sup>.99</sup>
              </h2>
              <ul>
                <ul>
                  <li>
                    <DoneIcon /> Exterior Washing
                  </li>
                  <li>
                    <DoneIcon />
                    Vacuum cleaning
                  </li>
                  <li>
                    <DoneIcon />
                    Interior Wet Cleaning
                  </li>
                  <li>
                    <DoneIcon />
                    Window Wiping
                  </li>
                </ul>
              </ul>
              <button className="btn ">
                <span>Get Plan</span>
              </button>
            </li>
          </ul>
        </div>
      </section>
      <DryCleaning />
      <section className="locations">
        <div className="first">
          <img src="/images/wash-machine.png" alt="" />
        </div>
        <div className="middle">
          <h2>
            <span className="design"></span> Location
          </h2>
          <h1>Car Washing and Care Points</h1>
          <ul>
            <li>
              <div className="right">
                <LocationOnIcon />
              </div>
              <div className="left">
                <h3>Car Washing Point</h3>
                <p>1154 Spar Supermarket, Calabar City, MO 1054 </p>
              </div>
            </li>
            <li>
              <div className="right">
                <LocationOnIcon />
              </div>
              <div className="left">
                <h3>Car Washing Point</h3>
                <p>1154 Spar Supermarket, Calabar City, MO 1054 </p>
              </div>
            </li>
            <li>
              <div className="right">
                <LocationOnIcon />
              </div>
              <div className="left">
                <h3>Car Washing Point</h3>
                <p>1154 Spar Supermarket, Calabar City, MO 1054 </p>
              </div>
            </li>
            <li>
              <div className="right">
                <LocationOnIcon />
              </div>
              <div className="left">
                <h3>Car Washing Point</h3>
                <p>1154 Spar Supermarket, Calabar City, MO 1054 </p>
              </div>
            </li>
          </ul>
        </div>
        <div
          className="last"
          style={{
            background: `url(${bg})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
           
          }}
        >
          <div className="form_wrapper">
            <h1>
              Apply for a <span>Car Wash</span>{" "}
            </h1>
            <form action="">
              <input type="text" placeholder="name" />
              <input type="text" name="" id="" placeholder="phone number" />
              <button className="btn">
                <span>Send Request</span>
              </button>
            </form>
          </div>
        </div>
      </section>
      <Testimonial />
      <Message />
      <Footer />
    </div>
  );
}
