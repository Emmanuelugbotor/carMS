import React from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import DoneIcon from "@mui/icons-material/Done";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import bg from "../assets/images/rug.jpg";

import { Swiper, SwiperSlide } from "swiper/react/swiper-react";
import "swiper/swiper.min.css";
import "swiper/modules/free-mode/free-mode.min.css";
import "swiper/modules/navigation/navigation.scss";
import "swiper/modules/thumbs/thumbs.min.css";
import {
  Autoplay,
  Navigation,
  Pagination,
} from "swiper";

export default function Offers() {
  const leftArr = React.useRef(null);
  const rightArr = React.useRef(null);
  return (
    <section
      className="offers"
      style={{
        background: `url(${bg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <h1>WHAT WE DO</h1>
      <h2>Premium Washing Services</h2>
      <p>
        Unfortunately not all new cars are presented to their new owner in the
        best condition due to lack of care and dealership budget to prep a new
        car.
      </p>

      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          type: "fraction",
        }}
        loop={true}
        onBeforeInit={(swiper) => {
          swiper.params.navigation.prevEl = leftArr.current;
          swiper.params.navigation.nextEl = rightArr.current;
        }}
        navigation={{
          prevEl: leftArr.current,
          nextEl: rightArr.current,
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="offers_gallery">
            <div className="image">
              <img src="/images/serv_01.jpg" alt="serv_01" />
            </div>
            <div className="content">
              <img src="/images/serv_01.jpg" alt="serv_01" />
              <div className="content_wrapper">
                <h3>Exterior Washing</h3>
                <div className="time">
                  <AccessTimeIcon className="icon" />
                  <span>30 min</span>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
                  voluptatum veniam dicta dolores placeat. Aliquam!
                </p>
                <ul>
                  <li>
                    {" "}
                    <DoneIcon className="icon" /> Seats Washing
                  </li>
                  <li>
                    {" "}
                    <DoneIcon className="icon" /> Vacuum Cleaning
                  </li>
                  <li>
                    {" "}
                    <DoneIcon className="icon" /> Interior Wet Cleaning
                  </li>
                  <li>
                    {" "}
                    <DoneIcon className="icon" /> Window Wiping
                  </li>
                </ul>
                <button className="btn black">
                  <span>Get Plan</span>
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="offers_gallery">
            <div className="image">
              <img src="/images/serv_03.jpg" alt="serv_01" />
            </div>
            <div className="content">
              <img src="/images/serv_03.jpg" alt="serv_01" />
              <div className="content_wrapper">
                <h3>Engine Services</h3>
                <div className="time">
                  <AccessTimeIcon className="icon" />
                  <span>30 min</span>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
                  voluptatum veniam dicta dolores placeat. Aliquam!
                </p>
                <ul>
                  <li>
                    {" "}
                    <DoneIcon className="icon" /> Seats Washing
                  </li>
                  <li>
                    {" "}
                    <DoneIcon className="icon" /> Vacuum Cleaning
                  </li>
                  <li>
                    {" "}
                    <DoneIcon className="icon" /> Interior Wet Cleaning
                  </li>
                  <li>
                    {" "}
                    <DoneIcon className="icon" /> Window Wiping
                  </li>
                </ul>
                <button className="btn black">
                  <span>Get Plan</span>
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="offers_gallery">
            <div className="image">
              <img src="/images/serv_02.jpg" alt="serv_01" />
            </div>
            <div className="content">
              <img src="/images/serv_02.jpg" alt="serv_01" />
              <div className="content_wrapper">
                <h3>Interior Cleaning</h3>
                <div className="time">
                  <AccessTimeIcon className="icon" />
                  <span>30 min</span>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
                  voluptatum veniam dicta dolores placeat. Aliquam!
                </p>
                <ul>
                  <li>
                    {" "}
                    <DoneIcon className="icon" /> Seats Washing
                  </li>
                  <li>
                    {" "}
                    <DoneIcon className="icon" /> Vacuum Cleaning
                  </li>
                  <li>
                    {" "}
                    <DoneIcon className="icon" /> Interior Wet Cleaning
                  </li>
                  <li>
                    {" "}
                    <DoneIcon className="icon" /> Window Wiping
                  </li>
                </ul>
                <button className="btn black">
                  <span>Get Plan</span>
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="offers_gallery">
            <div className="image">
              <img src="/images/serv_04.jpg" alt="serv_01" />
            </div>
            <div className="content">
              <img src="/images/serv_04.jpg" alt="serv_01" />
              <div className="content_wrapper">
                <h3>Diagnostic Test</h3>
                <div className="time">
                  <AccessTimeIcon className="icon" />
                  <span>30 min</span>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
                  voluptatum veniam dicta dolores placeat. Aliquam!
                </p>
                <ul>
                  <li>
                    {" "}
                    <DoneIcon className="icon" /> Seats Washing
                  </li>
                  <li>
                    {" "}
                    <DoneIcon className="icon" /> Vacuum Cleaning
                  </li>
                  <li>
                    {" "}
                    <DoneIcon className="icon" /> Interior Wet Cleaning
                  </li>
                  <li>
                    {" "}
                    <DoneIcon className="icon" /> Window Wiping
                  </li>
                </ul>
                <button className="btn black">
                  <span>Get Plan</span>
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          {" "}
          <div className="offers_gallery">
            <div className="image">
              <img src="/images/serv_05.jpg" alt="serv_01" />
            </div>
            <div className="content">
              <img src="/images/serv_05.jpg" alt="serv_01" />
              <div className="content_wrapper">
                <h3>Vacuum Cleaning</h3>
                <div className="time">
                  <AccessTimeIcon className="icon" />
                  <span>30 min</span>
                </div>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste
                  voluptatum veniam dicta dolores placeat. Aliquam!
                </p>
                <ul>
                  <li>
                    {" "}
                    <DoneIcon className="icon" /> Seats Washing
                  </li>
                  <li>
                    {" "}
                    <DoneIcon className="icon" /> Vacuum Cleaning
                  </li>
                  <li>
                    {" "}
                    <DoneIcon className="icon" /> Interior Wet Cleaning
                  </li>
                  <li>
                    {" "}
                    <DoneIcon className="icon" /> Window Wiping
                  </li>
                </ul>
                <button className="btn black">
                  <span>Get Plan</span>
                </button>
              </div>
            </div>
          </div>
        </SwiperSlide>
        <div className="indicators">
          <span ref={leftArr}>
            <KeyboardArrowLeftIcon className="icon" />
          </span>
          <span ref={rightArr}>
            <KeyboardArrowRightIcon className="icon" />
          </span>
        </div>
      </Swiper>
    </section>
  );
}
