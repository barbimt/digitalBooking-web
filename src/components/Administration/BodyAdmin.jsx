import React from "react";
import CreateProductForm from "./CreateProductForm";
import CharacteristicsForm from "./CharacteristicsForm";
import PoliticsForm from "./PoliticsForm";
import ImagePrincipalForm from "./ImagePrincipalForm";
import ImagesForm from "./ImagesForm";
import "./Styles/bodyAdmin.css";
import { useState } from "react";
import { productInitialCreate } from "../../constant/productInitialCreate";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";


function BodyAdmin() {
  const [cancelacion, setCancelacion] = useState({
    titulo: "Política de cancelación",
    descripcion: "",
    tipo_politica: "cancelacion",
    producto_id: -1,
  });
  const [seguridad, setSeguridad] = useState({
    titulo: "Salud y seguridad",
    descripcion: "",
    tipo_politica: "seguridad",
    producto_id: -1,
  });
  const [casa, setCasa] = useState({
    titulo: "Normas de la casa",
    descripcion: "",
    tipo_politica: "casa",
    producto_id: -1,
  });
  const [formProduct, setFormProduct] = useState({
    titulo: "",
    direccion: "",
    categoria: {
      id: 0,
      titulo: "",
      descripcion: "",
      urlImagen: "",
    },
    ciudad: {
      id: 0,
    },
    latitud: "",
    longitud: "",
    descripcion_card: "",
  });
  const [imgPrincipalUrl, setImgPrincipalUrl] = useState("");
  const [politics, setPolitics] = useState({ seguridad, casa, cancelacion });
  const [descripciones, setDescripciones] = useState([]);

  const [characteristics, setCharacteristics] = useState([]);

  const [images, setImages] = useState([]);

  const onFormValuesChange = (data) => {
    setFormProduct(data);
    console.log(formProduct);
  };

  const inputsAreValid = () => {
    let missingFieldsMessage = "";
    if (
      formProduct.titulo == "" ||
      formProduct.categoria.id == 0 ||
      formProduct.ciudad.id == 0 ||
      formProduct.descripcion_card == "" ||
      formProduct.direccion == "" ||
      formProduct.latitud == "" ||
      formProduct.longitud == ""
    ) {
      missingFieldsMessage =
        missingFieldsMessage + "<li>🟠Formulario.</li>";
    }

    if (characteristics.length == 0) {
      missingFieldsMessage =
        missingFieldsMessage + "<li>🟠Atributos.</li>";
    }

    if (
      politics.seguridad.descripcion == "" ||
      politics.casa.descripcion == "" ||
      politics.cancelacion.descripcion == ""
    ) {
      missingFieldsMessage =
        missingFieldsMessage + "<li>🟠Políticas.</li>";
    }

    if (imgPrincipalUrl == "") {
      missingFieldsMessage =
        missingFieldsMessage +
        "<li>🟠Imagen principal.</li>";
    }

    if (images.length == 0) {
      missingFieldsMessage =
        missingFieldsMessage + "<li>🟠Imágenes varias.</li>";
    }
    if (missingFieldsMessage.length > 0) {
      Swal.fire({
        title: "<h4> No se puede crear el producto</h4>",
        icon: "error",
        html: `
        <p> Revise los siguientes datos: </p>
        <ul style="
        display: flex;
        flex-direction: column;
        align-content: flex-start;
        align-items: flex-start">
      <li>${missingFieldsMessage}</li></ul>`,
        showCloseButton: true,
        customClass: {
          li: 'my-li'
        },
        focusConfirm: false,

        confirmButtonColor: "#f0572d",
      });
      return false;
    } else {
      return true;
    }
  };

  //post ubicacion para id
  const createUbicacion = () => {
    const idUser = JSON.parse(localStorage.getItem("dataUser")).id;
    const data = JSON.stringify({
      descripcion: "A pocos metros del centro",
      latitud: parseFloat(formProduct.latitud),
      longitud: parseFloat(formProduct.longitud),
      direccion: formProduct.direccion,
    });
    var config = {
      method: "post",
      url: "https://vast-tor-50736.herokuapp.com/ubicaciones",
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")),
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        let ubicacionId = JSON.stringify(response.data.id);
        postProduct(ubicacionId);
      })
      .catch(function (error) {
        showModalLoginErrorStatus();
      });
  };

  const showModalLoginErrorStatus = () => {
    swal(
      "Lamentablemente el producto no ha podido crearse. Por favor intente más tarde",
      {
        icon: "error",
        buttons: false,
        timer: 3000,
      }
    );
  };

  const postProduct = (ubicacionId) => {
    console.log("postProduct", formProduct);
    const data = JSON.stringify({
      titulo: formProduct.titulo,
      imagenPrincipalUrl: imgPrincipalUrl,
      puntaje: `${Math.floor(Math.random() * (10 - 1 + 1) + 1)}`,
      descripcion_card: formProduct.descripcion_card,
      disponible: true,
      categoria: {
        id: formProduct.categoria.id,
        titulo: formProduct.categoria.titulo,
        descripcion: formProduct.categoria.descripcion,
        urlImagen: formProduct.categoria.urlImagen,
      },
      ubicacion: {
        id: ubicacionId,
      },
      ciudad: {
        id: formProduct.ciudad.id,
      },
    });
    console.log("product para post", data);
    var config = {
      method: "post",
      url: "https://vast-tor-50736.herokuapp.com/productos",
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")),
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        let productId = JSON.stringify(response.data.id);
        getDescripciones(productId);
        postCharacteristics(productId);
        postPolitics(productId);
        postImages(productId);

        console.log("producto creado: ", JSON.stringify(response.data));
        routeChange()
       
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const postImages = (productId) => {
    images.forEach((i) => {
      const data = JSON.stringify({
        titulo: i.titulo,
        urlImagen: i.urlImagen,
        producto_id: productId,
      });
      var config = {
        method: "post",
        url: "https://vast-tor-50736.herokuapp.com/imagenes",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")),
          "Content-Type": "application/json",
        },
        data: data,
      };
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify("imagen creada", response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };

  const postPoliticCancelacion = (productId) => {
    const data = JSON.stringify({
      titulo: politics.cancelacion.titulo,
      descripcion: politics.cancelacion.descripcion,
      tipo_politica: politics.cancelacion.tipo_politica,
      producto_id: productId,
    });
    var config = {
      method: "post",
      url: "https://vast-tor-50736.herokuapp.com/politicas",
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")),
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify("politica creada", response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getDescripciones = (productId) => {
    axios.get("https://vast-tor-50736.herokuapp.com/descripciones").then((response) => {
      let descpRandom =
        response.data[Math.floor(Math.random() * response.data.length)]
          .descripcion;
      let descpRandom2 =
        response.data[Math.floor(Math.random() * response.data.length)]
          .descripcion;
      let descpRandom3 =
        response.data[Math.floor(Math.random() * response.data.length)]
          .descripcion;

      let arrayDescripciones = [descpRandom, descpRandom2, descpRandom3];
      setDescripciones(arrayDescripciones);
      postDescripciones(productId, arrayDescripciones);
    });
  };

  const postDescripciones = (productId, arrayDescripciones) => {
    arrayDescripciones.forEach((d) => {
      const data = JSON.stringify({
        descripcion: d,
        producto_id: productId,
      });
      var config = {
        method: "post",
        url: "https://vast-tor-50736.herokuapp.com/descripciones",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")),
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          console.log(JSON.stringify("descripciones creada", response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };

  const postPoliticCasa = (productId) => {
    const data = JSON.stringify({
      titulo: politics.casa.titulo,
      descripcion: politics.casa.descripcion,
      tipo_politica: politics.casa.tipo_politica,
      producto_id: productId,
    });
    var config = {
      method: "post",
      url: "https://vast-tor-50736.herokuapp.com/politicas",
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")),
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify("politica creada", response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  let navigate = useNavigate();
  const routeChange = () => {
    let path = `/successProduct`;
    navigate(path);
  };

  const postPoliticSeguridad = (productId) => {
    const data = JSON.stringify({
      titulo: politics.seguridad.titulo,
      descripcion: politics.seguridad.descripcion,
      tipo_politica: politics.seguridad.tipo_politica,
      producto_id: productId,
    });
    var config = {
      method: "post",
      url: "https://vast-tor-50736.herokuapp.com/politicas",
      headers: {
        Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")),
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios(config)
      .then(function (response) {
        console.log(JSON.stringify("politica creada", response.data));
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const postPolitics = (productId) => {
    postPoliticCancelacion(productId);
    postPoliticSeguridad(productId);
    postPoliticCasa(productId);
    console.log(politics, "politicas POST");
  };

  const postCharacteristics = (productId) => {
    characteristics.forEach((c) => {
      const data = JSON.stringify({
        nombre: c.nombre,
        urlIcono: c.icono,
        producto_id: productId,
      });
      var config = {
        method: "post",
        url: "https://vast-tor-50736.herokuapp.com/caracteristicas",
        headers: {
          Authorization: "Bearer " + JSON.parse(localStorage.getItem("user")),
          "Content-Type": "application/json",
        },
        data: data,
      };
      console.log("data from postcharacterist", data);
      axios(config)
        .then(function (response) {
          console.log(JSON.stringify("caracteristica creada", response.data));
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();

    if (inputsAreValid()) {
      createUbicacion();
    }

    // createUbicacion();

    // crear ubicacion -> obtener id -> cambiar productRequestBody
    // crear producto con productRequestBody usando los valres de formProduct
    // crear politicas, imagenes y caracteristicas
  };

  const handleImgPrincipal = (e) => {
    setImgPrincipalUrl(e.target.value);
  };

  const addCharacteristic = (characteristic) => {
    let charasteristicAux = {
      ...characteristic,
      index: characteristics.length,
    };
    setCharacteristics((oldArray) => [...oldArray, charasteristicAux]);
  };

  const removeCharacteristic = (characteristic) => {
    // setCharacteristics(
    //   characteristics.filter((c) => c.index !== characteristic.index)
    // );

    // console.log(characteristics.filter((c) => c.index !== characteristic.index))
    const auxiliar = characteristics.filter(
      (c) => c.index !== characteristic.index
    );
    setCharacteristics(auxiliar);
  };

  const addImage = (image) => {
    let imageAux = {
      ...image,
      index: images.length
    }
    setImages((oldArray) => [...oldArray, imageAux]);   
  };

  const removeImage = (image) => {
    const auxiliar = images.filter(
      (c) => c.index !== image.index
    );
    setImages(auxiliar);
  };

  const onCancelacion = (c) => {
    setCancelacion(c);
    // setPolitics({...politics, ...cancelacion, cancelacion: c})
    setPolitics((prevState) => ({
      ...prevState,
      cancelacion: {
        ...prevState.cancelacion,
        descripcion: c.descripcion,
      },
    }));
  };

  const onCasa = (ca) => {
    setCasa(ca);
    setPolitics((prevState) => ({
      ...prevState,
      casa: {
        ...prevState.casa,
        descripcion: ca.descripcion,
      },
    }));
  };

  const onSeguridad = (s) => {
    setSeguridad(s);
    setPolitics((prevState) => ({
      ...prevState,
      seguridad: {
        ...prevState.seguridad,
        descripcion: s.descripcion,
      },
    }));
  };

  return (
    <>
      {window.innerWidth > 468 ? (
        <h1 className="title-createProduct">Crear propiedad</h1>
      ) : (
        <h2 className="title-createProduct">Crear propiedad</h2>
      )}

      <div className="container-createProduct">
        <CreateProductForm onFormValuesChange={onFormValuesChange} />
        <h2 className="title-characteristicsForm">Agregar atributos</h2>

        <div className="container-characteristicsForm ">
          <CharacteristicsForm
            addCharacteristic={addCharacteristic}
            removeCharacteristic={removeCharacteristic}
          />
        </div>
   
        {characteristics.map((c) => {
          return (
            <div className="container-characteristicsForm ">
              <CharacteristicsForm
                characteristic={c}
                index={c.index}
                addCharacteristic={addCharacteristic}
                removeCharacteristic={removeCharacteristic}
              />
            </div>
          );
        })}

        <h2 className="title-PoliticsForm">Políticas del producto</h2>
        <PoliticsForm
          onCancelacion={onCancelacion}
          onCasa={onCasa}
          onSeguridad={onSeguridad}
        />
        <h2 className="title-PoliticsForm">Cargar Imágenes</h2>
        <div className="container-ImageForm">
          <ImagePrincipalForm handleImgPrincipal={handleImgPrincipal} />
          <label
            htmlFor="imagenesSecundarias"
            className=" mt-5 text-sm font-medium"
          >
            Imágenes secundarias
          </label>

          <ImagesForm
                addImage={addImage}
                removeImage={removeImage}
              
              />

          {images.map((i) => {
            return (
              <ImagesForm
               image={i}
                addImage={addImage}
                removeImage={removeImage}
                index={i.index}
              />
            );
          })}
        </div>
        <div className="container-btn-createProduct">
          <button className="btn-createProduct" onClick={handleCreateProduct}>
            Crear
          </button>
        </div>
      </div>
    </>
  );
}

export default BodyAdmin;
