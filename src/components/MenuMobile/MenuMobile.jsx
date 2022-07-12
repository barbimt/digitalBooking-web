import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import "./menuMobile.css";
import AvatarMobile from "./AvatarMobile";
import iconsFooter from "./../../img/icons-footer-mobile.svg";

function MenuMobile({ closeMenu, isLogged, logout }) {
  const [isLogginPage, setIsLogginPage] = useState(false);
  const [isRegisterPage, setIsRegisterPage] = useState(false);
  const [isUserLogged, setIsUserLogged] = useState(false);

  const location = useLocation();

  useEffect(() => {
    setIsUserLogged(isLogged || false);

    if (location.pathname === "/login") {
      setIsLogginPage(true);
      setIsRegisterPage(false);
    } else if (location.pathname === "/registro") {
      setIsRegisterPage(true);
      setIsLogginPage(false);
    }
  }, [location.pathname]);

  const dataUser = JSON.parse(localStorage.getItem("dataUser")) || {
    rol: { id: 0 },
  };
  const dataUserRolId = dataUser.rol.id || 0;
  console.log(dataUserRolId);

  return (
    <div className="container-mobile">
      {isLogged ? (
        <AvatarMobile closeMenu={closeMenu} />
      ) : (
        <div className="container-mobile-title">
          <p className="mobile-closeApp" onClick={closeMenu}>
            X
          </p>
          <h2 className="mobile-title">MENÚ</h2>
        </div>
      )}

      {dataUserRolId == 2 && (
        <Link to="/administracion">
          <p onClick={closeMenu} className=" text-base font-bold text-right mt-5 mr-3">Administración</p>
        </Link>
      )}
       {dataUserRolId !== 0 && (
         <Link to="/reservas">
          <p onClick={closeMenu} className=" text-base font-bold text-right mt-5 mr-3">Mis reservas</p>
        </Link>
       )}
       

      <div className="container-mobile-redireccion">
        {isLogged && (
          <div className="mobile-cerrar-sesion">
            <span className="mobile-cerrarSesion-span">
              ¿Deseas{" "}
              <Link
                to={"/"}
                onClick={logout}
                className="link-mobile-cerrarSesion"
              >
                Cerrar Sesión
              </Link>
              ?
            </span>
          </div>
        )}

        {!isRegisterPage && !isUserLogged && (
          <Link to="/registro" className="crearCuenta" onClick={closeMenu}>
            {" "}
            Crear Cuenta
          </Link>
        )}

        {!isLogginPage && !isUserLogged && (
          <Link to="/login" className="login" onClick={closeMenu}>
            {" "}
            Iniciar Sesión
          </Link>
        )}
      </div>

      <div className="icons-footer-mobile">
        <img className="icon-footer-mobile" src={iconsFooter} alt="" />
      </div>
    </div>
  );
}

export default MenuMobile;
