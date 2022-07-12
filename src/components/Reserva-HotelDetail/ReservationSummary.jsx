import React from "react";
import RatingScore from "../RatingStars/RatingStars";
import iconUbicacion from "./../../img/localizador.svg";
import "./reservationSummary.css";

function ReservationSummary({ product, startDate, endDate, handleReservationSubmit }) {
  
  return (
    <div className="container-RS ">
            {window.innerWidth > 468 ? (
          <h1 className="title-reservationSummary">Detalle de la reserva</h1>
      ) : (
        <h2 className="title-reservationSummary-mobile">Detalle de la reserva</h2>
      )}
  
      <div className="container-reservationSummary">
        <div className="img-reservationSummary">
          <img src={product.imagenPrincipalUrl} alt="" />
        </div>
        <div className="container-detail-RS">
          <h4 className="category-title-RS">{product.categoria.titulo}</h4>
          <h1 className="product-title-RS">{product.titulo}</h1>
          <RatingScore puntaje={product.puntaje} />
          <div className="ubicacion-RS">
            <img src={iconUbicacion} alt="iconUbicacion" />
            <p>
              {product.ubicacion.direccion}, {product.ciudad.provincia},{" "}
              {product.ciudad.nombre}, {product.ciudad.pais}
            </p>
          </div>
          <div className=" bg-fourth h-0.5 "></div>
          <div className="flex justify-between mt-5 mb-6 container--checkin-checkout ">
            <h3 className="checkin-text">Check in</h3>
            {
              startDate ? <p>{startDate.format("DD/MM/YYYY")}</p> : <p>__/__/____</p>
            }
            
           
          </div>
          <div className=" bg-fourth h-0.5"></div>
          <div className="flex justify-between mt-5 mb-6 container--checkin-checkout">
            <h3 className="checkout-text">Check out</h3>
            {
              endDate ? <p>{endDate.format("DD/MM/YYYY")}</p> : <p>__/__/____</p>
            }
          </div>
          <div className=" bg-fourth h-0.5"></div>
          <div className="flex justify-center pb-5 container--button-RS">
            <button onClick={handleReservationSubmit} className="button-RS text-center">Confirmar reserva</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReservationSummary;
