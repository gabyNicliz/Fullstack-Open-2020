/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/jsx-filename-extension */
import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { useField } from '../hooks/index';
import { LOGIN } from '../queries';

const LoginForm = ({
  setToken, show, setMessage, setPage,
}) => {
  const { reset: resetUsername, ...username } = useField('text');
  const { reset: resetPassword, ...password } = useField('text');

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setMessage(error.graphQLErrors[0].message);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    },
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem('graphql-library-user-token', token);
    }
  }, [setToken, result.data]);

  if (!show) return null;

  const handleSubmit = (event) => {
    event.preventDefault();

    login({
      variables: {
        username: username.value,
        password: password.value,
      },
    });
    resetUsername();
    resetPassword();
    setPage('authors');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input {...username} />
        </div>
        <div>
          password
          <input {...password} />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  );
};

export default LoginForm;
