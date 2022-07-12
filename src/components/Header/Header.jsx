import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import Avatar from "./Avatar";
import logo from "./../../img/logo.svg";
import logoResponsive from "./../../img/logoResponsive.svg";
import menu from "./../../img/menu.svg";
import "./header.css";

function Header({ isLogged, logout, openMenu }) {
  const [isLogginPage, setIsLogginPage] = useState(false);
  const [isRegisterPage, setIsRegisterPage] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/login") {
      setIsLogginPage(true);
      setIsRegisterPage(false);
    } else if (location.pathname === "/registro") {
      setIsRegisterPage(true);
      setIsLogginPage(false);
    } else {
      setIsLogginPage(false);
      setIsRegisterPage(false);
    }
  }, [location.pathname]);

  const dataUser = JSON.parse(localStorage.getItem("dataUser")) || {
    rol: { id: 1 },
  };
  const dataUserRolId = dataUser.rol.id || 1;

  if (!isLogged) {
    return (
      <nav className="header">
        <Link to="/home" className="container-logo">
          <img className="logo" src={logo} alt="" />
          <img className="logoResponsive" src={logoResponsive} alt="" />
          <h2 className="h2-title">Sentite como en tu hogar</h2>
        </Link>
        <div className="header-right">
          <img
            className="menuHamburguesa"
            src={menu}
            alt=""
            onClick={openMenu}
          />

          {!isLogginPage && (
            <Link to="/login" className="link-login">
              <button className="btn">Iniciar Sesión</button>
            </Link>
          )}

          {!isRegisterPage && (
            <Link to="/registro" className="link-registro">
              <button className="btn" /* id="crear" */>Crear Cuenta</button>
            </Link>
          )}
        </div>
      </nav>
    );
  } else {
    return (
      <nav className="header">
        <Link to="/home" className="container-logo">
          <img className="logo" src={logo} alt="" />
          <img className="logoResponsive" src={logoResponsive} alt="" />
          <h2 className="h2-title">Sentite como en tu hogar</h2>
        </Link>
        {/* <div className="container-reservas-avatar"> */}
     
        <div className="grid grid-cols-2 container-reservas-avatar"> 
        
                 {dataUserRolId == 2 && (
              <>
              <div className="flex items-center container-reservas-admin">
            
          
                 <div className="container-admin-reservas-header">  
                  <Link to="/reservas">
                    <p className=" text-base font-bold ">Mis reservas</p>
                  </Link>
                </div> <div className="container-admin-header">
                  <Link to="/administracion">
                    <p className=" text-base font-bold ">Administración</p>
                  </Link>
                </div>  
                 </div>
              </>
            )}
           
          {dataUserRolId !== 2 && (
            <div className="container-reservas-header">
              <Link to="/reservas">
                <p className=" text-base font-bold text-end ">Mis reservas</p>
              </Link>
            </div>
          )}

          <div className="header-right-avatar">
         
 
            <Avatar logout={logout} />
           
      
          </div>
         
        </div>      
        <img
              className="menuHamburguesa-avatar"
              src={menu}
              alt=""
              onClick={openMenu}
            />
           
      </nav>
    );
  }
}

export default Header;
