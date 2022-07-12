import React from "react";
import Select from "react-select";
import { useState, useEffect } from "react";
import "./Styles/createProductForm.css";
import axios from "axios";

function CreateProductForm({onFormValuesChange}) {
  const [accomodationName, setAccomodationName] = useState("");
  const [address, setAddress] = useState("");
  const [longitud, setLongitud] = useState(null);
  const [latitud, setLatitud] = useState(null);
  const [categorySelected, setCategorySelected] = useState("");
  const [descripcion, setDescripcion]= useState("");
  const [categories, setCategories] = useState([]);
  const [cities, setCities] = useState([]);
  const [formProduct, setFormProduct] = useState({
    titulo: '',
    direccion: '',
    categoria: {
      id: 0,
      titulo: '',
      descripcion: '',
      urlImagen: ''
    },
    ciudad: {
      id: 0
    },
    latitud: '',
    longitud: '',
    descripcion_card: ''
  })
  
  useEffect(() => {
    fetchCategories();
    fetchCities();
  }, []);

  const fetchCategories = () => {
    var config = {
      method: "get",
      url: "https://vast-tor-50736.herokuapp.com/categorias",
    };
    axios(config).then((response) => {
      const arrayCategories = response.data.map((item) => {
        return {
          value: item.id,
          label: item.titulo,
          descripcion: item.descripcion,
          urlImagen: item.urlImagen
        };
      });
      setCategories(arrayCategories);
      console.log(arrayCategories);
    });
  };

  const fetchCities = () => {
    var config = {
      method: "get",
      url: "https://vast-tor-50736.herokuapp.com/ciudades",
    };
    axios(config).then((response) => {
      const arrayCities = response.data.map((item) => {
        return {
          value: item.id,
          label: item.nombre + ", " + item.provincia,
        };
      });
      setCities(arrayCities);
      console.log(arrayCities);
    });
  };

  const customStylesSelects = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "rgba(240, 87, 45, 0.2);" : "#fff",
      borderBottom: "1px solid #F0572D",
      padding: 10,
      fontSize: 14,
      color: "#191b1d",
      fontWeight: "500",
      ":hover": {
        backgroundColor: "#DFE4EA",
      },
    }),
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      marginBottom:  window.innerWidth > 468 ? "3rem": "1.438rem",
      height: "40px",
      boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.15)",
      ":hover": {
        borderColor: "#F0572D",
      },
      isSelected: {
        borderColor: "#F0572D",
      },
    }),
    container: (provided, state) => ({
      ...provided,
      width: window.innerWidth > 468 ? "100%" : "95%",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "#F0572D",
      ":hover": {
        color: "#F0572D",
      },
    }),
    placeholder: (provided, state) => ({
      ...provided,
      marginLeft: "0px",
    }),
    clearIndicator: (provided, state) => ({
      ...provided,
      color: "#F0572D",
    }),
  };

  const handleNameInput=(e) => {
    setAccomodationName(e.target.value);
    setFormProduct({...formProduct, titulo: e.target.value})
    onFormValuesChange(formProduct)
  }

  const handleDireccionInput=(e) => {
    setAddress(e.target.value);
    setFormProduct({...formProduct, direccion: e.target.value})
    onFormValuesChange(formProduct)
  }

  const handleCategoriaInput= (e) => {
    setFormProduct({...formProduct, categoria: {
      id: e.value,
      titulo: e.label,
      descripcion: e.descripcion,
      urlImagen: e.urlImagen
    }})

    onFormValuesChange(formProduct)
  }

  const handleCityInput=(e) => {
    setFormProduct({...formProduct, ciudad: {
      id: e.value
    }})
    onFormValuesChange(formProduct)
  }

  const handleLatitudInput=(e) => {
    setLatitud(e.target.value);
    setFormProduct({...formProduct, latitud: e.target.value})
    onFormValuesChange(formProduct)
  }

  const handleLongitudInput=(e) => {
    setLongitud(e.target.value);
    setFormProduct({...formProduct, longitud: e.target.value})
    onFormValuesChange(formProduct)
  }

  const handleDescripcionInput=(e) => {
    setDescripcion(e.target.value);
    setFormProduct({...formProduct, descripcion_card: e.target.value})
    onFormValuesChange({...formProduct, descripcion_card: e.target.value})
    console.log(e.target.value, "descripcion from createProduct")
  }

  return (
    <>
      <div className="container-createProduct--form">
        <div className="form-createProduct">
          <div className="container-input-text-createProduct">
            <form>
              <label
                htmlFor="titulo"
                className="label-form--user-createProduct"
              >
                Nombre de la propiedad
              </label>
              <input
                type="text"
                name="titulo"
                id="titulo"
                className={
              
                    "input-form--createProduct input"
              
                }
                onChange={(e) => {
                  handleNameInput(e)
                }}
                value={accomodationName}

              />

              <label
                htmlFor="direccion"
                className="label-form--user-createProduct"
              >
                Dirección
              </label>
              <input
                type="text"
                name="direccion"
                id="direccion"
                className={
            
                    "input-form--createProduct input"
        
                }
                value={address}
                onChange={(e) => {
                  handleDireccionInput(e)
                }}
              />

              <label
                htmlFor="address"
                className="label-form--user-createProduct"
              >
                Latitud
              </label>
              <input
                type="text"
                name="latitud"
                id="latitud"
                className={
     
                    "input-form--createProduct input"
                
                }
                value={latitud}
                onChange={(e) => {
                  handleLatitudInput(e);
                }}
              />
            </form>
          </div>

          <div className="container-input-select-createProduct">
            <label htmlFor="categoria" className="label-form--user-createProduct">
              Categoría
            </label>
            <Select
              styles={customStylesSelects}
              options={categories}
              // defaultValue={{ label: "Hoteles", value: 1 }}
              placeholder="Selecciona una categoría"
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: "#F0572D",
                },
              })}
           
            onChange={handleCategoriaInput}

            />

            <label htmlFor="address" className="label-form--user-createProduct">
              Ciudad
            </label>
            <Select
              styles={customStylesSelects}
              options={cities}
              placeholder="Selecciona una ciudad"
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: "#F0572D",
                },
              })}
             
              onChange={(e) => {handleCityInput(e)}}
            />

            <label
              htmlFor="longitud"
              className="label-form--user-createProduct "
            >
              Longitud
            </label>
            <input
              type="text"
              name="longitud"
              id="longitud"
              className={
          
                   "input-form--createProduct input input-longitud" 
                
              }
              value={longitud}
              onChange={(e) => {
                handleLongitudInput(e);
              }}
            />
          </div>
        </div>
        <div className="container-text-area-description">
          <label
            htmlFor="description"
            className="label-form--user-createProduct"
          >
            Descripción
          </label>
          <textarea
            name="descripcion_card"
            id="descripcion_card"
            cols="30"
            rows="10"
            className="text-area-description"
            onChange={(e) => {
              handleDescripcionInput(e)
            }}
          ></textarea>
        </div>
      </div>
    </>
  );
}

export default CreateProductForm;
