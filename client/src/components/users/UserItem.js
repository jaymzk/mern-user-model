import React, { useContext } from "react";
import PropTypes from "prop-types";
import UserContext from "../../context/user/userContext";

const UserItem = ({ user }) => {
  const userContext = useContext(UserContext);

  const { deleteUser, setCurrent, clearCurrent } = userContext;

  const {
    _id,
    firstName,
    lastName,
    userName,
    email,
    password,
    phone,
    admin,
    privilege1,
    privilege2,
    privilege3,
    privilege4,
    privilege5,
    favoriteColor,
  } = user;

  const onDelete = () => {
    deleteUser(_id);
    clearCurrent();
  };

  return (
    <div className='card bg-light'>
    
      <h3 className='text-primary text-left'>
        <span
          className={"badge " + (admin ? "badge-success" : "badge-primary")}
        >
          {userName}
        </span>
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-envelope-open'> {email}</i>
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone'> {phone}</i>
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(user)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.object.isRequired,
};

export default UserItem;
