import React from "react";
import {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Avatar = ({ logout }) => {

  const [name, setName] = useState("");

  const [initials, setInitials] = useState("");

  useEffect(() => {
    setTimeout(function () {
      const saved = localStorage.getItem("dataUser");
      const initialValue = JSON.parse(saved) || { nombre: "", apellido: "" };
      setInitials(
        `${initialValue.nombre.charAt(0)}${initialValue.apellido.charAt(0)}` ||
          ""
      );
      setName(`${initialValue.nombre} ${initialValue.apellido}` || "");
    }, 50);
  }, [localStorage.getItem("dataUser")]);

  let navigate = useNavigate();
  const closeSesion = () => {
    logout();
    navigate("/");
  };

  // const user = localStorage.getItem("dataUser");
  // console.log(user);


  return (
    <>
      <div className="perfil-container">
        <div className="user-avatar">
          <h2 className="initials">{initials.toUpperCase()}</h2>
        </div>

        <div className="user-info">
          <p className="saludo">Hola, </p>

          <p className="username"> {name}</p>
        </div>

        <p id="closeApp" onClick={closeSesion}>X</p>
      </div>
    </>
  );
}

export default Avatar;
