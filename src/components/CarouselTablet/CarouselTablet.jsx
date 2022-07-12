import React from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/thumbs";
import "swiper/css/free-mode";
import "./carouselTablet.css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, Thumbs, FreeMode } from "swiper";
import share from "./../../img/shareWhite.svg";
import favoriteLine from "./../../img/favoriteLineWhite.svg";
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  TelegramShareButton,
  TelegramIcon

} from "react-share";
import "animate.css"
import { useState } from "react";

function CarouselTablet({ product: { imagenesSecundarias } }) {
  const [showModalShare, setShowModalShare] = useState(false)
  const urlShare = window.location.href
  const openShowModalShare = () => {
    setShowModalShare(true)
  }
  const closeShowModalShare = () => {
    setShowModalShare(false)
  }
  
  return (
    <>
      {
        showModalShare ? <>
        {/* <div className="absolute container-share-modal animate__animated animate__fadeInLeft"> */}

        <div className="absolute container-share-modal-mobile scale-in-hor-left ">
        <FacebookShareButton url={urlShare}>
        <FacebookIcon size={20}  borderRadius={50} />
        </FacebookShareButton>
        <TwitterShareButton  url={urlShare}>
        <TwitterIcon size={20} borderRadius={50} />
        </TwitterShareButton>
        <LinkedinShareButton  url={urlShare}>
        <LinkedinIcon size={20} borderRadius={50} />
        </LinkedinShareButton>
        <TelegramShareButton  url={urlShare}> 
          <TelegramIcon  size={20} borderRadius={50} />
        </TelegramShareButton>
        </div>
        </> : <></>
      }
 
    <div className="container-carousel-tablet container-carousel-mobile">

      {window.innerWidth <= 468 ? (
        <div className="pd-share-favorite-container-mobile">
          <img className="svg-share" src={share} alt="share" onClick={()=> showModalShare ? closeShowModalShare() : openShowModalShare() } />
          <img
            clssName="svg-favorite"
            src={favoriteLine}
            alt="favoriteLine"
          />
    
        </div>
      ) : (
        <></>
      )}
      <Swiper
        autoplay={{
          delay: 3000,
        }}
        navigation={false}
        modules={[Autoplay, Navigation, Thumbs, Pagination, FreeMode]}
        pagination={{
          type: "fraction",
        }}
        loop={true}
      >
        {imagenesSecundarias.map((image) => {
          return (
            <SwiperSlide className="swiper-tablet">
              <img src={image.urlImagen} alt="" />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>  
     </>
  );
}

export default CarouselTablet;
