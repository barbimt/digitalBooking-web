import React from "react";
import arrowToHome from "./../img/arrowToHome.svg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./styles/reservaUser.css";
import ProductCardReserva from "../components/Product/ProductCardReserva";
import axios from "axios";
import MapModal from "./../components/Map/MapModal";
import SpinnerReserva from "./../components/Spinner/SpinnerReserva";
import error from "./../img/error.svg"

function ReservaUser() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [reservas, setReservas] = useState([]);
  const [modalMapVisible, setModalMapVisible] = useState(false);
  const [modalMapItem, setModalMapItem] = useState(null);
  const [isFetchingReservation, setIsFetchingReservation] = useState(true);

  useEffect(() => {
    setTimeout(function () {
      const saved = localStorage.getItem("dataUser");
      const initialValue = JSON.parse(saved) || { nombre: "", apellido: "" };
      setName(`${initialValue.nombre}` || "");
      setLastName(`${initialValue.apellido}` || "");
    }, 50);
    fetchReservasByUser();
  }, [localStorage.getItem("dataUser")]);

  const fetchReservasByUser = () => {
    const idUser = JSON.parse(localStorage.getItem("dataUser"));
    console.log(idUser.id);

    var config = {
      method: "get",
      url: 
      "https://d-booking-api.herokuapp.com/reservas/usuarios/" + idUser.id,
      // `https://d-booking-api.herokuapp.com/reservas/usuarios/${idUser.id}`,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")),
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };
    axios(config).then((response) => {
   
      setReservas(response.data);
      setIsFetchingReservation(false)
      console.log(response.data);
   
    })
    .catch(function (error) {
     setIsFetchingReservation(false)
 sinReserva()
      console.log(error);
    });;
    
  };

  const openModalMap = (item) => {
    setModalMapItem(item);
    setModalMapVisible(true);
    document.body.style.overflow = "hidden";
  };

  const closeModalMap = (item) => {
    setModalMapItem(item);
    setModalMapVisible(false);
    document.body.style.overflow = "unset";
  };

  return (
    <main>
      <div className="header-product-reserva">
        <div className="titles-product-reserva">
          <h4 className="title-product-h4">
            ¡Hola, {name} {lastName}!
          </h4>
          <h1 className="title-product-h1">Tus reservas</h1>
        </div>
        <div className="arrow-to-home-div">
          <Link to="/home">
            <img
              className="arrow-to-home"
              src={arrowToHome}
              alt="arrowToHome"
            />
          </Link>
        </div>
      </div>

      <section className="section-reservasUser">
        <div className="product-container-reserva ">
          {
            isFetchingReservation ? <SpinnerReserva/> : <></>
          }
        
          {
            reservas.map((item, index) => (
              <ProductCardReserva      openModalMap={openModalMap}
              key={index} item={item.producto} fechaInicial={item.fechaInicial} fechaFinal={item.fechaFinal} horaCheckIn={item.horaReserva} />
            ))
            
          }
        </div>  
        {
            reservas.length == 0 && !isFetchingReservation ?  sinReserva(): <></>
          }
        {modalMapVisible && (
          <MapModal product={modalMapItem} closeModalMap={closeModalMap} />
        )}
      </section>
    </main>
  );
}

const sinReserva = () => {
  return (
    <>
    <div className="flex flex-row  absolute error-container-reserva">
    <img src={error} alt="errorIcon" />
    <p>Aún no has efectuado ninguna reserva</p>
    
  </div>
  
  <Link to="/home" className="flex">
  <button className="btn-volverInicio">Volver al inicio</button>
  </Link>
  
  </>
  )
}

export default ReservaUser;
