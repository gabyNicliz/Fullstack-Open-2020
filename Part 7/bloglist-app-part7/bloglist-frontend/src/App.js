import React, { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import BlogListForm from './components/BlogListForm';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import AddBlogForm from './components/AddBlogForm';
import './App.css';
import { useDispatch } from 'react-redux';
import { showMessage } from './reducers/notificationReducer';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(sortBlogs(blogs))
    );
  }, []);

  const sortBlogs = (blogs) => {
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
    return sortedBlogs;
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem(
        'loggedBlogAppUser',
        JSON.stringify(user),
      );

      blogService.setToken(user.token);
      setUser(user);
      setPassword('');
      setUsername('');
    } catch (err) {
      dispatch(showMessage('Wrong credentials', 5));
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  };

  const handleSubmitNewBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog);
      setBlogs(blogs.concat(blog));
      dispatch(showMessage(`A new blog ${blog.title} by ${blog.author} added`, 5));
    } catch (error) {
      dispatch(showMessage(error.response.data.error, 5));
    }
  };

  const handleLikeClick = async (newBlog) => {
    const updatedBlog = await blogService.likeBlog(newBlog);
    const updatedBlogs = blogs.map((blog) =>
      blog.id === updatedBlog.id ? updatedBlog : blog
    );
    setBlogs(sortBlogs(updatedBlogs));
  };

  const handleRemoveOnClick = async (blogToRemoveId) => {
    try {
      const blogToRemove = blogs.filter((blog) => blog.id === blogToRemoveId);
      if (window.confirm(`Remove ${blogToRemove[0].title} by ${blogToRemove[0].author}`)) {
        await blogService.removeBlog(blogToRemove[0].id);
      }

      setBlogs(blogs.filter((blog) => blog.id !== blogToRemoveId));
    } catch (error) {
      dispatch(showMessage(error.response.data.error, 5));
    }
  };

  const blogForm = () => (
    <Togglable buttonLabel={'new blog'}>
      <AddBlogForm
        createBlog={handleSubmitNewBlog}
      />
    </Togglable>
  );

  const loginForm = () => (
    <Togglable buttonLabel={'login'}>
      <LoginForm
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        username={username}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        user={user}
      />
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
          <BlogListForm
            blogs={blogs}
            likeBlogOnClick={handleLikeClick}
            removeBlogOnClick={handleRemoveOnClick}
          />
        </div>
      }
    </div>
  );
};

export default App;