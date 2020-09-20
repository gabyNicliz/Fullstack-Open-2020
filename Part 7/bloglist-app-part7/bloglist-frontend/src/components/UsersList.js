import React from 'react';
import { useSelector } from 'react-redux';

const UsersList = () => {
  const users = useSelector(state => state.users);

  return (
    <div>
      {users.map((user) => {
        return (
          <div key={user.id}> {user.username} {user.blogs.length} </div>
        );
      })}
    </div>
  );
};

export default UsersList;