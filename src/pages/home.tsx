import React from "react";
// import { useCarousel } from "./../../hooks/aboutCarousel";
import "../css/home.css"
import { Navbar } from "../components/NavBar";
import { NAVBARCONFIG } from "../components/NavBarConfig";
import { NavBarItemEnum } from "../components/NavBarItem";
import { EffectCoverflow, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade';

export const Home = (): JSX.Element => {
    //const aboutImage = useCarousel()

    return (
        <>
            <div className="home">
                <Navbar
                items={NAVBARCONFIG}
                selectedItem={NavBarItemEnum.HOME}/>
            </div>
            <Swiper
                modules={[EffectCoverflow, Navigation, Pagination, Scrollbar, A11y]}
                spaceBetween={30}
                centeredSlides={true}
                slidesPerView={3}
                autoplay={{delay: 3000,}}
                loop={true}
                onSlideChange={() => console.log('slide change')}
                onSwiper={(swiper:any) => console.log(swiper)}
                navigation={{
                    prevEl: '.prev',
                    nextEl: '.next'
                }}
                pagination={{el:'.swiper-pagination', clickable: true }}
                className="swiper-controller bg-[#2e2f31]"
            >
                <div>
                    <SwiperSlide>
                        {({ isActive, isNext, isPrev }) => (
                            <div className={isActive ? "active-slider" : "none"}>
                                Image 1
                            </div>
                        )}
                    </SwiperSlide>
                    <SwiperSlide>
                        {({ isActive, isNext, isPrev }) => (
                            <div>
                                Image 2
                            </div>
                        )}
                    </SwiperSlide>
                    <SwiperSlide>
                        {({ isActive, isNext, isPrev }) => (
                            <div>
                                Image 3
                            </div>
                        )}
                    </SwiperSlide>

                    <SwiperSlide>
                        {({ isActive, isNext, isPrev }) => (
                            <div>
                                Image 4
                            </div>
                        )}
                    </SwiperSlide>
                </div>
                <div className="prev">
                    <svg xmlns="http://www.w3.org/2000/svg" width="3vw" viewBox="0 0 64 112" fill="none" className="absolute translate-y-[-12vw] translate-x-[0vw] z-10">
                        <path d="M2.6967 61.3033C-0.232233 58.3744 -0.232233 53.6256 2.6967 50.6967L50.4264 2.96699C53.3553 0.0380592 58.1041 0.0380592 61.033 2.96699C63.9619 5.89592 63.9619 10.6447 61.033 13.5736L18.6066 56L61.033 98.4264C63.9619 101.355 63.9619 106.104 61.033 109.033C58.1041 111.962 53.3553 111.962 50.4264 109.033L2.6967 61.3033ZM9 63.5H8V48.5H9V63.5Z" fill="#D9D9D9"/>
                    </svg>
                </div>
                <div className="next">
                    <svg xmlns="http://www.w3.org/2000/svg" width="3vw" viewBox="0 0 64 112" fill="none" className="absolute translate-y-[-12vw] translate-x-[74vw] z-10">
                        <path d="M61.3033 61.3033C64.2322 58.3744 64.2322 53.6256 61.3033 50.6967L13.5736 2.96699C10.6447 0.0380592 5.89592 0.0380592 2.96699 2.96699C0.0380592 5.89592 0.0380592 10.6447 2.96699 13.5736L45.3934 56L2.96699 98.4264C0.0380592 101.355 0.0380592 106.104 2.96699 109.033C5.89592 111.962 10.6447 111.962 13.5736 109.033L61.3033 61.3033ZM55 63.5H56V48.5H55V63.5Z" fill="#D9D9D9"/>
                    </svg>
                </div>
            </Swiper>
        </>

    )
}