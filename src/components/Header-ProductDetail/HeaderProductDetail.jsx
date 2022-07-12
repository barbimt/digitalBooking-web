import React from "react";
import "./headerProductDetail.css";
import arrowToHome from "./../../img/arrowToHome.svg";
import { Link } from "react-router-dom";
import iconUbicacion from "./../../img/localizador.svg";
import RatingScore from "../RatingScore/RatingScore";
import share from "./../../img/share.svg";
import favoriteLine from "./../../img/favoriteline.svg";
import { useState } from "react";
import {
  TwitterShareButton,
  TwitterIcon,
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  PinterestShareButton,
  PinterestIcon,
  TelegramShareButton,
  TelegramIcon

} from "react-share";
import "animate.css"


function HeaderProductDetail({ product: {titulo, categoria, puntaje, ciudad: {nombre, pais}}} ) {
  // console.log("product", product)
  // console.log("location", location);
  // const { title, name, location = {}, score } = product;
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
      <div className="header-product-datail">
        <div className="titles-product-detail">
          <h4 className="title-product-h4">{categoria.titulo}</h4>
          <h1 className="title-product-h1">{titulo}</h1>
        </div>
        <div className="arrow-to-home-div">
          <Link to="/home">
            <img className="arrow-to-home" src={arrowToHome} alt="arrowToHome" />
          </Link>
        </div>
      </div>
      <div className="pd-ubicacion-container">
        <div className="pd-ubicacion-location">
          <img className="pd-iconUbicacion" src={iconUbicacion} alt="iconUbicacion" />
          <div className="pd-city-country--container">
            <p className="pd-city-country">
              {nombre}, {pais}
            </p>
            <p className="pd-city-country--distance">A 940 m del centro</p>
          </div>
        </div>
        <div className="pd-score-container">
          <RatingScore score={puntaje} />
        </div>
      </div>

      <div className="pd-share-favorite-container"  onClick={()=> showModalShare ? closeShowModalShare() : openShowModalShare() }>
        <img src={share} alt="share" />

        <img src={favoriteLine} alt="favoriteLine" />
      
      </div>
      {
        showModalShare ? <>
        {/* <div className="absolute container-share-modal animate__animated animate__fadeInLeft"> */}

        <div className="absolute container-share-modal scale-in-hor-left ">
        <FacebookShareButton url={urlShare}>
        <FacebookIcon size={25}  borderRadius={50} />
        </FacebookShareButton>
        <TwitterShareButton  url={urlShare}>
        <TwitterIcon size={25} borderRadius={50} />
        </TwitterShareButton>
        <LinkedinShareButton  url={urlShare}>
        <LinkedinIcon size={25} borderRadius={50} />
        </LinkedinShareButton>
        <TelegramShareButton  url={urlShare}> 
          <TelegramIcon  size={25} borderRadius={50} />
        </TelegramShareButton>
        </div>
        </> : <></>
      }
     
    </>
  );
}



export default HeaderProductDetail;
