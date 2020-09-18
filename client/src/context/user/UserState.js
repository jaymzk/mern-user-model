import React, { useReducer } from "react";
import uuid from "uuid";
import UserContext from "./userContext";
import userReducer from "./userReducer";
import {
  ADD_USER,
  DELETE_USER,
  SET_CURRENT,
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
        admin: false,
        privilege1: false,
        privilege2: false,
        privilege3: true,
        privilege4: true,
        privilege5: false,
        favoriteColor: "#4a69bd",
      },
    ],
  };

  const [state, dispatch] = useReducer(userReducer, initialState);

  //add user
  //delete user
  //set current user
  //clear current user
  //update user
  //filter user
  //clear filter

  return (
    <UserContext.Provider
      value={{
        users: state.users,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
