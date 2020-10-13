import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import AppointmentContext from "../../context/appointment/appointmentContext";
import AuthContext from "../../context/auth/authContext"

const AppointmentItem = ({ appointment }) => {
  const appointmentContext = useContext(AppointmentContext);
  const authContext = useContext(AuthContext)

  const {
    deleteAppointment,
    setCurrentAppointment,
    clearCurrentAppointment,
  } = appointmentContext;

  const {user} = authContext

  const { _id, reference, date, startTime, endTime, room, available, notes } = appointment;


  const onDelete = () => {
    deleteAppointment(_id);
    clearCurrentAppointment();
  };

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        <span
          className={"badge " + (available ? "badge-success" : "badge-primary")}
        >

          {available ? "Available for booking" : reference ? reference : user.userName}
        </span>
      </h3>
      <div className="appointment_row">
          <i className='far fa-calendar-alt'> { date.toString().slice(8, 10) + "/" + date.toString().slice(5, 7) + "/" + date.toString().slice(0, 4)}</i>
          <i className='fas fa-door-open'> { room }</i>
     </div>
     
        <div className="appointment_row">

          <i className='far fa-clock'> { startTime.toString().slice(11, 13) + ":" + startTime.toString().slice(14, 16)}</i>
       
          <i className="fas fa-hourglass-end"> { endTime.toString().slice(11, 13) + ":" + endTime.toString().slice(14, 16)}</i>
       
          </div>
      <div className="appointment_row">
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrentAppointment(appointment)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
        </div>
    </div>
  );
};

AppointmentItem.propTypes = {
  appointment: PropTypes.object.isRequired,
};

export default AppointmentItem;
