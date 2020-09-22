import React from 'react';
import { Link } from 'react-router-dom';

const NavigationBar = ({ user, handleLogout }) => {

  const divStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    borderWidth: 1,
    marginBottom: 5,
    backgroundColor: 'lightGrey',
  };
  const padding = {
    padding: 4
  };

  return (
    <div style={divStyle}>
      <Link style={padding} to='/'>blogs</Link>
      <Link style={padding} to='/users'>users</Link>
      {user
        ? <div style={padding}>{user.username} logged in <button id='log-out-button' onClick={handleLogout}>logout</button></div>
        : <Link style={padding} to='/login'><button>login</button></Link>
      }
    </div>
  );
};

export default NavigationBar;