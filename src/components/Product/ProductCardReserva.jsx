import React from "react";
import "./productCardReserva.css";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import favorite from "./../../img/favorite.svg";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import moment from "moment";
//import Rate from "rc-rate";

function ProductCardReserva({ item, openModalMap, fechaInicial, fechaFinal, horaCheckIn }) {
  const navigate = useNavigate();

  const handleVerMas = () => {
    navigate(`/producto/${item.id}`);
  };

  const getDescriptionScore = () => {
    if (item.puntaje <= 2) {
      return "Malo";
    } else if (item.puntaje <= 4) {
      return "Regular";
    } else if (item.puntaje <= 6) {
      return "Bueno";
    } else if (item.puntaje <= 8) {
      return "Muy bueno";
    } else {
      return "Excelente";
    }
  };

  const handleClickMap = () => {
    openModalMap(item);
  };
  return (
    <div className="container-card">
      <div className="product-card-img">
        <div className="favorite-icon">
          <img className="favorite-icon-img" src={favorite} alt="like" />
        </div>
        <img
          className="product-card-img-hotel"
          src={item.imagenPrincipalUrl}
          alt={item.titulo}
        />
      </div>

      <div className="product-card-right">
        <div className="detail-card">
          <div className="product-title-container">
            <div className="categoria-stars">
              {/* <h4 className="font-bold text-sm ">{item.categoria.titulo.toUpperCase()}</h4>
              <Rate
                allowHalf
                disabled={true}
                allowClear={false}
                value={item.puntaje /2}
              /> */}
            </div>
            <h2 className="h-title font-bold ">{item.titulo}</h2>
          </div>

          <div className="product-rating-container">
            <div className="rating-nro">
              <p>{item.puntaje}</p>
            </div>
            <p className="rating-description">{getDescriptionScore()}</p>
          </div>
        </div>

        <div className="product-localization-reserva">
          <div className="icon-localization">
            {" "}
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </div>
          <div className="localization-detail">
            <p>
              {item.ubicacion.descripcion}
              <br />{" "}
              <span className="span-mostrar-mapa" onClick={handleClickMap}>
                MOSTRAR EN EL MAPA{" "}
              </span>
            </p>
          </div>
        </div>
        <div className="icons-detail">
          {item.caracteristicas.map((item, index) => {
            return (
              <img
                className="icon-detail text-secondary"
                key={index}
                src={item.urlIcono}
                alt={item.nombre}
              />
            );
          })}
        </div>
        <div className="description-vermas">
          {console.log(moment(fechaInicial).format("DD-MM-YYYY"))}
          <div className="flex mt-4 reserva-card-checkin">
            <h3 className="font-bold text-primary">Check-in: </h3>
            <p className=" ml-4 font-bold text-secondary">{moment(fechaInicial).format("DD-MM-YYYY")}</p>
          </div>
          <div className="flex">
            <h3 className="font-bold text-primary">Check-out: </h3>
            <p className=" ml-4 font-bold text-secondary">{moment(fechaFinal).format("DD-MM-YYYY")}</p>
          </div>
          <div className="flex mt-2">
            <p className="font-bold  text-secondary ">Tu habitación estará lista a las {horaCheckIn}</p>
     
          </div>
          <button className="btn-vermas" onClick={handleVerMas}>
            Ver alojamiento
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCardReserva;
