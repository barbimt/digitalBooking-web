import "./body.css";
import CategoryList from "./../Category/CategoryList";
import ProductList from "./../Product/ProductList";
import Search from "../Search/search";
// import productsData from "../../data/products.json";
import { useEffect, useState } from "react";
import MyLoader from "../Category/SkeletonCategory";
import Swal from "sweetalert2";
import "animate.css";
import MapModal from "../Map/MapModal";
import "moment/locale/es";
import moment from "moment";

function Body() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isSkeleton, setIsSkeleton] = useState(true);
  const [modalMapVisible, setModalMapVisible] = useState(false);
  const [modalMapItem, setModalMapItem] = useState(null);
  const [idCategorySelected, setIdCategorySelected] = useState(0);
  const [isFetchingProducts, setIsFetchingProducts] = useState(true);
  const [citySelected, setCitySelected] = useState(1);
  const [reservationDates, setReservationDates] = useState({
    startDate: "",
    endDate: "",
  });
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    const response = await fetch("https://vast-tor-50736.herokuapp.com/productos");
    const data = await response.json();
    setProducts(data);
    setIsFetchingProducts(false);
  };

  // Products by category
  const categorySelected = async (id) => {
    setIdCategorySelected(id);
    setIsFetchingProducts(true);
    const response = await fetch(
      "https://vast-tor-50736.herokuapp.com/productos/categoria/" + id
    );
    const data = await response.json();
    setFilteredProducts(data);
    setIsFetchingProducts(false);
  };

  const fetchCategories = async () => {
    const response = await fetch("https://vast-tor-50736.herokuapp.com/categorias");
    const data = await response.json();
    setCategories(data);
    setIsSkeleton(false);
  };

  const handleCitySelected = async (city) => {
    console.log(city);
    if (
      reservationDates.startDate != "" &&
      reservationDates.endDate != "" &&
      city != null
    ) {
      setIsFetchingProducts(true);
      filterProductsByCityAndDates(city);
    } else if (city != null) {
      filterProductsByCity(city);
      setIsFetchingProducts(true);
    } else if (
      reservationDates.startDate != "" &&
      reservationDates.endDate != ""
    ) {
    
      filterProductsByDates(
        reservationDates.startDate,
        reservationDates.endDate
      );  
      setIsFetchingProducts(true);
    } else {
      Swal.fire({
        icon: "warning",
        title: "Ingrese fecha y/o ubicación",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  };

  const filterProductsByDates = async (startDate, endDate) => {
    const response = await fetch(
      "https://vast-tor-50736.herokuapp.com/productos/" + startDate + "/" + endDate
  
    );
    const data = await response.json();
    if (data.length == 0) {
      Swal.fire({
        icon: "error",
        confirmButtonColor: "#f0572d",
        title: "No encontramos resultados en su búsqueda por fechas",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    } else {
      setIsFetchingProducts(false);
      setFilteredProducts(data);
    }
  };

  const filterProductsByCityAndDates = async (city) => {
 
    setCitySelected(city.id);
    const response = await fetch(
      "https://vast-tor-50736.herokuapp.com/productos/ciudad/" + city.id + "/" + reservationDates.startDate + "/" + reservationDates.endDate
      // `https://vast-tor-50736.herokuapp.com/productos/ciudad/${city.id}/${reservationDates.startDate}/${reservationDates.endDate}`
    );
    const data = await response.json();
    if (data.length == 0) {
      setIsFetchingProducts(false)
      Swal.fire({
        icon: "error",
        confirmButtonColor: "#f0572d",
        title: "No encontramos resultados en su búsqueda",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    } else {
      setIsFetchingProducts(false)
      setFilteredProducts(data);
    }
  };

  const filterProductsByCity = async (city) => {
    setCitySelected(city.id);
    const response = await fetch(
      "https://vast-tor-50736.herokuapp.com/productos/ciudad/" + city.id
      // `https://vast-tor-50736.herokuapp.com/productos/ciudad/${city.id}`
    );
    const data = await response.json();
    if (data.length == 0) {
      setFilteredProducts([]);
      setIsFetchingProducts(false)
      Swal.fire({
        icon: "error",
        confirmButtonColor: "#f0572d",

        title: "<small> No encontramos resultados en su búsqueda por ciudad </small>",
        showClass: {
          popup: "animate__animated animate__fadeInDown",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOutUp",
        },
      });
    } else {
      setFilteredProducts(data);
      setIsFetchingProducts(false)
    }
  };

  const openModalMap = (item) => {
    setModalMapItem(item);
    setModalMapVisible(true);
    document.body.style.overflow = "hidden";
  };

  const closeModalMap = (item) => {
    setModalMapItem(item);
    setModalMapVisible(false);
    document.body.style.overflow = "unset";
  };

  const getCategorySelected = () => {
    const category = categories.find(
      (category) => category.id === idCategorySelected
    );
    return category || null;
  };

  const cleanFilterProducts = () => {
    setFilteredProducts([]);
    setIdCategorySelected(null);
  };

  const cleanCityFilterProducts = () => {
    setFilteredProducts([]);
    setCitySelected(1);
    setReservationDates({ startDate: "", endDate: "" });
  };

  // const cleanDatesFilterProducts = () => {
  //   setFilteredProducts([]);
  //   setReservationDates({ startDate: "", endDate: "" });

  // };

  const handleDatesChange = (startDate, endDate) => {
    setReservationDates({
      startDate: moment(startDate).format("YYYY-MM-DD"),
      endDate: moment(endDate).format("YYYY-MM-DD"),
    });
    console.log("startDate", startDate);
    console.log("endDate", endDate);
  };
  return (
    <>
      <main>
        <Search
          handleCitySelected={handleCitySelected}
          cleanCityFilterProducts={cleanCityFilterProducts}
          citySelected={citySelected}
          setCitySelected={setCitySelected}
          handleDatesChange={handleDatesChange}
        
        />
        {isSkeleton ? (
          <MyLoader />
        ) : (
          <CategoryList
            idCategorySelected={idCategorySelected}
            categories={categories}
            categorySelected={categorySelected}
          />
        )}

        <ProductList
          products={filteredProducts.length > 0 ? filteredProducts : products}
          openModalMap={openModalMap}
          categorySelected={getCategorySelected()}
          isLoading={isFetchingProducts}
          cleanFilterProducts={cleanFilterProducts}
        />

        {modalMapVisible && (
          <MapModal product={modalMapItem} closeModalMap={closeModalMap} />
        )}
      </main>
    </>
  );
}

export default Body;
