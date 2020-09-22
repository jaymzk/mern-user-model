import React from "react";
import Users from "../users/Users";
import UserForm from "../users/UserForm";
import UserFilter from "../users/UserFilter";

const Home = () => {
  return (
    <div className='grid-2'>
      <div>
        <UserForm />
      </div>
      <div>
        <UserFilter />
        <Users />
      </div>
    </div>
  );
};

export default Home;
