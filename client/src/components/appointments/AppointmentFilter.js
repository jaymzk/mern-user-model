import React, { useContext, useRef, useEffect, useState } from "react";
import AppointmentContext from "../../context/appointment/appointmentContext";
import DatePicker from "react-datepicker"

import 'react-datepicker/dist/react-datepicker.css'

const AppointmentFilter = () => {
  const appointmentContext = useContext(AppointmentContext);
  const text = useRef("");

  const {
    filterAppointments,
    filterByDate,
    getAppointmentsByDate,
    clearFilterAppointments,
    filtered,
  } = appointmentContext;

  let [date, setDate] = useState(Date.now())

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = (e) => {
    if (text.current.value !== "") {
      filterAppointments(e.target.value);
    } else {
      clearFilterAppointments();
    }
  };

const onDateFilterChange =(date)=> {
  setDate(date)
  
  getAppointmentsByDate(date)
}

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Appointments by Reference....'
        onChange={onChange}
      />
       <DatePicker
      dateFormat="dd/MM/yyyy"
      selected={date}
      onChange={onDateFilterChange}
    />

    </form>
  );
};

export default AppointmentFilter;
