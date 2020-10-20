import React, { useState, useContext, useEffect, Fragment } from "react";
import DatePicker from "react-datepicker"
import AppointmentContext from "../../context/appointment/appointmentContext";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";
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

  const authContext = useContext(AuthContext)

  const { user } = authContext

  const {userType, calendarPreference, privilege1, privilege2, privilege3, privilege4, privilege5} = user

  useEffect(() => {
    if (current !== null) {
      setAppointment(current);
    } else {

      setAppointment({     
        reference: "",   
        date: Date.now(),
        startTime:new Date(0, 0, 0, 7, 0, 0, 0),
        endTime:new Date(0, 0, 0, 7, 0, 0, 0),
        room: 0,
        notes: "",
        available: false,
        
      });
    }
  }, [appointmentContext, current]);

  const [appointment, setAppointment] = useState({
    reference:"",
    date: "",
    startTime: "",
    endTime: "",
    room: 0,
    notes: "",
    available: false,
  });

  let { date, reference, startTime, endTime, room, notes, available} = appointment;

  const [startTimeClicked, setStartTimeClicked] = useState(false)
  const [endTimeClicked, setEndTimeClicked] = useState(false)
  const [dateClicked, setDateClicked] = useState(false)



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
    
  }

  const onDateSelect = (date) => {

    setDateClicked(true)

    const year = date.getFullYear()

    const month = date.getMonth()

    const day = date.getDate()

    date = new Date(year, month, day, 1,0,0,0)

    setAppointment({ ...appointment, date: date});

  };

  const setStartTime = (time)=> {

    setStartTimeClicked(true)

    const hours = time.getHours()

    const minutes = time.getMinutes()

    time = new Date(0,0,0, hours, minutes, 0,0)

    setAppointment({...appointment, startTime:time})

  
  }
  const setEndTime = (time)=> {

    setEndTimeClicked(true)

    const hours = time.getHours()

    const minutes = time.getMinutes()

    time = new Date(0,0,0, hours, minutes, 0,0)


    setAppointment({...appointment, endTime:time})
  }


  const onSubmit = (e) => {
    e.preventDefault();

    if (current === null) {
      if (reference === ""){ setAlert("Please enter a reference", "danger");}
      if (date === ""){ setAlert("Please enter a date", "danger");}
      if (startTime === ""){ setAlert("Please enter a start time", "danger");}
      if (endTime === ""){ setAlert("Please enter an end time", "danger");}
      if (room === "") { setAlert("Please enter a room", "danger");}
      if (dateClicked===false) { setAlert("Please choose a date", "danger");}
      if (startTimeClicked===false) { setAlert("Please choose a start time", "danger");}
      if (endTimeClicked===false) { setAlert("Please choose an end time", "danger");}

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
        name='reference'
        value={reference}
        onChange={onChange}
      />
       <label htmlFor='reference'>Reference</label>
      
     <br />
     <DatePicker
      dateFormat="dd/MM/yyyy"
      selected={date ? date : Date.now()}
      onChange={onDateSelect}
    />
    
     <br />
      <label htmlFor='date'>Date</label>
    <br />
     <DatePicker
      selected={startTime ? startTime : Date.now()}
      onChange={time => setStartTime(time)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={5}
      timeCaption="Time"
      dateFormat="h:mm aa"
    />
     <br />
      <label htmlFor='startTime'>Start Time</label>
      <br />
      <DatePicker
      selected={endTime ? endTime : Date.now() + 1800000}
      onChange={time => setEndTime(time)}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={5}
      timeCaption="Time"
      dateFormat="h:mm aa"
    />
     <br />
      <label htmlFor='endTime'>End Time</label>
    {/* 
      old room picker. I'll leave it here until I'm sure the new one works
    <br />
      <input
        type='number'
        placeholder='Room'
        name='room'
        value={room}
        onChange={onRoomChange}
      /> */}
 <br />
      <h5>Room</h5>

      { (userType==="admin" || privilege1===true) &&
        <Fragment>
        
      <input type="radio" name="room" value={1} checked={room===1} onChange={onChange}

      /> Room 1{" "}<br/>
  </Fragment>
      }
      
{ (userType==="admin" || privilege2===true) &&
        <Fragment>
        
  <input type="radio" name="room" value={2} checked={room===2} onChange={onChange}

/> Room 2{" "}<br/>
</Fragment>}

{ (userType==="admin" || privilege3===true) &&
        <Fragment>
        

  <input type="radio" name="room" value={3} onChange={onChange}

  /> Room 3{" "}<br/>
  </Fragment>
}

{ (userType==="admin" || privilege4===true) &&
        <Fragment>
        

<input type="radio" name="room" value={4} onChange={onChange}

/> Room 4{" "}<br/>
</Fragment>}


{ (userType==="admin" || privilege5===true) &&
        <Fragment>

<input type="radio" name="room" value={5} checked={room===5} onChange={onChange}

/> Group Room {" "}<br/>

</Fragment> }
      <br />




     {/*  <br />
        <label htmlFor='room'>Room</label>
        <br />
      <input
        type='text'
        placeholder='Notes'
        name='notes'
        value={notes}
        onChange={onChange}
      />
       <br />
        <label htmlFor='notes'>Notes</label>
        */}
    <br />
      {/* 
      This is for the future, when users are able to indicate bookable appointments which patients can select
       from teh website. I'm hiding it for time being to avoid confusion
      <input
        type='checkbox'
        name='available'
        value={available}
        checked={!!available}
        onChange={onCheckboxChange}
      />
      
      <h5>
        <label htmlFor='admin'>Available for booking?</label>
      </h5> */}
      <br />

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
