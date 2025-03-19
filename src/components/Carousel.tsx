"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Image from 'next/image';
import './styles/style.css';
// import '../styles/style.css';


const MultipleSlideCarousel: React.FC = () => {
    return (
        <div className="w-11/12 relative mt-10 mx-auto">
            <Swiper
                spaceBetween={30}
                slidesPerView={1}
                breakpoints={{
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 30,
                    },
                    1024: {
                        slidesPerView: 3,
                        spaceBetween: 30,
                    },
                }}
                navigation={{
                    prevEl: '.custom-swiper-navigation .swiper-button-prev',
                    nextEl: '.custom-swiper-navigation .swiper-button-next',
                }}
                pagination={{ clickable: true }}
                loop={true}
                modules={[Navigation, Pagination]}
                className="multiple-slide-carousel"
            >
                {[1, 2, 3, 4, 5, 6].map((item, index) => (
                    <SwiperSlide key={index}>
                        <div className="rounded-2xl flex justify-center items-center">
                            <Image
                                src={`/images/facilities/facility-0${(index % 3) + 1}.png`}
                                alt={`facility-${(index % 3) + 1}`}
                                width={375}
                                height={433}
                                className="rounded-2xl w-full h-auto"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="custom-swiper-navigation">
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
            </div>
        </div>
    );
}

export default MultipleSlideCarousel;
