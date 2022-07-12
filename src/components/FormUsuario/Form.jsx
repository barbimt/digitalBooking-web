import React from "react";
import { useState } from "react";
import "./form.css";
import { useEffect } from "react";

function Form({ onFormValuesChange, isFormValid }) {
  const [name, setName] = useState(()=> {
    setTimeout(function () {
      const saved = localStorage.getItem("dataUser");
      const initialValue = JSON.parse(saved) || { nombre: "" };
      console.log(saved.nombre)
      console.log(initialValue.nombre)
      setName(`${initialValue.nombre}` || "");
    }, 50);
  });

  const [lastname, setLastName] = useState(() => {
    setTimeout(function () {
      const saved = localStorage.getItem("dataUser");
      const initialValue = JSON.parse(saved) || { apellido: "" };
      console.log(saved.apellido)
      console.log(initialValue.apellido)
      setLastName(`${initialValue.apellido}` || "");
    }, 50);
  });

  const [email, setEmail] = useState(() => {
    setTimeout(function () {
      const saved = localStorage.getItem("dataUser");
      const initialValue = JSON.parse(saved) || { email: "" };
      console.log(saved.email)
      console.log(initialValue.email)
      setEmail(`${initialValue.email}` || "");
    }, 50);
  });

  const [city, setCity] = useState("");
  const [formValues, setFormValues] = useState({
    name: "",
    lastName: "",
    email: "",
    city: "",
  });

  const [nameValid, setNameValid] = useState(true);
  const [lastNameValid, setLastNameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [cityValid, setCityValid] = useState(true);

  const regex = {
    usuerRegex: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
    nameValidRegex: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    lastnameRegex: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // Letras y espacios, pueden llevar acentos.
    cityRegex: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/, // Letras y espacios, pueden llevar acentos.
    passwordRegex: /^.{4,12}$/, // 4 a 12 digitos.
    emailRegex: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  };

  useEffect(() => {
    if (!isFormValid) {
      setNameValid(regex.nameValidRegex.test(name));
      setLastNameValid(regex.lastnameRegex.test(lastname));
      setEmailValid(regex.emailRegex.test(email));
      setCityValid(regex.cityRegex.test(city));
    }
  }, [isFormValid]);

  const handleUserForm = () => {
    onFormValuesChange({
      name: name,
      lastName: lastname,
      email: email,
      city: city,
    });
  };

  const cleanErrors = (e) => {
    e.preventDefault();
    if (e.target.id == "nombre") {
      setNameValid(true);
    } else if (e.target.id == "email") {
      setEmailValid(true);
    }else if (e.target.id == "apellido") {
      setLastNameValid(true);
    }else if(e.target.id == "city"){
      setCityValid(true);
    }
  }

  return (
    <>
    {
        window.innerWidth > 468 ?   <h1 className="title-form-user">Completá tus datos</h1> : <h2 className="title-form-user-mobile">Completá tus datos</h2>
    }
    
      <div className="container-form-div--user">
        <form className="">

          <div className="user-container--form flex justify-evenly">

          <div className="container--user-form-inputs">
            <label htmlFor="nombre" className="label-form--user">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              id="nombre"
              className={
                nameValid ? "input-form--user input-form--user-disabled" : "input-form--user-error"
              }
              onChange={(e) => {
                setName(e.target.value);
                handleUserForm();
              }}
              value={name}
              onFocus={cleanErrors}
              disabled={true}
            />
        

            <label htmlFor="email" className="label-form--user">
              Correo electrónico
            </label>
            <input
              className={
                emailValid ? "input-form--user  input-form--user-disabled" : "input-form--user-error"
              }
              autoComplete="off"
              type="email"
              name="email"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
                handleUserForm();
              }}
              value={email}
              onFocus={cleanErrors}
              disabled={true}
            />
          </div>
          <div className="flex flex-col items-end container--user-form-inputs">
            <div  className="input-lastName-city">
              <label htmlFor="apellido" className="label-form--user">
                Apellido
              </label>
              <input
                autoComplete="off"
                type="text"
                name="apellido"
                id="apellido"
                className={
                  lastNameValid ? "input-form--user  input-form--user-disabled" : "input-form--user-error"
                }
                onChange={(e) => {
                  setLastName(e.target.value);
                  handleUserForm();
                }}
                value={lastname}
                disabled={true}
                onFocus={cleanErrors}
              />
            </div>
            <div className="input-lastName-city">
              <label htmlFor="city" className="label-form--user">
                Ciudad
              </label>
              <input
                className={
                  cityValid ? "input-form--user" : "input-form--user-error"
                }
                autoComplete="off"
                type="city"
                name="city"
                id="city"
                onChange={(e) => {
                  setCity(e.target.value);
                  handleUserForm();
                }}
                value={city}
                onFocus={cleanErrors}
           
              />
              
              </div>

            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default Form;
