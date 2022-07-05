import React from "react";
import FormatQuoteIcon from "@mui/icons-material/FormatQuote";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/modules/free-mode/free-mode.min.css";
import "swiper/modules/navigation/navigation.scss";
import "swiper/modules/effect-fade/effect-fade.scss";
import "swiper/modules/thumbs/thumbs.min.css";
import testImg from "../assets/images/2.jpg";
import SwiperCore, {
  Autoplay,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper";
export default function Testimonial() {
  return (
    <section
      className="testimonial"
      style={{
        background: `linear-gradient(to right, rgba(0,0,0,.7), rgba(0,0,0,.9)),url(${testImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundAttachment: "fixed",
      }}
    >
      <h1>Testimonial</h1>
      <h2>What Our Client Say</h2>
      <Swiper
        // spaceBetween={30}
        centeredSlides={true}
        // effect={"fade"}
        navigation={true}
        // loop={true}
        // speed={2000}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="testimonial_card">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi,
              nobis ut consectetur doloremque, animi blanditiis id praesentium,
              voluptas alias cupiditate accusamus consequuntur assumenda
              expedita incidunt tenetur dolore magni? Harum, repudiandae.
            </p>
            <div className="quote_wrapper">
              <FormatQuoteIcon />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="testimonial_card">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi,
              nobis ut consectetur doloremque, animi blanditiis id praesentium,
              voluptas alias cupiditate accusamus consequuntur assumenda
              expedita incidunt tenetur dolore magni? Harum, repudiandae.
            </p>
            <div className="quote_wrapper">
              <FormatQuoteIcon />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="testimonial_card">
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi,
              nobis ut consectetur doloremque, animi blanditiis id praesentium,
              voluptas alias cupiditate accusamus consequuntur assumenda
              expedita incidunt tenetur dolore magni? Harum, repudiandae.
            </p>
            <div className="quote_wrapper">
              <FormatQuoteIcon />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </section>
  );
}
