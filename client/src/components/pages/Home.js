import React, { useContext, useEffect } from "react";
import Users from "../users/Users";
import UserForm from "../users/UserForm";
import UserFilter from "../users/UserFilter";
import AuthContext from "../../context/auth/authContext";

const Home = () => {
  const authContext = useContext(AuthContext);

  useEffect(() => {
    authContext.loadUser();
    // eslint-disable-next-line
  }, []);

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
