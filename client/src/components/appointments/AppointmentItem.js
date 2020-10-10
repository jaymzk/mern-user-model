import React, { useContext } from "react";
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
          {user.userName}
        </span>
      </h3>
      <ul className='list'>
        <li>
          <i className='far fa-calendar-alt'> { date.toString().slice(8, 10) + "/" + date.toString().slice(5, 7) + "/" + date.toString().slice(0, 4)}</i>
        </li>

        <li>
          <i className='far fa-clock'> { startTime.toString().slice(11, 13) + ":" + startTime.toString().slice(14, 16)}</i>
        </li>
        <li>
          {//orig icon = 'fas fa-door-open'>
          }
          <i className='far fa-clock'> { endTime.toString().slice(11, 13) + ":" + endTime.toString().slice(14, 16)}</i>
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
