import React, { useContext, useEffect } from "react";
import Appointments from "../appointments/Appointments";
import AppointmentForm from "../appointments/AppointmentForm";
import AppointmentFilter from "../appointments/AppointmentFilter";
import AuthContext from "../../context/auth/authContext";

const AppointmentsQuery = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

  return (
    <div className='grid-2'>
      <div>
        <AppointmentForm />
      </div>
      <div>
        <AppointmentFilter />
        <Appointments />
      </div>
    </div>
  );
};

export default AppointmentsQuery;
