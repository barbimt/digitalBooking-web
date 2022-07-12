import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "./login.css";
import swal from "sweetalert";
import error from "./../../img/error.svg";
import axios from "axios";

const Login = ({ login }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailEmpty, setEmailEmpty] = useState(false);
  const [passwordEmpty, setPasswordEmpty] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passToText, setPassToText] = useState("password");
  const [showValidationError, setShowValidationError] = useState(false);
  const [loginValues, setLoginValues] = useState({
    email: "",
    clave: "",
  });

  let location = useLocation();
  let navigate = useNavigate();

  const getUserLogged = () => {
    const userEmail = JSON.parse(localStorage.getItem("userEmail"));
    var config = {
      method: "get",
      url: "https://vast-tor-50736.herokuapp.com/usuarios/user/" + userEmail,
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")),
      },
    };
    axios(config)
    .then((response) => {
      localStorage.setItem("dataUser", JSON.stringify(response.data));
      login(JSON.stringify(response.data))
    
      if (location.state != null) {
        let url = location.state.url || "/"
        navigate(url)
      }  else {
        navigate("/", { replace: true });
      }

    })
    .catch(function (error) {
      showModalLoginErrorStatus();
      console.log(error);
    });
  };

  const routeChange = () => {
    let data = JSON.stringify(loginValues);
    console.log(data);
    // localStorage.setItem(
    //   "user",
    //  JSON.stringify(loginValues)
    // );
    var config = {
      method: "post",
      url: "https://vast-tor-50736.herokuapp.com/authenticate",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log("despues del then", JSON.stringify(response.data));
        localStorage.setItem("user", JSON.stringify(response.data.jwt));
        localStorage.setItem("userEmail", JSON.stringify(loginValues.email));
        getUserLogged();
        
        
      })
      .catch(function (error) {
        showModalInvalidCredentials();
        setShowValidationError(true);
        console.log(error);
      });
  };

  const emailValid =
    loginValues.email.includes("@") &&
    loginValues.email.includes(".com") &&
    loginValues.email.length > 1;
  // const emailValidRegex = email(/^\w+([\.\+\-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/);

  const passwordValid = loginValues.clave.length > 1;

  const handleChange = (event) => {
    setLoginValues({
      ...loginValues,
      [event.target.name]: event.target.value,
    });
  };

  const showModalInvalidCredentials = () => {
    swal("Por favor vuelva a intentarlo, sus credenciales son inválidas", {
      icon: "error",
      buttons: false,
      timer: 3000,
    });
  };

  const showModalLoginErrorStatus = () => {
    swal("Lamentablemente no ha podido iniciar sesión. Por favor intente más tarde", {
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

  const handleLogin = (e) => {
    e.preventDefault();
    setEmailEmpty(loginValues.email.length == 0);
    setPasswordEmpty(loginValues.clave.length == 0);
    console.log(loginValues);
    console.log("emailValid", emailValid);
    console.log("passwordValid", passwordValid);
    if (emailValid && passwordValid) {
      routeChange();

    } else {
      showModalInvalidCredentials();
      setShowValidationError(true);
    }
  };

  const handlePasswordVisible = (e) => {
    e.preventDefault();
    setPasswordVisible(!passwordVisible);
    passwordVisible ? setPassToText("password") : setPassToText("text");
  };

  return (
    <>
      {location.state != null ? (
        location.state.comesFromReservation || false ? (
          <div className="flex flex-row  absolute error-container-login">
            <img src={error} alt="errorIcon" />
            <p>Para realizar una reserva necesitas estar logueado</p>
          </div>
        ) : (
          <></>
        )
      ) : (
        <></>
      )}
      <section className="login-container">
        <div className="form-container">
          <h1 className="form-title">Iniciar Sesión</h1>
          <form className="login-container--form">
            <label className="form-label" htmlFor="email">
              {" "}
              Correo electrónico
            </label>
            <input
              autoComplete="off"
              className={emailEmpty ? "inputRed" : "input"}
              id="email"
              type="text"
              name="email"
              value={loginValues.email}
              onChange={handleChange}
              onFocus={cleanErrors}
            />
            {emailEmpty && (
              <small className="inputRed-text">Este campo es obligatorio</small>
            )}

            <label className="form-label" htmlFor="password">
              Contraseña
            </label>
            <div className="password-container">
              <div className="password-input">
                <input
                  className={passwordEmpty ? "inputRed" : "input"}
                  id="password"
                  value={loginValues.clave}
                  onChange={handleChange}
                  type={passToText}
                  onFocus={cleanErrors}
                  name="clave"
                  required
                />
                <button
                  className={
                    passwordEmpty ? "btnEyePassword-red" : "btnEyePassword"
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
              <small className="inputRed-text">Este campo es obligatorio</small>
            )}

            <div className="form-ingresar">
              <button type="submit" onClick={handleLogin} className="btn-form">
                Ingresar
              </button>
              <p className="form-redireccion-text">
                ¿Aún no tenes cuenta?
                <Link to="/registro" className="redireccion-crearCuenta">
                  Registrate
                </Link>
              </p>
            </div>
          </form>
        </div>
      </section>
      {/* <Footer /> */}
    </>
  );
};

export default Login;
