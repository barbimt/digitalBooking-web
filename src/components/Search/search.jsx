import React, { useState } from "react";
import { DateRangePicker } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "./Styles/calenderStyle.css";
import Ubicacion from "./Ubicacion.jsx";
import "./Styles/search.css";
import calendar from "./../../img/calendar.svg";
import moment from "moment";
import "moment/locale/es";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Search = ({
  handleCitySelected,
  cleanCityFilterProducts,
  citySelected,
  handleDatesChange,
  setCitySelected,
}) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState(null);
  const [citySelectedLocal, setCitySelectedLocal] = useState(null);


  moment.locale("es");
  const handleChangeCitySelected = (city) => {
    setCitySelectedLocal(city);
    setCitySelected(city.id);
  };
  const handleSearchClick = () => {
    handleCitySelected(citySelectedLocal);
  };

  const handleCleanFilters = () => {
    cleanCityFilterProducts()
    setStartDate(null)
    setEndDate(null)
    setCitySelectedLocal(null)
    setCitySelected(1)
  }

  const isDayBlocked  = (day) => {
    moment(day).isBefore(moment())
  }
  return (
    <section className="search-container">
      <div className="title-container-search">
        <h1 className="title-h1-search">
          Busca ofertas en hoteles, casas y mucho más
        </h1>
      </div>

      <div className="functionalities-container">
        {/* {<Ubicacion handleCitySelected={handleCitySelected}/>} */}
        <Ubicacion
          handleChangeCitySelected={handleChangeCitySelected}
          citySelected={citySelected}
        />

        <div className="calendar-container">
          <DateRangePicker
            monthFormat="MMMM"
            displayFormat={"D MMM"}
            numberOfMonths={window.innerWidth > 450 ? 2 : 1}
            startDatePlaceholderText="Check in - "
            endDatePlaceholderText="Check out"
            startDate={startDate}
            startDateId="your_unique_start_date_id"
            endDate={endDate}
            endDateId="your_unique_end_date_id"
            onDatesChange={({ startDate, endDate }) => {
              setStartDate(startDate);
              setEndDate(endDate);
              handleDatesChange(startDate, endDate);
            }}
            focusedInput={focusedInput}
            onFocusChange={(focusedInput) => {
              setFocusedInput(focusedInput);
            }}
            isDayBlocked={isDayBlocked}
          />
          <img className="calendar-icon" src={calendar} alt="calendar-icon" />
        </div>

        <button onClick={handleSearchClick} className="buttonSearch">
          Buscar
        </button>
        <div className="container-btn-x" onClick={handleCleanFilters}>
          <FontAwesomeIcon className="faX-btn-search" icon={faX} />
        </div>
      </div>
    </section>
  );
};
export default Search;
