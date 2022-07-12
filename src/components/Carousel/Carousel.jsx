// core version + navigation, pagination modules:
// import Swiper, { Navigation, Pagination } from "swiper";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "./carousel.css";
import x from "./../../img/X.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import {Autoplay,  Pagination, Navigation, Thumbs, FreeMode } from "swiper";
import {  useState } from "react";

function Carousel({ product: { imagenesSecundarias }, exitModal }) {

  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <>
      <div className=" bg-opacity-95  justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-1 outline-none focus:outline-none bg-secondary">
        <div className="relative w-auto my-6 mx-auto max-w-3xl bg-pimary">   
        <img className="absolute top-0 right-0 z-10 mr-3 mt-2 cursor-pointer" src={x} onClick={exitModal} />
          <div className="rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none">
            <div className="relative rounded-lg  flex-auto mySwiper2">
              <Swiper
              
                navigation={
                true}
                modules={[Autoplay, Navigation, Thumbs, Pagination, FreeMode]}
                grabCursor={true}
                pagination={{
                  type: "fraction",
                }}
                thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
              >
                {imagenesSecundarias.map((image) => {
                  return (
                    <SwiperSlide className="swiper-1">
                      <img
                        className="rounded-lg object-cover img-slider"
                        src={image.urlImagen}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>

              <div className="flex mb-3.5 mx-2.5 ">
                <Swiper
                  watchSlidesProgress={true}
                  slidesPerView={4}
                  
                  spaceBetween={9}
                  className="swiper-slide-4"
                  slideToClickedSlide={true}
                  onSwiper={setThumbsSwiper}
                  freeMode={true}
                  modules={[FreeMode, Navigation, Thumbs]}
                >
                  {imagenesSecundarias.map((image) => {
                    return (
                      <SwiperSlide className="flex items-end ">
                        <img
                          
                          className="rounded-lg img-slider-thumb"
                          src={image.urlImagen}
                        />
                      </SwiperSlide>
                    );
                  })}
                </Swiper>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Carousel;
