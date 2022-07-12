import React from 'react'
import {Link} from "react-router-dom"
import arrowToHome from "./../../img/arrowToHome.svg";
function HeaderAdmin() {
  return (
    <> 
    <div className="header-product-datail">
    <div className="titles-product-detail">
      <h1 className="title-product-h1">Administración</h1>
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

export default HeaderAdmin