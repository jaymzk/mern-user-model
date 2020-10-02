import React, { Fragment, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; // dont use an a tag for a link use a link to
import AuthContext from "../../context/auth/authContext";
import UserContext from "../../context/user/userContext";

const Navbar = ({ title, icon }) => {
  const authContext = useContext(AuthContext);

  const userContext = useContext(UserContext);

  const { isAuthenticated, logout, user } = authContext;
  const { clearUsers } = userContext;

  const onLogout = () => {
    logout();
    clearUsers();
  };

  const authLinks = (
    <Fragment>
      <li>Hello {user && user.firstName}</li>
      <li>
        <a onClick={onLogout} href='#!'>
          <i className='fas fa-sign-out-alt'>
            <span className='hide-sm'>Logout</span>
          </i>
        </a>
      </li>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <Link to='/register'>Register</Link>
      <Link to='/login'>Login</Link>
    </Fragment>
  );

  return (
    <div className='navbar bg-primary'>
      <h1>
        <i className={icon} /> {title}
      </h1>
      <ul>{isAuthenticated ? authLinks : guestLinks}</ul>
    </div>
  );
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Navbar.defaultProps = {
  title: "User Model",
  icon: "fas fa-id-card-alt",
};

export default Navbar;
