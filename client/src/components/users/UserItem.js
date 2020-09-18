import React from "react";

const Useritem = ({ user }) => {
  const {
    id,
    firstName,
    lastName,
    userName,
    email,
    password,
    admin,
    privilege1,
    privilege2,
    privilege3,
    privilege4,
    privilege5,
    favoriteColor,
  } = user;

  return (
    <div className='card bg-light'>
      <h3 className='text-primary text-left'>
        <span
          className={"badge " + (admin ? "badge-success" : "badge-primary")}
        >
          {userName}
        </span>
      </h3>
    </div>
  );
};

export default Useritem;
