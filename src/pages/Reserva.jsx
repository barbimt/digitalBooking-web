import React from "react";
import HeaderReserva from "../components/Header-Reserva/HeaderReserva";
import axios from "axios";
import ReservationSummary from "../components/Reserva-HotelDetail/ReservationSummary";
import CalendarReservation from "../components/CalendarReservation/CalendarReservation";
import PoliticList from "../components/Politic/PoliticList";
import Arrive from "../components/Arrive/Arrive";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { productInitial } from "../constant/objectInitial";
import { useState } from "react";
import Form from "../components/FormUsuario/Form";
import "./styles/reserva.css";
import Swal from "sweetalert2";
import swal from "sweetalert";
import moment from "moment";

function Reserva() {
  const [product, setProduct] = useState(productInitial);
  const [startDateChange, setStartDateChange] = useState(null);
  const [endDateChange, setEndDateChange] = useState(null);
  const [isFormValid, setIsFormValid] = useState(true);
  const [formValues, setFormValues] = useState({
    name: "",
    lastName: "",
    email: "",
    city: "",
  });
  const [checkIn, setCheckIn] = useState(null);
  const [reservas, setReservas] = useState(null);

  const regex = {
    usuerRegex: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nameValidRegex: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    lastnameRegex: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    cityRegex: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/, // Letras y espacios, pueden llevar acentos.
    passwordRegex: /^.{4,12}$/, // 4 a 12 digitos.
    emailRegex: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  };

  const { id } = useParams();

  const getReservas = (id) => {
    var config = {
      method: "get",
      url: `https://vast-tor-50736.herokuapp.com/reservas/productos/${id}`,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")),
      },
    };
    axios(config).then((response) => {
      setReservas(response.data);
    });
  };

  useEffect(() => {
    axios.get("https://vast-tor-50736.herokuapp.com/productos/" + id).then((response) => {
      setProduct(response.data);
      getReservas(response.data.id);
    });
    window.scrollTo(0, 0);
  }, []);

  const onDatesChange = (startDate, endDate) => {
    setStartDateChange(startDate);
    setEndDateChange(endDate);
  };

  const createReserva = () => {
    const idUser = JSON.parse(localStorage.getItem("dataUser")).id;
    const data = JSON.stringify({
      horaReserva: checkIn,
      fechaInicial: moment(startDateChange).format("YYYY-MM-DD"),
      fechaFinal: moment(endDateChange).format("YYYY-MM-DD"),
      producto: { id: product.id },
      usuario: { id: idUser },
    });
    var config = {
      method: "post",
      url: "https://vast-tor-50736.herokuapp.com/reservas",
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")),
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        putUserCity()
        routeChange();
      })
      .catch(function (error) {
        showModalReservaErrorStatus()
        console.log(error);
      });
  };

  const putUserCity = () => {
    const data = JSON.parse(localStorage.getItem("dataUser"))
    data.ciudad = formValues.city
    var config = {
      method: "put",
      url: "https://vast-tor-50736.herokuapp.com/usuarios",
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")),
        "Content-Type": "application/json",
      },
      data: data,
    }
    axios(config)
      .then(function (response) {
  
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  const validateForm = () => {
    const nameValid = regex.nameValidRegex.test(formValues.name);
    const lastNameValid = regex.lastnameRegex.test(formValues.lastName);
    const cityValid = regex.cityRegex.test(formValues.city);
    const emailValid = regex.emailRegex.test(formValues.email);
    const result = nameValid && lastNameValid && cityValid && emailValid;
    return result;
  };

  const onCheckInChange = (checkIn) => {
    if (checkIn !== null) {
      setCheckIn(checkIn.label);
    } else {
      setCheckIn(null);
    }
  };

  const onFormValuesChange = (formData) => {
    setFormValues(formData);
  };

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/success`;
    navigate(path);
  };

  const handleReservationSubmit = () => {
    let missingFieldsMessage = "";
    if (!validateForm()) {
      setIsFormValid(false);
      missingFieldsMessage =
        missingFieldsMessage + "<li>Revise los datos del formulario.</li>";
    }

    if (checkIn === null) {
      missingFieldsMessage =
        missingFieldsMessage + "<li>Seleccione un horario de llegada.</li>";
    }

    if (startDateChange == null && endDateChange == null) {
      missingFieldsMessage =
        missingFieldsMessage +
        "<li>Seleccione fecha de check-in y check-out.</li>";
    }

    if (missingFieldsMessage.length > 0) {
      Swal.fire({
        title: "<h4> No se puede realizar la reserva </h4>",
        icon: "error",
        html: `<ul>
      <li>${missingFieldsMessage}</li></ul>`,
        showCloseButton: true,

        focusConfirm: false,

        confirmButtonColor: "#f0572d",
      });
    } else {
      createReserva();
    }
  };

  const showModalReservaErrorStatus = () => {
    swal(
      "Lamentablemente la reserva no ha podido realizarse. Por favor intente más tarde",
      {
        icon: "error",
        buttons: false,
        timer: 3000,
      }
    );
  };

  return (
    <main>
      <HeaderReserva product={product} />
      <div className="grid  grid-flow-col grid-container-reservation gap-9 bg-fourth">
        <div className="col-span-2 bg-fourth pt-9 w-[88%] container-form-tablet">
          <Form
            onFormValuesChange={onFormValuesChange}
            isFormValid={isFormValid}
          />
        </div>
        <div className="col-span-2 bg-fourth w-[88%] container-calendar-r">
          <CalendarReservation
            reservas={reservas}
            product={product}
            onDatesChange={onDatesChange}
          />
        </div>
        <div className="col-span-2 bg-fourth ">
          <Arrive onCheckInChange={onCheckInChange} />
        </div>
        <div className="row-span-3 bg-fourth pt-[82px] container-reservation-summary">
          <ReservationSummary
            product={product}
            startDate={startDateChange}
            endDate={endDateChange}
            handleReservationSubmit={handleReservationSubmit}
          />
        </div>
      </div>

      <PoliticList product={product} />
    </main>
  );
}

export default Reserva;
