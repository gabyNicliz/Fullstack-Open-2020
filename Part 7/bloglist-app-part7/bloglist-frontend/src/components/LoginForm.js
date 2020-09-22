import React from 'react';
import { useDispatch } from 'react-redux';
import { userLogin } from '../reducers/loginReducer';
import { useField } from '../hooks/index';
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
  const { reset: resetUsername, ...username } = useField('text');
  const { reset: resetPassword, ...password } = useField('text');

  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogin = (event) => {
    event.preventDefault();
    const user = {
      username: username.value,
      password: password.value
    };

    dispatch(userLogin(user));
    resetUsername();
    resetPassword();
    history.push('/');
  };

  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
            username
          <input id='username' { ...username } />
        </div>
        <div>
            password
          <input id='password' { ...password } />
        </div>
        <button type='submit' id='login-button'>login</button>
      </form>
    </div>
  );

};

export default LoginForm;