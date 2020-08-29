import React from 'react';

const loginForm = ({ 
   handleLogin, 
   username, 
   password, 
   setUsername, 
   setPassword, 
   user 
  }) => {
  if (user === null) {
    return (
      <div>
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type='text'
              value={username}
              onChange={({ target }) => setUsername(target.value)} 
            />
          </div>
          <div>
            password
            <input
              type='text'
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type='submit'>login</button>
        </form>
      </div>
    );
  }
}

export default loginForm;