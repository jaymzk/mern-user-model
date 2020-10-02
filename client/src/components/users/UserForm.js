import React, { useState, useContext, useEffect } from "react";
import UserContext from "../../context/user/userContext";
import AlertContext from "../../context/alert/alertContext";

const UserForm = () => {
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const userContext = useContext(UserContext);

  const { addUser, updateUser, clearCurrent, current } = userContext;

  useEffect(() => {
    if (current !== null) {
      setUser(current);
    } else {
      setUser({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: "",
        password2: "",
        phone: "",
        admin: false,
        privilege1: false,
        privilege2: false,
        privilege3: false,
        privilege4: false,
        privilege5: false,
        favoriteColor: "#4a69bd",
      });
    }
  }, [userContext, current]);

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    password2: "",
    phone: "",
    admin: false,
    privilege1: false,
    privilege2: false,
    privilege3: false,
    privilege4: false,
    privilege5: false,
    favoriteColor: "#4a69bd",
  });

  const {
    firstName,
    lastName,
    userName,
    email,
    password,
    password2,
    phone,
    admin,
    privilege1,
    privilege2,
    privilege3,
    privilege4,
    privilege5,
    favoriteColor,
  } = user;

  const onChange = (e) => setUser({ ...user, [e.target.name]: e.target.value });

  const onCheckboxChange = (e) => {
    setUser({ ...user, [e.target.name]: !user[e.target.name] });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (current === null) {
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
        addUser(user);
      }
    } else {
      updateUser(user);
    }
    clearAll();
  };

  /*
  const onSubmit = (e) => {
    e.preventDefault();
    userContext.addUser(user);
    setUser({
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      phone: "",
      admin: false,
      privilege1: false,
      privilege2: false,
      privilege3: false,
      privilege4: false,
      privilege5: false,
      favoriteColor: "#4a69bd",
    });
    
  };
*/
  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-primary'>{current ? "Edit User" : "Add User"}</h2>
      <input
        type='text'
        placeholder='First Name'
        name='firstName'
        value={firstName}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Last Name'
        name='lastName'
        value={lastName}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='User Name'
        name='userName'
        value={userName}
        onChange={onChange}
      />
      <input
        type='email'
        placeholder='email'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='tel'
        placeholder='Phone Number'
        name='phone'
        value={phone}
        onChange={onChange}
      />

      <input
        type='text'
        placeholder='Password'
        name='password'
        value={password}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Repeat Password'
        name='password2'
        value={password2}
        onChange={onChange}
      />

      <input
        type='checkbox'
        name='admin'
        value={admin}
        checked={admin}
        onChange={onCheckboxChange}
      />
      <h5>
        <label for='admin'>Admin ?</label>
      </h5>
      <input
        type='checkbox'
        name='privilege1'
        value={privilege1}
        checked={privilege1}
        onChange={onCheckboxChange}
      />
      <h5>
        <label for='privilege1'>Privilege 1 ?</label>
      </h5>
      <input
        type='checkbox'
        name='privilege2'
        value={privilege2}
        checked={privilege2}
        onChange={onCheckboxChange}
      />
      <h5>
        <label for='privilege2'>Privilege 2 ?</label>
      </h5>
      <input
        type='checkbox'
        name='privilege3'
        value={privilege3}
        checked={privilege3}
        onChange={onCheckboxChange}
      />
      <h5>
        <label for='privilege3'>Privilege 3 ?</label>
      </h5>
      <input
        type='checkbox'
        name='privilege4'
        value={privilege4}
        checked={privilege4}
        onChange={onCheckboxChange}
      />
      <h5>
        <label for='privilege4'>Privilege 4 ?</label>
      </h5>

      <input
        type='checkbox'
        name='privilege5'
        value={privilege5}
        checked={privilege5}
        onChange={onCheckboxChange}
      />
      <h5>
        <label for='privilege5'>Privilege 5 ?</label>
      </h5>
      <div>
        <input
          type='submit'
          value={current ? "Update User" : "Add User"}
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

export default UserForm;
