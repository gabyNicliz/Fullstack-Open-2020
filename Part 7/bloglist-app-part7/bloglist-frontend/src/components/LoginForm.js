import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogin } from '../reducers/loginReducer';
import { useField } from '../hooks/index';

const LoginForm = () => {
  const { reset: resetUsername, ...username } = useField('text');
  const { reset: resetPassword, ...password } = useField('text');

  const user = useSelector(state => state.login);
  const dispatch = useDispatch();

  const handleLogin = (event) => {
    event.preventDefault();
    const user = {
      username: username.value,
      password: password.value
    };

    dispatch(userLogin(user));
    resetUsername();
    resetPassword();
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

/*LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  setUsername: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
};*/

export default LoginForm;