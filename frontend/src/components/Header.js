import React, { useState } from 'react'
import DirectionsCarFilledIcon from '@mui/icons-material/DirectionsCarFilled';

import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper.min.css';
import 'swiper/modules/free-mode/free-mode.min.css';
import 'swiper/modules/navigation/navigation.scss';
import "swiper/modules/effect-fade/effect-fade.scss"
import 'swiper/modules/thumbs/thumbs.min.css';
import SwiperCore, { Autoplay, EffectFade, Navigation, Pagination } from "swiper";
// import Hamburger from './Hamburger';
import Nav from './Nav';

export default function Header({ handleToggle, active, position }) {


    return (
        <div className="main_header">
            <Swiper
                // spaceBetween={30}
                centeredSlides={true}
                effect={"fade"}
                navigation={true}
                // loop={true}
                speed={2000}
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
                    <header className='header'>
                        <div className="first_slide">
                            <img src="/images/SLIDE_01.jpg" alt="slide_01" />
                            <Nav handleToggle={handleToggle} status={active} position="absolute" col="#fff" bg="rgba(0,0,0,.35)" sticky={position} />
                            <div className="main_caption">
                                <h1>Modern Equipment</h1>
                                <h2>Contactless Car Wash</h2>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam amet voluptates recusandae maxime odio aperiam enim ipsum, aliquam sunt dicta.</p>
                                <div className="button_wrapper">
                                    <button className="btn red"> <span>Read More</span> </button>
                                    <button className="btn gold"> <span>Order now</span> </button>
                                </div>

                            </div>
                        </div>
                    </header>
                </SwiperSlide>
                <SwiperSlide>
                    <header className='header'>
                        <div className="first_slide">
                            <img src="/images/SLIDE_02.jpg" alt="slide_01" />
                            <Nav handleToggle={handleToggle} status={active} position="absolute" col="#fff" bg="rgba(0,0,0,.35)" sticky={position} />
                            <div className="main_caption">
                                <h1>Modern Equipment</h1>
                                <h2>Keeping Your car New</h2>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam amet voluptates recusandae maxime odio aperiam enim ipsum, aliquam sunt dicta.</p>
                                <div className="button_wrapper">
                                    <button className="btn red"> <span>Read More</span> </button>
                                    <button className="btn gold"> <span>Order now</span> </button>
                                </div>

                            </div>
                        </div>
                    </header>
                </SwiperSlide>
                <SwiperSlide>
                    <header className='header'>
                        <div className="first_slide">
                            <img src="/images/serv_04.jpg" alt="slide_01" />
                            <Nav handleToggle={handleToggle} status={active} position="absolute" col="#fff" bg="rgba(0,0,0,.35)" sticky={position} />
                            <div className="main_caption">
                                <h1>Modern Equipment</h1>
                                <h2>Care Service for your Car</h2>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam amet voluptates recusandae maxime odio aperiam enim ipsum, aliquam sunt dicta.</p>
                                <div className="button_wrapper">
                                    <button className="btn red"> <span>Read More</span> </button>
                                    <button className="btn gold"> <span>Order now</span> </button>
                                </div>

                            </div>
                        </div>
                    </header>
                </SwiperSlide>

                <SwiperSlide>
                    <header className='header'>
                        <div className="first_slide">
                            <img src="/images/SLIDE_05.jpg" alt="slide_01" />
                            <Nav handleToggle={handleToggle} status={active} position="absolute" col="#fff" bg="rgba(0,0,0,.35)" sticky={position} />
                            <div className="main_caption">
                                <h1>Modern Equipment</h1>
                                <h2>Topnotch Service For You</h2>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam amet voluptates recusandae maxime odio aperiam enim ipsum, aliquam sunt dicta.</p>
                                <div className="button_wrapper">
                                    <button className="btn red"> <span>Read More</span> </button>
                                    <button className="btn gold"> <span>Order now</span> </button>
                                </div>

                            </div>
                        </div>
                    </header>
                </SwiperSlide>
                <SwiperSlide>
                    <header className='header'>
                        <div className="first_slide">
                            <img src="/images/SLIDE_04.jpg" alt="slide_01" />
                            <Nav handleToggle={handleToggle} status={active} position="absolute" col="#fff" bg="rgba(0,0,0,.35)" sticky={position} />
                            <div className="main_caption">
                                <h1>Modern Equipment</h1>
                                <h2>Exterior and Interior Cleaning</h2>
                                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsam amet voluptates recusandae maxime odio aperiam enim ipsum, aliquam sunt dicta.</p>
                                <div className="button_wrapper">
                                    <button className="btn red"> <span>Read More</span> </button>
                                    <button className="btn gold"> <span>Order now</span> </button>
                                </div>

                            </div>
                        </div>
                    </header>
                </SwiperSlide>
            </Swiper>



        </div>

    )
}
