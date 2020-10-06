import React, { useContext, useRef, useEffect } from "react";
import AppointmentContext from "../../context/appointment/appointmentContext";

const AppointmentFilter = () => {
  const appointmentContext = useContext(AppointmentContext);
  const text = useRef("");

  const {
    filterAppointments,
    clearFilterAppointments,
    filtered,
  } = appointmentContext;

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
  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Appointments....'
        onChange={onChange}
      />
    </form>
  );
};

export default AppointmentFilter;
