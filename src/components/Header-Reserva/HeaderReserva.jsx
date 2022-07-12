import React from 'react'
import "./reservaHeader.css"
import {Link} from "react-router-dom";

import arrowToHome from "./../../img/arrowToHome.svg";

function HeaderReserva({product: {titulo, categoria}}) {
  return (
    <>
    <div className="header-product-reserva">
    <div className="titles-product-reserva">
      <h4 className="title-product-h4">{categoria.titulo}</h4>
      <h1 className="title-product-h1">{titulo}</h1>
    </div>
    <div className="arrow-to-home-div">
      <Link to="/home">
        <img className="arrow-to-home" src={arrowToHome} alt="arrowToHome" />
      </Link>
    </div>
  </div>
  </>
  )
}

export default HeaderReserva