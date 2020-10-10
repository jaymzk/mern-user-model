import React, { useState, useContext, useEffect } from "react";
import DatePicker from "react-datepicker"
import AppointmentContext from "../../context/appointment/appointmentContext";
import AlertContext from "../../context/alert/alertContext";
import 'react-datepicker/dist/react-datepicker.css'

const AppointmentForm = () => {
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const appointmentContext = useContext(AppointmentContext);

  const {
    addAppointment,
    updateAppointment,
    clearCurrentAppointment,
    current,
  } = appointmentContext;

  useEffect(() => {
    if (current !== null) {
      setAppointment(current);
    } else {
      setAppointment({
        date: Date.now(),
        startTime: Date.now(),
        endTime: Date.now()+1800000,
        room: 0,
        notes: "",
        available: false,
      });
    }
  }, [appointmentContext, current]);

  const [appointment, setAppointment] = useState({
    date: "",
    startTime: "",
    endTime: "",
    room: 0,
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

  const onRoomChange = (e)=> {
    console.log(e.target.value)
    setAppointment({...appointment, room: e.target.value})
    console.log(appointment)

  }

  const onDateSelect = (date) => {
    setAppointment({ ...appointment, date: date});
    console.log(appointment.date)
  };

  const setStartTime = (time)=> {
    setAppointment({...appointment, startTime:time})
  }
  const setEndTime = (time)=> {
    setAppointment({...appointment, endTime:time})
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (current === null) {
      if (date === ""){ setAlert("Please enter a date", "danger");}
      if (startTime === ""){ setAlert("Please enter a start time", "danger");}
      if (endTime === ""){ setAlert("Please enter an end time", "danger");}
      if (room === "") { setAlert("Please enter a room", "danger");}
      else { 
        addAppointment(appointment);
      } 
    
    } else {
      updateAppointment(appointment);
    }
    clearAll();
  };

  const clearAll = () => {
    clearCurrentAppointment();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>
        {current ? "Edit Appointment" : "Add Appointment"}
      </h2>
       
      <input
        type='text'
        placeholder='Reference'
        name='date'
        //value={"Reference"}
        onChange={onChange}
      />
      
     
     <DatePicker
      dateFormat="dd/MM/yyyy"
      selected={date ? date : Date.now()}
      onChange={onDateSelect}
    />
     <DatePicker
      selected={startTime ? startTime : Date.now()}
      onChange={time => setStartTime(time)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={5}
      timeCaption="Time"
      dateFormat="h:mm aa"
    />
      <DatePicker
      selected={endTime ? endTime : Date.now() + 1800000}
      onChange={time => setEndTime(time)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={5}
      timeCaption="Time"
      dateFormat="h:mm aa"
    />
      <input
        type='number'
        placeholder='Room'
        name='room'
        value={room}
        onChange={onRoomChange}
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
