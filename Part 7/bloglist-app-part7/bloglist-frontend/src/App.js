import React, { useState, useEffect } from 'react';
import blogService from './services/blogs';
import Notification from './components/Notification';
import BlogListForm from './components/BlogListForm';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import AddBlogForm from './components/AddBlogForm';
import UsersList from './components/UsersList';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { initializeBlogs } from './reducers/blogsReducer';
import { initializeUsers } from './reducers/usersReducer';
import { userLogout } from './reducers/loginReducer';

const App = () => {
  const user = useSelector(state => state.login);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(initializeUsers());
  }, [dispatch]);

  useEffect(() => {
    const loggedUser = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'));
    console.log(loggedUser)
    if (loggedUser) {
      blogService.setToken(loggedUser.token);
    }
  }, []);

  const handleLogout = () => {
    dispatch(userLogout());
    window.localStorage.clear();
  };

  const blogForm = () => (
    <Togglable buttonLabel={'new blog'}>
      <AddBlogForm />
    </Togglable>
  );

  const loginForm = () => (
    <Togglable buttonLabel={'login'}>
      <LoginForm />
    </Togglable>
  );

  return (
    <div className='App'>
      <h2>blogs</h2>
      <Notification />

      {user === null ?
        loginForm() :
        <div>
          {user.username} logged in <button id='log-out-button' onClick={handleLogout}>logout</button>
          {blogForm()}
          <BlogListForm />
        </div>
      }
      <UsersList />
    </div>
  );
};

export default App;