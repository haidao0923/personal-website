import React, { useEffect, useState } from 'react';
import { Autoplay, EffectCoverflow, Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/effect-fade';

import "../css/gallery.css"

// Note that we need more than 2x *slide per view (7) = 14 entries to have smooth transition

const category_labels = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M",
                        "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]


interface GalleryProps {
  category_count: number[],
  getActiveSlideValues: () => void;
}

const Gallery: React.FC<GalleryProps> = ({category_count, getActiveSlideValues}) => {
    const [popupImage, setPopupImage] = useState('');
    const [showPopup, setShowPopup] = useState(false);

    const openPopup = (imageSrc: string) => {
      setPopupImage(imageSrc);
      setShowPopup(true);
    };

    const closePopup = () => {
      setPopupImage('');
      setShowPopup(false);
    };

    const galleryItems = category_labels.map((_, index) => (
    <div key={index} className="gallery-entry">
    <div className='category-title'>
        <h1 className='category-label'>{category_labels[index]}</h1>
        {/*<h3 className='category-name'>{category_names[index]}</h3>*/}
    </div>
    <div className={`prev prev-${index}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="3vw" viewBox="0 0 64 112" fill="none" className="arrow">
                <path d="M2.6967 61.3033C-0.232233 58.3744 -0.232233 53.6256 2.6967 50.6967L50.4264 2.96699C53.3553 0.0380592 58.1041 0.0380592 61.033 2.96699C63.9619 5.89592 63.9619 10.6447 61.033 13.5736L18.6066 56L61.033 98.4264C63.9619 101.355 63.9619 106.104 61.033 109.033C58.1041 111.962 53.3553 111.962 50.4264 109.033L2.6967 61.3033ZM9 63.5H8V48.5H9V63.5Z" fill="#D9D9D9"/>
            </svg>
    </div>
    <Swiper
    modules={[Autoplay, EffectCoverflow, Navigation, Pagination, Scrollbar, A11y]}
    spaceBetween={30}
    autoplay={false} // Changed from 3000 for testing
    loop={true}
    onSlideChange={getActiveSlideValues}
    navigation={{
        prevEl: `.prev-${index}`,
        nextEl: `.next-${index}`
    }}
    pagination={{el:'.swiper-pagination', clickable: true }}
    className="swiper-controller"
    breakpoints={{
        320: {
            slidesPerView: 1,
        },
        640: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
        1600: {
            slidesPerView: 4,
        },
        2048: {
            slidesPerView: 5,
        },
        2560: {
            slidesPerView: 6,
        },
        3200: {
            slidesPerView: 7,
        },
      }}
    >
        {Array.from({ length: category_count[index] }).map((_, slideIndex) => (
          <SwiperSlide key={slideIndex}>
            {({ isActive }) => (
              <div className={isActive ? "active-slider" : "none"} data-key={`${category_labels[index]}${slideIndex}`}>
                <div className='slide-border'>
                  <img className='gallery-image' src={require(`../images/${category_labels[index]}/${slideIndex}.png`)}
                      alt={`Image ${slideIndex}`}
                      onClick={() => {openPopup(require(`../images/${category_labels[index]}/${slideIndex}.png`)); console.log("Test")}}/>
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}
    </Swiper>
    <div className={`next next-${index}`}>
            <svg xmlns="http://www.w3.org/2000/svg" width="3vw" viewBox="0 0 64 112" fill="none" className="absolute translate-y-[-12vw] translate-x-[74vw] z-10">
                <path d="M61.3033 61.3033C64.2322 58.3744 64.2322 53.6256 61.3033 50.6967L13.5736 2.96699C10.6447 0.0380592 5.89592 0.0380592 2.96699 2.96699C0.0380592 5.89592 0.0380592 10.6447 2.96699 13.5736L45.3934 56L2.96699 98.4264C0.0380592 101.355 0.0380592 106.104 2.96699 109.033C5.89592 111.962 10.6447 111.962 13.5736 109.033L61.3033 61.3033ZM55 63.5H56V48.5H55V63.5Z" fill="#D9D9D9"/>
            </svg>
    </div>
</div>
  ));

  return (
    <>
        {galleryItems}
        {showPopup && (
        <div className="popup" onClick={closePopup}>
          <div className="popup-content">
            <img className="popup-image" src={popupImage} alt="Full Size Image" />
          </div>
        </div>
        )}
    </>);
};


export default Gallery;
