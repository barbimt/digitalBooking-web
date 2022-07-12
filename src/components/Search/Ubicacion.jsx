import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./Styles/search.css";
import logoLocalizacion from "./../../img/VectorLocalization.svg";

function Ubicacion({ handleChangeCitySelected, citySelected}) {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    console.log("citySelected ubicacion", citySelected);
    fetchCities()
  }, []);


  const handleChange = (e) => {
    console.log({e})
    handleChangeCitySelected(e);
  };
  
  const fetchCities = async () => {
    const response = await fetch("http://localhost:8080/ciudades");
    const data = await response.json();
    const newArrayWithValues = data.map((item) => {
      return {
        id: item.id,
        value: item.nombre + item.provincia + ", " + item.pais,
        nombre: item.nombre,
        pais: item.pais,
        provincia : item.provincia
      };
    })
    console.log(newArrayWithValues)
    setCities(newArrayWithValues);
  };

  const customStyles = {
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
    placeholder: (provided, state) => ({
      ...provided,
      marginLeft: "25px",
    
    })
  };

  return (
    <>{console.log(citySelected)}
      <div className="select-component">
        <Select
          styles={customStyles}
          className="UbicacionComponent"
          placeholder="¿A dónde vamos?"
          value={citySelected === 1 ? "" : citySelected.value}
          options={cities}
          onChange={handleChange}
          getOptionLabel={(e) => (
            <div className="optionLabel">
              <img
                src={logoLocalizacion}
                alt="logo-localizacion"
                className="logo-localizacion"
              />

              <div className="city-input">
                <span style={{ marginLeft: 5 }}>{e.nombre},</span>
                <span className="pais" style={{ marginLeft: 5 }}>
                 {e.pais}
                </span>
              </div>
            </div>
          )}
        />
        {citySelected !== 1 ? (
          <></>
        ) : (
          <img
            className="logoLocalizacion"
            src={logoLocalizacion}
            alt="logoLocalizacion"
          />
        )}
      </div>
    </>
  );
}

export default Ubicacion;
