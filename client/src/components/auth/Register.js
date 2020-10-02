import React, { useContext, useState, useEffect } from "react";
import AlertContext from "../../context/alert/alertContext";
import AuthContext from "../../context/auth/authContext";

const Register = (props) => {
  const alertContext = useContext(AlertContext);

  const authContext = useContext(AuthContext);

  const { setAlert } = alertContext;

  const { register, error, clearErrors, isAuthenticated } = authContext;

  useEffect(() => {
    /*
    if (isAuthenticated) {
      props.history.push("/");
    }
    */

    //need a way of stopping non admins acessing this page
    if (error === "User already exists") {
      setAlert(error, "danger");
      clearErrors();
    }
    // eslint-disable-next-line
  }, [error, isAuthenticated, props.history]);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    password2: "",
  });

  const { firstName, lastName, userName, email, password, password2 } = user;

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      firstName === "" ||
      lastName === "" ||
      userName === "" ||
      email === "" ||
      password === ""
    ) {
      setAlert("Please enter all fields", "danger");
    } else if (password !== password2) {
      setAlert("Passwords do not match", "danger");
    } else {
      register({
        firstName,
        lastName,
        userName,
        email,
        password,
      });
    }
  };

  return (
    <div className='form-container'>
      <h1>
        Account <span className='text-primary'>Register</span>
      </h1>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='firstName'>First Name</label>
          <input
            type='text'
            name='firstName'
            value={firstName}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='lastName'>Last Name</label>
          <input
            type='text'
            name='lastName'
            value={lastName}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='name'>User Name</label>
          <input
            type='text'
            name='userName'
            value={userName}
            onChange={onChange}
            required
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Email</label>
          <input type='text' name='email' value={email} onChange={onChange} />
        </div>
        <div className='form-group'>
          <label htmlFor='password'>Password</label>
          <input
            type='text'
            name='password'
            value={password}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <label htmlFor='password2'>Confirm Password</label>
          <input
            type='text'
            name='password2'
            value={password2}
            onChange={onChange}
            required
            minLength='6'
          />
        </div>
        <input
          type='submit'
          value='Register'
          className='btn btn-primary btn-block'
        />
      </form>
    </div>
  );
};

export default Register;
