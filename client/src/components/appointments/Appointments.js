import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import AppointmentItem from "./AppointmentItem";
import Spinner from "../../components/layout/Spinner";
import AppointmentContext from "../../context/appointment/appointmentContext";

const Appointments = () => {
  const appointmentContext = useContext(AppointmentContext);

  const {
    appointments,
    filtered,
    getAppointments,
    loading,
  } = appointmentContext;

  useEffect(() => {
    getAppointments();
    // eslint-disable-next-line
  }, []);

  if (appointments !== null && appointments.length === 0 && !loading) {
    return <h4>You don't have any appointments</h4>;
  }

  return (
    <Fragment>
      {appointments !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map((appointment) => (
                <CSSTransition
                  key={appointment._id}
                  timeout={500}
                  classNames='item'
                >
                  <AppointmentItem appointment={appointment} />
                </CSSTransition>
              ))
            : appointments.map((appointment) => (
                <CSSTransition
                  key={appointment._id}
                  timeout={500}
                  classNames='item'
                >
                  <AppointmentItem appointment={appointment} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Appointments;
