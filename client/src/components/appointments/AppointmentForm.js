import React, { useState, useContext, useEffect } from "react";
import AppointmentContext from "../../context/appointment/appointmentContext";
import AlertContext from "../../context/alert/alertContext";

const AppointmentForm = () => {
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const appointmentContext = useContext(AppointmentContext);

  const {
    addAppointment,
    updateAppointment,
    clearAppointment,
    current,
  } = appointmentContext;

  useEffect(() => {
    if (current !== null) {
      setAppointment(current);
    } else {
      setAppointment({
        date: "",
        startTime: "",
        endTime: "",
        room: "",
        notes: "",
        available: false,
      });
    }
  }, [appointmentContext, current]);

  const [appointment, setAppointment] = useState({
    date: "",
    startTime: "",
    endTime: "",
    room: "",
    notes: "",
    available: false,
  });

  const { date, startTime, endTime, room, notes, available } = appointment;

  const onChange = (e) =>
    setAppointment({ ...appointment, [e.target.name]: e.target.value });

  const onCheckboxChange = (e) => {
    setAppointment({
      ...appointment,
      [e.target.name]: !appointment[e.target.name],
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (current === null) {
      if (
        date === "" ||
        startTime === "" ||
        endTime === "" ||
        room === "" ||
        notes === ""
      ) {
        setAlert("Please enter all fields", "danger");
      } else {
        addAppointment(appointment);
      }
    } else {
      updateAppointment(appointment);
    }
    clearAll();
  };

  const clearAll = () => {
    clearAppointment();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? "Edit Appointment" : "Add Appointment"}
      </h2>
      <input
        type='text'
        placeholder='Date'
        name='date'
        value={date}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Start Time'
        name='startTime'
        value={startTime}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='End Time'
        name='endTime'
        value={endTime}
        onChange={onChange}
      />

      <input
        type='number'
        placeholder='Room'
        name='room'
        value={room}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Notes'
        name='notes'
        value={notes}
        onChange={onChange}
      />

      <input
        type='checkbox'
        name='available'
        value={available}
        checked={!!available}
        onChange={onCheckboxChange}
      />
      <h5>
        <label htmlFor='admin'>Available for booking?</label>
      </h5>

      <div>
        <input
          type='submit'
          value={current ? "Update Appointment" : "Add Appointment"}
          className='btn btn-primary btn-block'
          onChange={onChange}
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-light btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default AppointmentForm;
