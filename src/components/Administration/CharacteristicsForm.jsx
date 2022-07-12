import React from "react";
import { useState } from "react";
import "./Styles/characteristicsForm.css";
import moreIcon from "./../../img/moreIcon.svg";
import closeIcon from "./../../img/closeCharacteristics.svg";
import Select from "react-select";
import { useEffect } from "react";
import swal from "sweetalert";
function CharacteristicsForm({
  addCharacteristic,
  removeCharacteristic,
  index = 0,
  characteristic,
}) {
  const [characteristicName, setCharacteristicName] = useState("");
  const [icon, setIcon] = useState(undefined);
  const [characteristicNameValid, setCharacteristicNameValid] = useState(true);
  const [iconValid, setIconValid] = useState(true);
  const [characteristicCreated, setCharacteristicCreated] = useState(false);

  useEffect(() => {
    if (characteristic) {
      setCharacteristicName(characteristic.nombre);
      setIcon(characteristic.icono);
      setCharacteristicCreated(true);
    }
  });

  const handleOnChangeSelectIcon = (e) => {
    setIcon(e.urlIcono);
  };
  const showModalCharacteristicEmpty = () => {
    swal("Tienes que agregar información", {
      icon: "error",
      buttons: false,
      timer: 3000,
    });
  };
  const handleOnClickCharacteristics = () => {
    if (characteristicName == "" || icon == "") {
      showModalCharacteristicEmpty();
      setCharacteristicNameValid(false);
    } else {
      if (characteristicCreated) {
        removeCharacteristic({
          nombre: characteristicName,
          icono: icon,
          index: index,
        });
      } else {
        addCharacteristic({
          nombre: characteristicName,
          icono: icon,
          index: index,
        });
        setCharacteristicName("");
        setIcon("");
      }
    }
  };

  const icons = [
    {
      value: "mascotas",
      label: (
        <img
          src="https://bucket-imagenes-grupo2-0821-integrador.s3.amazonaws.com/icons/pet.svg"
          alt=""
          height="25px"
          width="25px"
        />
      ),
      urlIcono:
        "https://bucket-imagenes-grupo2-0821-integrador.s3.amazonaws.com/icons/pet.svg",
    },
    {
      value: "Televisor",
      label: (
        <img
          src="https://bucket-imagenes-grupo2-0821-integrador.s3.amazonaws.com/icons/tv.svg"
          alt=""
          height="25px"
          width="25px"
        />
      ),
      urlIcono:
        "https://bucket-imagenes-grupo2-0821-integrador.s3.amazonaws.com/icons/tv.svg",
    },
    {
      value: "Cocina",
      label: (
        <img
          src="https://bucket-imagenes-grupo2-0821-integrador.s3.amazonaws.com/icons/kitchen.svg"
          alt=""
          height="25px"
          width="25px"
        />
      ),
      urlIcono:
        "https://bucket-imagenes-grupo2-0821-integrador.s3.amazonaws.com/icons/kitchen.svg",
    },
    {
      value: "Wifi",
      label: (
        <img
          src="https://bucket-imagenes-grupo2-0821-integrador.s3.amazonaws.com/icons/wifi.svg"
          alt=""
          height="25px"
          width="25px"
        />
      ),
      urlIcono:
        "https://bucket-imagenes-grupo2-0821-integrador.s3.amazonaws.com/icons/wifi.svg",
    },
    {
      value: "Pileta",
      label: (
        <img
          src="https://bucket-imagenes-grupo2-0821-integrador.s3.amazonaws.com/icons/nadador.svg"
          alt=""
          height="25px"
          width="25px"
        />
      ),
      urlIcono:
        "https://bucket-imagenes-grupo2-0821-integrador.s3.amazonaws.com/icons/nadador.svg",
    },
    {
      value: "Estacionamiento",
      label: (
        <img
          src="https://bucket-imagenes-grupo2-0821-integrador.s3.amazonaws.com/icons/car.svg"
          alt=""
          height="25px"
          width="25px"
        />
      ),
      urlIcono:
        "https://bucket-imagenes-grupo2-0821-integrador.s3.amazonaws.com/icons/car.svg",
    },
    {
      value: "AireAcondicionado",
      label: (
        <img
          src="https://bucket-imagenes-grupo2-0821-integrador.s3.amazonaws.com/icons/air.svg"
          alt=""
          height="25px"
          width="25px"
        />
      ),
      urlIcono:
        "https://bucket-imagenes-grupo2-0821-integrador.s3.amazonaws.com/icons/air.svg",
    },
  ];

  const customStylesSelectsIcons = {
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? "rgba(240, 87, 45, 0.2);" : "#fff",
      // borderBottom: "1px solid #31363F",
      padding: 10,
      // fontSize: 14,
      fontWeight: "500",
      ":hover": {
        backgroundColor: "#DFE4EA",
      },

    }),
    control: (provided, state) => ({
      ...provided,
      width: "100%",
      // marginBottom: window.innerWidth > 468 ? "3rem" : "1.438rem",
      height: "40px",
      boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.15)",
      ":hover": {
        borderColor: "#31363F",
      },
      isSelected: {
        borderColor: "#31363F",
      },
      backgroundColor: characteristicCreated ? "#F3FAF7" : "#ffff"
    }),
    container: (provided, state) => ({
      ...provided,
      width: window.innerWidth > 992 ? "70%" : "100%",
      // width:  window.innerWidth > 992 ? "70%" : "95%",
      paddingRight: "0px",
      marginRight: "0px",
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: "#f0572d",
      ":hover": {
        color: "#f0572d",
      },
    }),
    placeholder: (provided, state) => ({
      ...provided,
      marginLeft: "0px",
    }),
    clearIndicator: (provided, state) => ({
      ...provided,
      color: "#31363F",
    }),
  };

  const cleanErrors = (e) => {
    e.preventDefault();
    if (e.target.id == "characteristicName") {
      setCharacteristicNameValid(true);
    }
  };

  return (
    <>
      <div className="w-full flex justify-center container-form-characteristic-mobile items-center">
        <div className="name--characteristicsForm">
          <label htmlFor="characteristicName" className="label-characteristic">
            Nombre
          </label>
          <input
            type="text"
            name="characteristicName"
            id="characteristicName"
            className={
              
                 "input-form--characteristic input "
               
            }
            disabled={characteristicCreated}
            value={characteristicName}
            onFocus={cleanErrors}
            onChange={(e) => {
              setCharacteristicName(e.target.value);
            }}
          />
        </div>
        <div className="icon--characteristicsForm ">
          <label htmlFor="icon" className="label-characteristic">
            Ícono
          </label>
          <Select
          isDisabled={characteristicCreated}
            styles={customStylesSelectsIcons}
            options={icons}
            //defaultValue={{ label: "", value: 1 }}
            placeholder="Selecciona un ícono"
            theme={(theme) => ({
              ...theme,
              colors: {
                ...theme.colors,
                primary: "#31363F",
              },
            })}
           // isClearable={false}
            onChange={(e) => {
              handleOnChangeSelectIcon(e);
            }}
            value={ icon && {label:  <img
              src={icon}
              alt=""
              height="25px"
              width="25px"
            />}  
             
            }
          />
        </div>
      </div>
      <div>
        <div
          className="btn-add-characteristic"
          onClick={handleOnClickCharacteristics}
        >
          <img src={characteristicCreated ? closeIcon : moreIcon} alt="" />
        </div>
      </div>
    </>
  );
}

export default CharacteristicsForm;
