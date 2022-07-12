import React from "react";
import { Link } from "react-router-dom";
import success from "./../../img/success.svg";
import "./success.css";
import "animate.css"


function Success() {
  return (
    <>

    <section className="success-container  ">
      <div className="success-container-div animate__animated animate__jackInTheBox">
     
        <img src={success} alt="success" />
        {window.innerWidth > 468 ? (
              <h1 className="title-success">¡Muchas gracias!</h1>
      ) : (
        <h2 className="title-success-mobile">¡Muchas gracias!</h2>
      )}
        {window.innerWidth > 468 ? (
                 <h2 className="subtitle-success">Su reserva se ha realizado con éxito</h2>
      ) : (
        <h3 className="subtitle-success-mobile">Su reserva se ha realizado con éxito</h3>
      )}
  

     
        <Link to="/home" >
        <button className="success-btn">OK</button>
        </Link>
      </div>
    </section>
    </>
  );
}

export default Success;
