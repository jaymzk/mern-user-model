import React, { Fragment, useContext } from "react";
import UserItem from "./UserItem";
import UserContext from "../../context/user/userContext";

const Users = () => {
  const userContext = useContext(UserContext);

  const { users, filtered } = userContext;

  if (users.length === 0) {
    return <h4>Please Add a User</h4>;
  }

  return (
    <Fragment>
      {filtered !== null
        ? filtered.map((user) => <UserItem key={user.id} user={user} />)
        : users.map((user) => <UserItem key={user.id} user={user} />)}
    </Fragment>
  );
};

export default Users;
