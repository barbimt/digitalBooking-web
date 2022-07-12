import React from "react";
import { DayPickerRangeController } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import "./calendar.css";
import moment from "moment";
import "moment/locale/es";
import arrowprev from "./../../img/arrow-button-swiper-prev.svg";
import arrownext from "./../../img/arrow-button-swiper.svg";
import arrowprevMobile from "./../../img/prev-calendar-mobile.svg";
import arrownextMobile from "./../../img/next-calendar-mobile.svg";
import {useNavigate} from 'react-router-dom';
import { useEffect } from "react";
import { useState } from "react";

function Calendar({auth, product, reservas}) {

  const [blockedDays, setBlockedDays] = useState([]);

  const isDayBlocked = (day) => {
    // const reservationsDates = [
    //   "2022-06-03",
    //   "2022-06-04",
    //   "2022-06-05",
    //   "2022-06-06",
    //   "2022-06-07",
    //   "2022-06-08",
    //   "2022-06-09",
    //   "2022-06-15",
    //   "2022-06-16",
    //   "2022-06-17",
    //   "2022-06-18",
    //   "2022-06-19",
    //   "2022-06-20",
    //   "2022-07-03",
    //   "2022-07-04",
    //   "2022-07-05",
    //   "2022-07-06",
    //   "2022-07-07",
    //   "2022-07-08",
    //   "2022-07-09",
    //   "2022-07-15",
    //   "2022-07-16",
    //   "2022-07-17",
    //   "2022-07-18",
    //   "2022-07-19",
    //   "2022-07-20",
    // ];
    return (
      blockedDays.some((date) => moment(day).isSame(date)) ||
      moment(day).isBefore(moment())
    );
  };

  useEffect(() => {
    setTimeout(function () {
      let array = [];
      const reservasCopy = reservas || []
      reservasCopy.forEach((reserva) => {
        const lista = enumerateDaysBetweenDates(reserva.fechaInicial, reserva.fechaFinal)
        console.log("lista: fehca inicial", reserva.fechaInicial )
        lista.forEach((fecha) => {
          array.push(fecha)
        })
        //array.push(reserva.fechaInicial);
        //array.push(reserva.fechaFinal);
      });
      console.log(array);
      setBlockedDays(array);
    }, 50);
  }, [reservas]);

  const enumerateDaysBetweenDates = (startDate, endDate) => {
    console.log("enumareDays", startDate, endDate);
    let now = moment(startDate), dates = [];

    while (now.isSameOrBefore(endDate)) {
        dates.push(now.format('YYYY-MM-DD'));
        now.add(1, 'days');
    }
    console.log("dates", dates);
    return dates;
}; 

  moment.locale("es");
  moment.updateLocale("es", {weekdaysMin: ["D", "L", "M", "M", "J", "V", "S"]});

//navigate to reserva
  const navigate = useNavigate();

  const handleReservar = () => {
   auth ? navigate(`/producto/${product.id}/reserva`) : navigate(`/login`, {state: {comesFromReservation: true, url:`/producto/${product.id}/reserva`}});
  };
  

  return (
    <div className=" bg-fourth w-full  pb-9 justify-between relative container-mobile-calendar">
      <h1 className="text-2xl font-bold text-secondary pt-5 ml-10 mb-5 title-disponibles-tablet title-disponibles-mobile">
        Fechas disponibles
      </h1>
      <div className="flex ml-10  items-center calendar-tablet calendar-mobile ">
        <div className="w-[1000px] calendar">
          <DayPickerRangeController
            daySize={window.innerWidth > 992 ? 50 : 40}
            firstDayOfWeek={0}
            noBorder={true}
            openDirection="up"
            weekDayFormat="dd"
            displayFormat={"D MMM"}
            navPrev={<ButtonPrev />}
            navNext={<ButtonNext />}
            isDayBlocked={isDayBlocked}
            endDateId="your_unique_end_date_id"
            numberOfMonths={window.innerWidth > 468 ? 2 : 1}
            monthFormat="MMMM"
          />
        </div>
        <div className="w-[510px]  flex flex-col items-center justify-evenly container-booked ml-24 h-[149px] shadow-booked reservation-tablet reservation-mobile px-5 ">
          <h3 className="text-reservation font-bold text-lg text-secondary h3-text-mobile-calendar">Agregá tus fechas de viaje para obtener precios exactos</h3>
          <button className="buttonSearch-booked" onClick={handleReservar}>Iniciar reserva</button>
        </div>
      </div>
    </div>
  );
}

const ButtonPrev = () => {
  return (
    <div>
      <img
        className={window.innerWidth > 992 ? "absolute mt-5 left-0 button-prev-calendar" : "absolute mt-5 left-0 arrowprevMobile"}
        src={window.innerWidth > 992 ? arrowprev : arrowprevMobile}
        alt="arrowPrev"
      />
    </div>
  );
};

const ButtonNext = () => {
  return (
    <div>
      <img
        className={window.innerWidth > 992 ? "absolute mt-5 right-0 button-next-calendar" : "absolute mt-5 right-0 arrownextMobile"}
        src={window.innerWidth > 992 ? arrownext : arrownextMobile}
        alt="arrowNext"
      />
    </div>
  );
};

export default Calendar;
