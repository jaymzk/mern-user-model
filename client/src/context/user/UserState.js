import React, { useReducer } from "react";
import axios from "axios";
import UserContext from "./userContext";
import UserReducer from "./userReducer";
import {
  GET_USERS,
  ADD_USER,
  DELETE_USER,
  SET_CURRENT,
  CLEAR_CURRENT,
  CLEAR_USERS,
  UPDATE_USER,
  USER_ERROR,
  FILTER_USERS,
  CLEAR_FILTER,
} from "../types";

const UserState = (props) => {
  const initialState = {
    users: null,
    current: null,
    filtered: null,
    error: null,
  };

  const [state, dispatch] = useReducer(UserReducer, initialState);

  //get users

  const getUsers = async () => {
    try {
      const res = await axios.get("/api/users/all");

      dispatch({ type: GET_USERS, payload: res.data });
    } catch (error) {
      dispatch({ type: USER_ERROR, payload: error.response.msg });
    }
  };

  //add user

  const addUser = async (user) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.post("/api/users", user, config);

     // dispatch({ type: ADD_USER, payload: res.data });
     //below is my attempt to fix the new user not showing up when created. It works but we'll see if it causes any problems later
     dispatch({type: ADD_USER, payload: user})
    } catch (error) {
      console.error(error);
      dispatch({ type: USER_ERROR, payload: error.response.msg });
    }
  };

  //delete user
  const deleteUser = async (id) => {
    try {
      await axios.delete(`api/users/${id}`);

      dispatch({ type: DELETE_USER, payload: id });
    } catch (error) {
      dispatch({
        type: USER_ERROR,
        payload: error.response.msg,
      });
    }
  };

  //update user
  const updateUser = async (user) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    try {
      const res = await axios.put(`/api/users/${user._id}`, user, config);

      dispatch({ type: UPDATE_USER, payload: res.data });
    } catch (error) {
      console.error(error);
      dispatch({ type: USER_ERROR, payload: error.response.msg });
    }
  };

  //clear users. avoids info flashing onto screen after a logout
  const clearUsers = () => {
    dispatch({ type: CLEAR_USERS });
  };

  //set current user
  const setCurrent = (user) => {
    dispatch({ type: SET_CURRENT, payload: user });
  };

  //clear current user
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
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
        error: state.error,
        getUsers,
        addUser,
        updateUser,
        deleteUser,
        setCurrent,
        clearCurrent,
        filterUsers,
        clearFilter,
        clearUsers,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
