import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login";
import Registro from "./components/Registro/Registro";
import ProductDetail from "./pages/ProductDetail";
import Layout from "./components/Layout/Layout";
import Reserva from "./pages/Reserva";
import Success from "./components/Success-reserva/Success";
import CreateProduct from "./pages/CreateProduct";
import SuccessCreateProduct from "./components/Administration/successCreateProduct";
import PrivateRoute from "./components/Administration/PrivateRoute";
import ReservaUser from "./pages/ReservaUser";

function App() {

  const [auth, setAuth] = useState(JSON.parse(localStorage.getItem("user")));
  const [userDataInfo, setUserDataInfo] = useState(JSON.parse(localStorage.getItem("dataUser")))

  const logout = async() => {
    localStorage.removeItem("user");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("dataUser")
    setAuth(false);
  }

  const login = (data) => {
    setAuth(true);
    setUserDataInfo(data)
  }




  return (
    <Router>
      <Layout auth={auth} logout={logout}>
        <Routes>
        <Route path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />
          <Route path="/login" element={<Login login={login}/>} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/producto/:id" element={<ProductDetail auth={auth} />} />
          <Route path="/producto/:id/reserva" element={<Reserva />} />
          <Route path="/success" element={<Success />} />
          <Route path="/successProduct" element={<SuccessCreateProduct />} />
          <Route path="/administracion" element={<PrivateRoute />} />
          <Route path="/reservas" element={<ReservaUser />} />
          <Route exact path="/*" element={<Home />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
