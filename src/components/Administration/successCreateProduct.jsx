import React from "react";
import { Link } from "react-router-dom";
import success from "./../../img/success.svg";
import "./../Success-reserva/success.css";
import "animate.css"


function SuccessCreateProduct() {
  return (
    <>
    <section className="success-container  ">
      <div className="success-container-div animate__animated animate__jackInTheBox ">
     
        <img src={success} alt="success" /> 
        {window.innerWidth > 468 ? (
                 <h2 className="subtitle-success">Su propiedad se ha creado con éxito</h2>
      ) : (
        <h3 className="subtitle-success-mobile">Su propiedad se ha creado con éxito</h3>
      )}
  
        <Link to="/home" >
        <button className="success-btn">OK</button>
        </Link>
      </div>
    </section>
    </>
  );
}

export default SuccessCreateProduct;
