import React from "react";
import { DayPickerRangeController } from "react-dates";
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import moment from "moment";
import "moment/locale/es";
import arrowprev from "./../../img/arrow-button-swiper-prev.svg";
import arrownext from "./../../img/arrow-button-swiper.svg";
import arrowprevMobile from "./../../img/prev-calendar-mobile.svg";
import arrownextMobile from "./../../img/next-calendar-mobile.svg";
import { useState } from "react";
import "./calendarReservation.css";
import { useEffect } from "react";

function CalendarReservation({ onDatesChange, reservas }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [focusedInput, setFocusedInput] = useState("startDate");
  const [blockedDays, setBlockedDays] = useState([]);
  
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
  
  const handleIsDayBlocked = (day) => {
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

  moment.locale("es");
  moment.updateLocale("es", {
    weekdaysMin: ["D", "L", "M", "M", "J", "V", "S"],
  });

  const handleOnDateChange = ({ startDate, endDate }) => { 
    console.log("handleOnDateChange", startDate)
    if (startDate == null) {
      handleStartDateChange(null);
      handleEndDateChange(null);
    } else {
      handleStartDateChange(startDate);
      handleEndDateChange(endDate);
    }
  };

  const handleStartDateChange = (date) => {
    if (handleIsDayBlocked(moment(date).format("YYYY-MM-DD"))) {
      console.log("if del handle is day blocked,", date)
      setStartDate(null);
      setEndDate(null);
      console.log("start date", startDate, "end date", endDate)
      onDatesChange(null, null);
    } else {
console.log("date", date)
      // if (startDate !== null) {
      //   console.log("startDate", startDate)
      //   setStartDate(null);
      //   onDatesChange(null, null);
      // }
      setStartDate(date);
      setEndDate(null);
      onDatesChange(date, endDate);
    }
  };
  const handleEndDateChange = (date) => {
    console.log("handleEndDateChange", date)
    if (date !== null || endDate !== null) {
      if (handleIsDayBlocked(moment(date).format("YYYY-MM-DD"))) {
      setEndDate(null);
      } else {
        setEndDate(date);
        onDatesChange(startDate, date);
      }
    }
  };

  return (
    <>
      {
        window.innerWidth > 468 ? <h1 className="title-calendar-RS">Seleccioná tu fecha de reserva</h1> :  <h2 className="title-calendar-RS-mobile">Seleccioná tu fecha de reserva</h2>
    }
     
      <div className="flex ml-[2.688rem] items-center  calendar-mobile w-[96%] calendar-tablet-reservation calendar-mobile-reservation">
        <div className=" w-full calendar-RS rounded-md">
          <DayPickerRangeController
            daySize={window.innerWidth > 992 ? 50 : 40}
            firstDayOfWeek={0}
            noBorder={true}
            openDirection="up"
            weekDayFormat="dd"
            displayFormat={"D MMM"}
            navPrev={<ButtonPrev />}
            navNext={<ButtonNext />}
            isDayBlocked={handleIsDayBlocked}
            startDateId="your_unique_start_date_id"
            endDateId="your_unique_end_date_id"
            numberOfMonths={window.innerWidth > 468 ? 2 : 1}
            monthFormat="MMMM"
            startDate={startDate}
            endDate={endDate}
            onDatesChange={(startDate, endDate) => {handleOnDateChange(startDate, endDate)}}
            focusedInput={focusedInput || "startDate"}
            onFocusChange={(focusedInput) => {
              console.log("focusedInput", focusedInput)
              setFocusedInput(focusedInput || "startDate");
            }}


            // focusedInput={focusedInput || defaultFocusedInput}
            // onFocusChange={onFocusChange}
          />
        </div>
      </div>
    </>
  );
}

const ButtonPrev = () => {
  return (
    <div>
      <img
        className={
          window.innerWidth > 992
            ? "absolute mt-5 left-0 button-prev-calendar"
            : "absolute mt-5 left-0 arrowprevMobile"
        }
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
        className={
          window.innerWidth > 992
            ? "absolute mt-5 right-0 button-next-calendar"
            : "absolute mt-5 right-0 arrownextMobile"
        }
        src={window.innerWidth > 992 ? arrownext : arrownextMobile}
        alt="arrowNext"
      />
    </div>
  );
};

export default CalendarReservation;
