import React, { useContext, useRef, useEffect } from "react";
import UserContext from "../../context/user/userContext";

const UserFilter = () => {
  const userContext = useContext(UserContext);
  const text = useRef("");

  const { filterUsers, clearFilter, filtered } = userContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = (e) => {
    if (text.current.value !== "") {
      filterUsers(e.target.value);
    } else {
      clearFilter();
    }
  };
  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Users....'
        onChange={onChange}
      />
    </form>
  );
};

export default UserFilter;
