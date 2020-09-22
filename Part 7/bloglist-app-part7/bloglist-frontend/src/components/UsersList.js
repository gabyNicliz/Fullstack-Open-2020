import React from 'react';
import { Link } from 'react-router-dom';

const UsersList = ({ users }) => {
  return (
    <>
      <div>
        <h2>Users</h2>
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map((user) => {
            return (
              <tr key={user.id}>
                <td><Link to={`/users/${user.id}`}>{user.username}</Link></td>
                <td>{user.blogs.length}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default UsersList;