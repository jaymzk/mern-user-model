import React, { useReducer } from "react";
import axios from "axios";
import AppointmentContext from "./appointmentContext";
import appointmentReducer from "./appointmentReducer";
import {
  GET_APPOINTMENTS,
  ADD_APPOINTMENT,
  DELETE_APPOINTMENT,
  SET_CURRENT_APPOINTMENT,
  CLEAR_CURRENT_APPOINTMENT,
  UPDATE_APPOINTMENT,
  FILTER_APPOINTMENTS,
  CLEAR_FILTER_APPOINTMENTS,
  APPOINTMENT_ERROR,
  FILTER_APPOINTMENTS_BY_DATE,
} from "../types";

const AppointmentState = (props) => {
  const initialState = {
    appointments: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(appointmentReducer, initialState);

  //get appointments

  const getAppointments = async () => {
    try {
      const res = await axios.get("/api/appointments");

      dispatch({ type: GET_APPOINTMENTS, payload: res.data });
    } catch (error) {
      dispatch({ type: APPOINTMENT_ERROR, payload: error.response.msg });
    }
  };

  const getAppointmentsByDate = async (date) => {
    try {
      const isoDate = date.toISOString()
      console.log("Getting appointments for :", isoDate)
      const res = await axios.get(`/api/appointments/date/${isoDate}`);

      dispatch({ type: GET_APPOINTMENTS, payload: res.data });
    } catch (error) {
      console.error(error)
      dispatch({ type: APPOINTMENT_ERROR, payload: error.response.msg });
    }
  };



  //add appointment
  const addAppointment = async (appointment) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/appointments", appointment, config);

      dispatch({ type: ADD_APPOINTMENT, payload: res.data });
    } catch (error) {
      console.error(error);
      dispatch({ type: APPOINTMENT_ERROR, payload: error.response.msg });
    }
  };

  //delete appointment

  const deleteAppointment = async (id) => {
    try {
      await axios.delete(`api/appointments/${id}`);

      dispatch({ type: DELETE_APPOINTMENT, payload: id });
    } catch (error) {
      dispatch({
        type: APPOINTMENT_ERROR,
        payload: error.response.msg,
      });
    }
  };

  //set current appointment

  const setCurrentAppointment = (appointment) => {
    let { date, startTime, endTime} = appointment

    //make sure tines and dates are in the correct format
    appointment.date = new Date(date)
    appointment.startTime = new Date(startTime)
    appointment.endTime = new Date(endTime)

    dispatch({ type: SET_CURRENT_APPOINTMENT, payload: appointment });
  };

  //clear current appointment
  const clearCurrentAppointment = () => {
    dispatch({ type: CLEAR_CURRENT_APPOINTMENT });
  };

  //update appointment

  const updateAppointment = async (appointment) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(
        `/api/appointmentss/${appointment._id}`,
        appointment,
        config
      );

      dispatch({ type: UPDATE_APPOINTMENT, payload: res.data });
    } catch (error) {
      console.error(error);
      dispatch({ type: APPOINTMENT_ERROR, payload: error.response.msg });
    }
  };

  //filter appointments
  const filterAppointments = (text) => {
    
    dispatch({ type: FILTER_APPOINTMENTS, payload: text });
  };

  const filterByDate = (date) => {

    const year = date.getFullYear()

    const month = date.getMonth()

    const day = date.getDate()

    date = new Date(year, month, day, 1,0,0,0)

    console.log("filtering by date", date)

    dispatch({ type: FILTER_APPOINTMENTS_BY_DATE, payload: date });
  }

  //clear filter

  const clearFilterAppointments = () => {
    dispatch({ type: CLEAR_FILTER_APPOINTMENTS });
  };

  return (
    //To wrap this context around the app

    <AppointmentContext.Provider
      value={{
        appointments: state.appointments,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        getAppointments,
        getAppointmentsByDate,
        addAppointment,
        deleteAppointment,
        updateAppointment,
        clearCurrentAppointment,
        clearFilterAppointments,
        filterByDate,
        filterAppointments,
        setCurrentAppointment,
      }}
    >
      {props.children}
    </AppointmentContext.Provider>
  );
};

export default AppointmentState;
