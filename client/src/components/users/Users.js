import React, { Fragment, useContext } from "react";
import UserItem from "./UserItem";
import UserContext from "../../context/user/userContext";

const Users = () => {
  const userContext = useContext(UserContext);

  const { users } = userContext;

  return (
    <Fragment>
      {users.map((user) => (
        <UserItem key={user.id} user={user} />
      ))}
    </Fragment>
  );
};

export default Users;
