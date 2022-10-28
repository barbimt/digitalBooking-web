import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./register.css";
import Swal from "sweetalert2";
import axios from "axios";
import swal from "sweetalert";

function Registro() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passToText, setPassToText] = useState("password");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [showValidationError, setShowValidationError] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [registerValues, setRegisterValues] = useState({
    nombre: "",
    apellido: "",
    email: "",
    clave: "",
    ciudad: "",
    "rol": {
        "id": "1"
    }
  });

  //validacion email
  const emailValid =
    registerValues.email.includes("@") &&
    registerValues.email.includes(".com") &&
    registerValues.email.length > 13;
  // validacion pw
  const passwordValid = registerValues.clave.length > 6;

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/login`;
    navigate(path);
  };

  //sweetAlert-registroConfirmado
  const showModalRegistroConfirmado = () => {
    Swal.fire({
      title: "Registro Confirmado!",
      icon: "success",
      confirmButtonColor: "#f0572d",
    });
  };

  const handleChange = (event) => {
    setRegisterValues({
      ...registerValues,
      [event.target.name]: event.target.value,
    });
  };
  
  //handle event
  const handleRegistro = (e) => {
    e.preventDefault();
    setEmailEmpty(registerValues.email.length == 0);
    setPasswordEmpty(registerValues.clave.length == 0);

    if (emailValid && passwordValid && registerValues.clave == password2) {
      let data = JSON.stringify(registerValues);
      console.log("datastringify",JSON.stringify(registerValues))
      var config = {
        method: "post",
        url: "https://d-booking-api.herokuapp.com/usuarios",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
          showModalRegistroConfirmado();
          routeChange();
        })
        .catch(function (error) {
          showModalLoginErrorStatus();
          console.log(error);
        });

    } else {
      setEmailEmpty(true);
      setPasswordEmpty(true);
      setShowValidationError(true);
    }
  };
  const showModalLoginErrorStatus = () => {
    swal("Lamentablemente no ha podido registrarse. Por favor intente más tarde", {
      icon: "error",
      buttons: false,
      timer: 3000,
    });
  };
  const cleanErrors = (e) => {
    e.preventDefault();
    if (e.target.id == "email") {
      setEmailEmpty(false);
    } else {
      setPasswordEmpty(false);
    }
    setShowValidationError(false);
  };

  const handlePasswordVisible = (e) => {
    e.preventDefault();
    setPasswordVisible(!passwordVisible);
    passwordVisible ? setPassToText("password") : setPassToText("text");
  };

  return (
    <>
      <section className="registro-container">
        <div className="form">
          <h1 className="heading">Crear cuenta</h1>
          <form
            className="form-registro"
            action="/create-account"
            method="POST"
          >
            <div className="container-username">
              <div className="container--input-nombre">
                <label htmlFor="nombre">Nombre</label>
                <input
                  autoComplete="off"
                  type="text"
                  name="nombre"
                  id="nombre"
                  value={registerValues.nombre}
                  className="input-nombre"
                  onChange={handleChange}
                />
              </div>
              <div className="container--input-apellido">
                <label htmlFor="apellido">Apellido</label>
                <input
                  autoComplete="off"
                  type="text"
                  name="apellido"
                  id="apellido"
                  className="input-apellido"
                  onChange={handleChange}
                  value={registerValues.apellido}
                />
              </div>
            </div>
            <div className="container-correo">
              <label htmlFor="email">Correo electrónico</label>
              <input
                autoComplete="off"
                className={emailEmpty ? "inputRedRegister" : "inputRegister"}
                type="email"
                name="email"
                id="email"
                // onChange={(e) => setEmail(e.target.value)}
                // value={email}
                onChange={handleChange}
                value={registerValues.email}
                onFocus={cleanErrors}
              />{" "}
              {emailEmpty && (
                <small className="inputRed-text-register">
                  Este campo es obligatorio
                </small>
              )}
            </div>
            <div className="container-correo">
              <div className="password-container">
                <label htmlFor="password">Contraseña</label>
                <input
                  type={passToText}
                  name="clave"
                  id="password"
                  // onChange={(e) => setPassword(e.target.value)}
                  // value={password}
                  className={
                    passwordEmpty ? "inputRedRegister" : "inputRegister"
                  }
                  onFocus={cleanErrors}
                  onChange={handleChange}
                  value={registerValues.clave}
                />
                <button
                  className={
                    passwordEmpty
                      ? "btnEyePassword-redreg"
                      : "btnEyePasswordreg"
                  }
                  onClick={handlePasswordVisible}
                >
                  {passwordVisible ? (
                    <FontAwesomeIcon className="iconsEyeOpen" icon={faEye} />
                  ) : (
                    <FontAwesomeIcon
                      className="iconsEyeClose"
                      icon={faEyeSlash}
                    />
                  )}
                </button>
              </div>
            </div>
            {passwordEmpty && (
              <small className="inputRed-text-register">
                Este campo es obligatorio
              </small>
            )}

            <div className="container-correo">
              <label htmlFor="password2">Confirmar contraseña</label>
              <input
                type="password"
                name="password2"
                id="password2"
                onChange={(e) => setPassword2(e.target.value)}
                value={password2}
                //onChange={handleChange}
                //value={registerValues.clave}

                className={passwordEmpty ? "inputRedRegister" : "inputRegister"}
                onFocus={cleanErrors}
              />
              {passwordEmpty && (
                <small className="inputRed-text-register">
                  Este campo es obligatorio
                </small>
              )}
            </div>

            {/* {showValidationError && (
            <p className="invalid-credentials-message">
            Por favor vuelva a intentarlo, sus credenciales son inválidas
            </p>
          )} */}

            <div className="button-register">
              <button type="submit" className="button" onClick={handleRegistro}>
                Crear cuenta
              </button>
              <p className="redireccion">
                ¿Ya tienes una cuenta?
                <Link to="/login" className="redireccion-login">
                  Iniciar sesion
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
      {/* <Footer /> */}
    </>
  );
}
export default Registro;
