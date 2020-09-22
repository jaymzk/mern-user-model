import React, { useReducer } from "react";
import uuid from "react-uuid";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import {
  ADD_USER,
  DELETE_USER,
  SET_CURRENT,
  CLEAR_CURRENT,
  DELETE_CURRENT,
  UPDATE_USER,
  FILTER_USERS,
  CLEAR_FILTER,
} from "../types";

const UserState = (props) => {
  const initialState = {
    users: [
      {
        id: 1,
        firstName: "Doctor",
        lastName: "Something",
        userName: "Dr Something",
        email: "DSomething@threecountieshealth.com",
        password: "DSomething1",
        phone: "01432-555-5555",
        admin: true,
        privilege1: true,
        privilege2: true,
        privilege3: true,
        privilege4: true,
        privilege5: false,
        favoriteColor: "#4a69bd",
      },
      {
        id: 2,
        firstName: "Admin",
        lastName: "Worker",
        userName: "Mrs Admin Worker",
        email: "AWorker@threecountieshealth.com",
        password: "AdminWorker1",
        phone: "01432-555-5555",
        admin: true,
        privilege1: true,
        privilege2: true,
        privilege3: true,
        privilege4: true,
        privilege5: true,
        favoriteColor: "#4a69bd",
      },
      {
        id: 3,
        firstName: "Anne",
        lastName: "Therapist",
        userName: "Anne Therapist",
        email: "ATherapist@threecountieshealth.com",
        password: "AnneTherapist1",
        phone: "01432-555-5555",
        admin: false,
        privilege1: false,
        privilege2: false,
        privilege3: true,
        privilege4: true,
        privilege5: false,
        favoriteColor: "#4a69bd",
      },
    ],
    current: null,
    filtered: null,
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  //add user

  const addUser = (user) => {
    user.id = uuid();
    dispatch({ type: ADD_USER, payload: user });
  };

  //delete user
  const deleteUser = (id) => {
    dispatch({ type: DELETE_USER, payload: id });
  };

  //set current user
  const setCurrent = (user) => {
    dispatch({ type: SET_CURRENT, payload: user });
  };

  //clear current user
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  //update user
  const updateUser = (user) => {
    dispatch({ type: UPDATE_USER, payload: user });
  };

  //filter user
  const filterUsers = (text) => {
    dispatch({ type: FILTER_USERS, payload: text });
  };
  //clear filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER });
  };

  return (
    <UserContext.Provider
      value={{
        users: state.users,
        current: state.current,
        filtered: state.filtered,
        addUser,
        updateUser,
        deleteUser,
        setCurrent,
        clearCurrent,
        filterUsers,
        clearFilter,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
