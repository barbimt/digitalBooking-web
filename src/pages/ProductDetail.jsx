import React, { useEffect, useState } from "react";
import HeaderProductDetail from "../components/Header-ProductDetail/HeaderProductDetail";
// import data from "./../data/product.json";
import { productInitial } from "../constant/objectInitial";
import Gallery from "../components/Gallery/Gallery";
import Carousel from "../components/Carousel/Carousel";
import ProductDescription from "../components/ProductDescription/ProductDescription";
import Characteristics from "../components/Characteristics/Characteristics";
import Calendar from "../components/Calendar/Calendar";
import MapView from "../components/Map/MapView";
import PoliticList from "../components/Politic/PoliticList";
import CarouselTablet from "../components/CarouselTablet/CarouselTablet";
import { useParams } from "react-router-dom";
import axios from "axios";
import SpinnerReserva from "../components/Spinner/SpinnerReserva";

function ProductDetail({ auth }) {
  const [product, setProduct] = useState(productInitial);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [reservas, setReservas] = useState(null);
  const [isFetchingProducts, setIsFetchingProducts] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, []);

  const fetchProduct = async () => {
    setIsFetchingProducts(true);
    const response = await fetch("http://localhost:8080/productos/" + id);
    const data = await response.json();
    setProduct(data);
    getReservas(data.id);
    setIsFetchingProducts(false);
  };

  const getReservas = (id) => {
    var config = {
      method: "get",
      url: `http://localhost:8080/reservas/productos/${id}`,
      // headers: {
      //   Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")),
      // },
    };
    axios(config).then((response) => {
      console.log("reservas desde PD", response.data);
      setReservas(response.data);
    });
  };

  const showModal = () => {
    setModalIsVisible(true);
    document.body.style.overflow = "hidden";
    console.log("ver mas");
  };

  const exitModal = () => {
    setModalIsVisible(false);
    document.body.style.overflow = "unset";
  };

  return (
    <main>
      <HeaderProductDetail product={product} />
      {window.innerWidth > 992 ? (
        isFetchingProducts ? (
          <SpinnerReserva />
        ) : (<Gallery product={product} showModal={showModal} />)
        
      ) : (
        <CarouselTablet product={product} />
      )}
      {modalIsVisible && <Carousel product={product} exitModal={exitModal} />}
      <ProductDescription product={product} />
      <Characteristics product={product} />
      <Calendar product={product} auth={auth} reservas={reservas} />
      <MapView product={product} />
      <PoliticList product={product} />
    </main>
  );
}

export default ProductDetail;
