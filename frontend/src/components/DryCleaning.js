import React, { useEffect, useState } from 'react'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper.min.css';
import 'swiper/modules/free-mode/free-mode.min.css';
import 'swiper/modules/navigation/navigation.scss';
import 'swiper/modules/thumbs/thumbs.min.css';
import SwiperCore, { EffectFade, Navigation, Pagination } from "swiper";
SwiperCore.use({ Navigation })
export default function DryCleaning() {
    const leftArr = React.useRef(null)
    const rightArr = React.useRef(null);

    const [position, setPosition] = useState(50);
    const [opaque, setOpaque] = useState(0.5);
    const [transparent, setTransparent] = useState(0.5);
    const [position1, setPosition1] = useState(50);
    const [opaque1, setOpaque1] = useState(0.5);
    const [transparent1, setTransparent1] = useState(0.5);
    const [position2, setPosition2] = useState(50);
    const [opaque2, setOpaque2] = useState(0.5);
    const [transparent2, setTransparent2] = useState(0.5);
    const [position3, setPosition3] = useState(50);
    const [opaque3, setOpaque3] = useState(0.5);
    const [transparent3, setTransparent3] = useState(0.5);
    useEffect(() => {
        if (position) {
            let res = (parseFloat(position) * 1) / 100
            setOpaque(res);
            setTransparent((1 - res))
        }
        if (position2) {
            let res = (parseFloat(position2) * 1) / 100
            setOpaque2(res);
            setTransparent2((1 - res))
        }
        if (position3) {
            let res = (parseFloat(position3) * 1) / 100
            setOpaque3(res);
            setTransparent3((1 - res))
        }
        if (position1) {
            let res = (parseFloat(position1) * 1) / 100
            setOpaque1(res);
            setTransparent1((1 - res))
        }
    }, [position, position1, position2, position3])
    return (
        <>
            <section className="dry_cleaning" >
                <div className="wrapper">
                    <Swiper
                        spaceBetween={10}
                        onBeforeInit={(swiper) => {
                            swiper.params.navigation.prevEl = leftArr.current
                            swiper.params.navigation.nextEl = rightArr.current
                        }}
                        navigation={{
                            prevEl: leftArr.current,
                            nextEl: rightArr.current
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        mousewheel={false}
                        allowTouchMove={false}
                        modules={[Navigation, Pagination]}
                        className="mySwiper"
                    >

                        <SwiperSlide>
                            <div className="top">
                                <div className="left">
                                    <h1> <span className='design'></span> DRY CLEANING</h1>
                                    <h2>Dry cleaning any dirt inside the car and trunk</h2>
                                    <button className='btn'>
                                        <span>
                                            Read More
                                        </span>

                                    </button>
                                </div>
                                <div className="right">
                                    <span className="one" style={{ "--str": opaque }}>Before</span>
                                    <div className="before">
                                        <img src="/images/Before_01.jpg" alt="before" />
                                    </div>
                                    <div className="after" style={{ "--str": `${position}%` }}>
                                        <img src="/images/After_01.jpg" alt="after" />
                                    </div>
                                    <input type="range" name="" id="" onChange={(e) => setPosition(e.target.value)} />
                                    <div className="handle" style={{ "--str": `${position}%` }}></div>
                                    <span className="two" style={{ "--str": transparent }}>After</span>

                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>

                            <div className="top">
                                <div className="left">
                                    <h1> <span className='design'></span> DRY CLEANING</h1>
                                    <h2>Stain removal and upholstery restoration</h2>
                                    <button className='btn'>
                                        <span>Read More</span>
                                    </button>

                                </div>
                                <div className="right">
                                    <span className="one" style={{ "--str": opaque1 }}>Before</span>
                                    <div className="before">
                                        <img src="/images/Before_02.jpg" alt="before" />
                                    </div>
                                    <div className="after" style={{ "--str": `${position1}%` }}>
                                        <img src="/images/After_02.jpg" alt="after" />
                                    </div>
                                    <input type="range" name="" id="" onChange={(e) => setPosition1(e.target.value)} />
                                    <div className="handle" style={{ "--str": `${position1}%` }}></div>
                                    <span className="two" style={{ "--str": transparent1 }}>After</span>
                                </div>
                            </div>


                        </SwiperSlide>
                        <SwiperSlide>

                            <div className="top">
                                <div className="left">
                                    <h1> <span className='design'></span> DRY CLEANING</h1>
                                    <h2>Deep interior cleaning after flooding</h2>
                                    <button className='btn'>
                                        <span>Read More</span>
                                    </button>

                                </div>
                                <div className="right">
                                    <span className="one" style={{ "--str": opaque2 }}>Before</span>
                                    <div className="before">
                                        <img src="/images/Before_03.jpg" alt="before" />
                                    </div>
                                    <div className="after" style={{ "--str": `${position2}%` }}>
                                        <img src="/images/After_03.jpg" alt="after" />
                                    </div>
                                    <input type="range" name="" id="" onChange={(e) => setPosition2(e.target.value)} />
                                    <div className="handle" style={{ "--str": `${position2}%` }}></div>
                                    <span className="two" style={{ "--str": transparent2 }}>After</span>
                                </div>
                            </div>

                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="top">
                                <div className="left">
                                    <h1> <span className='design'></span> DRY CLEANING</h1>
                                    <h2>Trunk and pile rug car cleaning service</h2>
                                    <button className='btn'>
                                        <span>Read More</span>
                                    </button>

                                </div>
                                <div className="right">
                                    <span className="one" style={{ "--str": opaque3 }}>Before</span>
                                    <div className="before">
                                        <img src="/images/Before_04.jpg" alt="before" />
                                    </div>
                                    <div className="after" style={{ "--str": `${position3}%` }}>
                                        <img src="/images/After_04.jpg" alt="after" />
                                    </div>
                                    <input type="range" name="" id="" onChange={(e) => setPosition3(e.target.value)} />
                                    <div className="handle" style={{ "--str": `${position3}%` }}></div>
                                    <span className="two" style={{ "--str": transparent3 }}>After</span>
                                </div>
                            </div>
                        </SwiperSlide>
                        <div className="indicator">
                            <span ref={leftArr}>
                                <KeyboardArrowLeftIcon />
                            </span>
                            <span ref={rightArr}><KeyboardArrowRightIcon /></span>
                        </div>
                    </Swiper>
                </div>





                <div className="bottom">
                    <ul>
                        <li>
                            <div className="left">
                                <img src="/images/services_1.jpg" alt="bleach_detergent" />
                            </div>
                            <div className="right">
                                <h2>
                                    Natural Cleaners
                                </h2>
                                <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
                            </div>

                        </li>
                        <li>
                            <div className="left">
                                <img src="/images/bleach-detergent.webp" alt="bleach_detergent" />
                            </div>
                            <div className="right">
                                <h2>
                                    Heightened care
                                </h2>
                                <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
                            </div>

                        </li>
                        <li>
                            <div className="left">
                                <img src="/images/bleach-detergent.webp" alt="bleach_detergent" />
                            </div>
                            <div className="right">
                                <h2>
                                    Aromatization
                                </h2>
                                <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.</p>
                            </div>

                        </li>
                    </ul>
                </div>
            </section>
        </>
    )
}
