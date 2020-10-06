import {
  GET_APPOINTMENTS,
  ADD_APPOINTMENT,
  DELETE_APPOINTMENT,
  SET_CURRENT_APPOINTMENT,
  CLEAR_CURRENT_APPOINTMENT,
  CLEAR_APPOINTMENTS,
  UPDATE_APPOINTMENT,
  FILTER_APPOINTMENTS,
  CLEAR_FILTER_APPOINTMENTS,
  APPOINTMENT_ERROR,
} from "../types";

export default (state, action) => {
  switch (action.type) {
    case GET_APPOINTMENTS:
      return {
        ...state,
        appointments: action.payload,
        loading: false,
      };
    case ADD_APPOINTMENT:
      return {
        ...state,
        appointments: [...state.appointments, action.payload],
        loading: false,
      };

    case UPDATE_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointments.map((appointment) =>
          appointment._id === action.payload._id ? action.payload : appointment
        ),
        loading: false,
      };

    case DELETE_APPOINTMENT:
      return {
        ...state,
        appointments: state.appointmentss.filter(
          (appointment) => appointment._id !== action.payload
        ),
        loading: false,
      };

    case CLEAR_APPOINTMENTS:
      return {
        ...state,
        appointments: null,
        filtered: null,
        error: null,
        current: null,
      };

    case SET_CURRENT_APPOINTMENT:
      return {
        ...state,
        current: action.payload,
      };
    case CLEAR_CURRENT_APPOINTMENT:
      return {
        ...state,
        current: null,
      };

    case FILTER_APPOINTMENTS:
      return {
        ...state,
        filtered: state.appointments.filter((appointment) => {
          const regex = new RegExp(`${action.payload}`, "gi");
          return (
            appointment.date.match(regex) ||
            appointment.startTime.match(regex) ||
            appointment.endTime.match(regex) ||
            appointment.notes.match(regex)
          );
        }),
        loading: false,
      };
    case CLEAR_FILTER_APPOINTMENTS:
      return {
        ...state,
        filtered: null,
        loading: false,
      };

    case APPOINTMENT_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};
