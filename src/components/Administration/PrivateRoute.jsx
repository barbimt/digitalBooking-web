import React from "react";
import CreateProduct from "../../pages/CreateProduct";
import Home from "../../pages/Home";

function PrivateRoute() {
  const dataUser = JSON.parse(localStorage.getItem("dataUser")) || {
    rol: { id: 1 },
  };
  console.log(dataUser);
  if (dataUser.rol.id !== 2) {
    return <Home />;
  } else {
    return <CreateProduct />;
  }
}

export default PrivateRoute;
