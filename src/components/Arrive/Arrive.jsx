import React from "react";
import check from "./../../img/check-circle-outline.svg";
import "./arrive.css";
import Select from "react-select";

function Arrive({ onCheckInChange }) {
  const hours = [
    {
      value: "1",
      label: "01:00 AM",
    },
    {
      value: "2",
      label: "02:00 AM",
    },
    {
      value: "3",
      label: "03:00 AM",
    },
    {
      value: "4",
      label: "04:00 AM",
    },
    {
      value: "5",
      label: "05:00 AM",
    },
    {
      value: "6",
      label: "06:00 AM",
    },
    {
      value: "7",
      label: "07:00 AM",
    },
    {
      value: "8",
      label: "08:00 AM",
    },
    {
      value: "9",
      label: "09:00 AM",
    },
    {
      value: "10",
      label: "10:00 AM",
    },
    {
      value: "11",
      label: "11:00 AM",
    },
    {
      value: "12",
      label: "12:00 AM",
    },
    {
      value: "13",
      label: "01:00 PM",
    },
    {
      value: "14",
      label: "02:00 PM",
    },
    {
      value: "15",
      label: "03:00 PM",
    },
    {
      value: "16",
      label: "04:00 PM",
    },
    {
      value: "17",
      label: "05:00 PM",
    },
    {
      value: "18",
      label: "06:00 PM",
    },
    {
      value: "19",
      label: "07:00 PM",
    },
    {
      value: "20",
      label: "08:00 PM",
    },
    {
      value: "21",
      label: "09:00 PM",
    },
    {
      value: "22",
      label: "10:00 PM",
    },
    {
      value: "23",
      label: "11:00 PM",
    },
    {
      value: "24",
      label: "12:00 PM",
    },
  ];

  const customStylesArrive = {
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
      boxShadow: "1px 2px 5px 2px rgba(0,0,0,0.20)",
      ":hover": {
        borderColor: "#F0572D",
      },
      isSelected: {
        borderColor: "#F0572D",
      },
    }),
    container: (provided, state) => ({
      ...provided,
     width:
      window.innerWidth > 468 ? "45%" : "95%",
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

  return (
    <div className="w-[88%] container-arrive-tablet-div">
      {window.innerWidth > 468 ? (
        <h1 className="title-arrive">Tu horario de llegada</h1>
      ) : (
        <h2 className="title-arrive-mobile">Tu horario de llegada</h2>
      )}

      <div className="container-arrive">
        <div className="flex mb-3 container-arrive-tablet">
          <img className="mr-1" src={check} alt="check" />
          <p className="p-arrive">
            Tu habitación va a estar lista para el check-in entre las 10:00 AM y
            las 11:00 PM
          </p>
        </div>
        <div>
          <p className="p-hour-arrive">Indicá tu horario estimado de llegada</p>
          <div className="select-arrive">
            <Select
              onChange={onCheckInChange}
              styles={customStylesArrive}
              options={hours}
              placeholder="Seleccionar horario de llegada"
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  primary: "#F0572D",
                },
              })}
              isClearable={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Arrive;
