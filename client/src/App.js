import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alerts from "./components/layout/Alerts";
import AppointmentsHome from "./components/pages/AppointmentsHome";
import PrivateRoute from "./components/routing/PrivateRoute";

import UserState from "./context/user/UserState";
import AuthState from "./context/auth/AuthState";
import AlertState from "./context/alert/AlertState";
import AppointmentState from "./context/appointment/AppointmentState";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <UserState>
        <AppointmentState>
          <AlertState>
            <Router>
              <Fragment>
                <Navbar title={"Room Booker"} icon={"far fa-calendar-alt"} />
                <div className='container'>
                  <Alerts />
                  <Switch>
                    <PrivateRoute exact path='/' component={Home} />
                    <PrivateRoute
                      exact
                      path='/appointments'
                      component={AppointmentsHome}
                    />
                    <Route exact path='/about' component={About} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                  </Switch>
                </div>
              </Fragment>
            </Router>
          </AlertState>
        </AppointmentState>
      </UserState>
    </AuthState>
  );
};

export default App;
