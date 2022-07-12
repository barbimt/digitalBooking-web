import React from 'react'
import "./menuMobile.css"
import {useState} from 'react'
import { useEffect } from "react";

function AvatarMobile({closeMenu}) {
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


    // const initials = "BR";
    // const username = "Bruno Rodríguez";
  return (
    <div className="container-mobile-profile">
         <p className="mobile-closeApp" onClick={closeMenu}>
          X
        </p>
        <div className="mobile-user-avatar">
          <h2 className="mobile-initials">{initials.toUpperCase()}</h2>
        </div>

        <div className="mobile-user-info">
          <p className="mobile-saludo">Hola, </p>

          <p className="mobile-username"> {name}</p>
        </div>
      </div>
  )
}

export default AvatarMobile