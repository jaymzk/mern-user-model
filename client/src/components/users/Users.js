import React, { Fragment, useContext } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
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
      <TransitionGroup>
        {filtered !== null
          ? filtered.map((user) => (
              <CSSTransition key={user.id} timeout={500} classNames='item'>
                <UserItem user={user} />
              </CSSTransition>
            ))
          : users.map((user) => (
              <CSSTransition key={user.id} timeout={500} classNames='item'>
                <UserItem user={user} />
              </CSSTransition>
            ))}
      </TransitionGroup>
    </Fragment>
  );
};

export default Users;
