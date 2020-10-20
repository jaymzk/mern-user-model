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

  //sanitize the dates and times becuase the format changes according to where the date is coming from. 

  const [displayDate, setdisplayDate] = useState(new Date(date))
  const [displayStartTime, setdisplayStartTime] = useState(new Date(startTime))

  let [startTimeMinutes, setStartTimeMintes] = useState(displayStartTime.getMinutes().toString())

  if(startTimeMinutes.length===1) {
    setStartTimeMintes("0" + startTimeMinutes)
  }
  
const [displayEndTime, setdisplayEndTime] = useState(new Date(endTime))

let [endTimeMinutes, setEndTimeMintes] = useState(displayEndTime.getMinutes().toString())
//repetitious but works whereas writing a function doesnt seem to...?


if(endTimeMinutes.length===1) {
  setEndTimeMintes("0" + endTimeMinutes)
}


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

        <i className='far fa-calendar-alt'> { displayDate.getDate() + "/" + (parseInt(displayDate.getMonth()) + 1) + "/" + displayDate.getFullYear() }</i><br />

          <i className='fas fa-door-open'> { room }</i>
     </div>
     
        <div className="appointment_row">

          <i className='far fa-clock'> { displayStartTime.getHours() + ":" + startTimeMinutes}</i>
       
          <i className="fas fa-hourglass-end"> { displayEndTime.getHours() + ":" + endTimeMinutes}</i>
       
          </div>
      <div className="appointment_row">
       {/* 
       wierd stuff happens when you try to edit an appointment. I'll fix this later
       <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrentAppointment(appointment)}
        >
          Edit
        </button> */}
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
