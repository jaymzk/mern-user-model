import React, { useState, useContext, useEffect,Fragment } from "react";
import UserContext from "../../context/user/userContext";
import AlertContext from "../../context/alert/alertContext";

const UserForm = () => {
  const alertContext = useContext(AlertContext);

  const { setAlert } = alertContext;

  const userContext = useContext(UserContext);

  const { addUser, updateUser, clearCurrent, current } = userContext;

  useEffect(() => {
   
    if (current !== null) {
      console.log(current)
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
        userType:"patient",
        calendarPreference: "week",
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
    userType:"patient",
    calendarPreference:"week",
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
    userType,
    calendarPreference,
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

  const onAdminCheckboxChange = (e) => {
    setUser({ ...user, admin: !user.admin });
   /*this is a separate function so i can experiment with ways to 
   cancel all priviliges automatically if admin is changed to false. useeffect best though?
  */};

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

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit} autocomplete="off">
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
        value={email===undefined ? "" : email}
        onChange={onChange}
      />
      <input
        type='tel'
        placeholder='Phone Number'
        name='phone'
        value={phone===undefined ? "" : phone }
        onChange={onChange}
      />

      <input
        type='password'
        placeholder='Password'
        name='password'
        value={password===undefined ? "" : password}
        onChange={onChange}
      />
      
      <input
        type='password'
        placeholder='Repeat Password'
        name='password2'
        value={password2===undefined ? "" : password2}
        onChange={onChange}
      />
      <h5>User Type</h5>
      <input type="radio" name="userType" value="patient" checked={userType==="patient"} onChange={onChange}

      /> Patient{" "}
      <input type="radio" name="userType" value="user" checked={userType==="user"} onChange={onChange}

      /> User{" "}
      <input type="radio" name="userType" value="admin" checked={userType==="admin"} onChange={onChange}

      /> Admin{" "}

      <br />
      <h5>Calendar Preference</h5>
      <input type="radio" name="calendarPreference" value="day" checked={calendarPreference==="day"} onChange={onChange}

      /> Day{" "}
      <input type="radio" name="calendarPreference" value="week" checked={calendarPreference==="week"} onChange={onChange}

      /> Week{" "}
      <input type="radio" name="calendarPreference" value="month" checked={calendarPreference==="month"} onChange={onChange}

      /> Month{" "}

      <br />
      <label htmlFor="favoriteColor">Select your favorite color:</label>
      <input type="color" name="favoriteColor" value={favoriteColor} onChange={onChange}></input>
{/*
I want to make the checkboxes individual fragments to give me flexibility for 
future changes or client requests
*/}

{user.userType==="user" && 
<Fragment>  
      <input
        type='checkbox'
        name='admin'
        value={admin}
        checked={admin}
        onChange={onAdminCheckboxChange}
      />


      <h5>
        <label htmlFor='admin'>Admin ?</label>
      </h5>
  </Fragment>  

    }
    {user.userType==="user" && 
<Fragment>  
    
      <input
        type='checkbox'
        name='privilege1'
        value={privilege1}
        checked={privilege1}
        onChange={onCheckboxChange}
      />
      <h5>
        <label htmlFor='privilege1'>Room 1 ?</label>
      </h5>

      </Fragment>  

    }
    {user.userType==="user" && 
<Fragment>  
      <input
        type='checkbox'
        name='privilege2'
        value={privilege2}
        checked={privilege2}
        onChange={onCheckboxChange}
      />
      <h5>
        <label htmlFor='privilege2'>Room 2 ?</label>
      </h5>
      </Fragment>  

}
{user.userType==="user" && 
<Fragment> 
      <input
        type='checkbox'
        name='privilege3'
        value={privilege3}
        checked={privilege3}
        onChange={onCheckboxChange}
      />
      <h5>
        <label htmlFor='privilege3'>Room 3 ?</label>
      </h5>
      </Fragment>  

}
{user.userType==="user" && 
<Fragment> 
      <input
        type='checkbox'
        name='privilege4'
        value={privilege4}
        checked={privilege4}
        onChange={onCheckboxChange}
      />
      <h5>
        <label htmlFor='privilege4'>Room 4 ?</label>
      </h5>
      </Fragment>  

}
{user.userType==="user" && 
<Fragment> 

      <input
        type='checkbox'
        name='privilege5'
        value={privilege5}
        checked={privilege5}
        onChange={onCheckboxChange}
      />
      <h5>
        <label htmlFor='privilege5'>Group Room ?</label>
      </h5>
      </Fragment>  

}
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
