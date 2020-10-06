import React, { useContext } from "react";
import PropTypes from "prop-types";
import AppointmentContext from "../../context/appointment/appointmentContext";

const AppointmentItem = ({ appointment }) => {
  const appointmentContext = useContext(AppointmentContext);

  const {
    deleteAppointment,
    setCurrentAppointment,
    clearCurrentAppointment,
  } = appointmentContext;

  const { _id, date, startTime, endTime, room, available, notes } = appointment;

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
          {date}
        </span>
      </h3>
      <ul className='list'>
        <li>
          <i className='far fa-calendar-alt'> {date}</i>
        </li>

        <li>
          <i className='far fa-clock'> {startTime}</i>
        </li>
        <li>
          <i className='fas fa-door-open'> {endTime}</i>
        </li>
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrentAppointment(appointment)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

AppointmentItem.propTypes = {
  appointment: PropTypes.object.isRequired,
};

export default AppointmentItem;
