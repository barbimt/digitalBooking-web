import React from "react";
import "./products.css";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import favorite from "./../../img/favorite.svg";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Rate from "rc-rate";


function ProductCard({ item, openModalMap }) {
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
  }

  const TEXT_COLLAPSE_OPTIONS = {
    collapse: false, // default state when component rendered
    collapseText: '... show more', // text to show when collapsed
    expandText: 'show less', // text to show when expanded
    minHeight: 100, // component height when closed
    maxHeight: 250, // expanded to
    textStyle: { // pass the css for the collapseText and expandText here
      color: "blue",
      fontSize: "20px"
    }
  }
const handleClickMap = () => {
  openModalMap(item);
}
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
              <h4 className="font-bold text-sm ">{item.categoria.titulo.toUpperCase()}</h4>
              <Rate
                allowHalf
                disabled={true}
                allowClear={false}
                value={item.puntaje /2}
              />
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

        <div className="product-localization">
          <div className="icon-localization">
            {" "}
            <FontAwesomeIcon icon={faMapMarkerAlt} />
          </div>
          <div className="localization-detail">
            <p>
              {item.ubicacion.descripcion}
            <br />  <span  className="span-mostrar-mapa" onClick={handleClickMap}>
                MOSTRAR EN EL MAPA{" "}
              </span>
            </p>
          </div>
        </div>
        <div className="icons-detail">
          {
            item.caracteristicas.map((item, index) => {
            return(
             <img className="icon-detail text-secondary" key={index}src={item.urlIcono} alt={item.nombre} /> 
            )
            })
          }
        </div>
        <div className="description-vermas">
          <p className=" mr-3">
            {item.descripcion_card.replace("más...", "")}{" "}
            <span style={{ color: "#F0572D", "font-weight": "bold", "cursor": "pointer"}} onClick={handleVerMas}>
              más...
            </span>
          </p>

          <button className="btn-vermas" onClick={handleVerMas}>
            ver más
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
