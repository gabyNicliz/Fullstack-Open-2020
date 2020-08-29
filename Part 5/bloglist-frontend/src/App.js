import React, { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import BlogListForm from './components/BlogListForm';
import Togglable from './components/Togglable';
import LoginForm from './components/LoginForm';
import AddBlogForm from './components/AddBlogForm';
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(sortBlogs(blogs))
    );  
  }, []);

  const sortBlogs = (blogs) => {
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
    return sortedBlogs;
  }

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
    } catch (exeption) {
      setErrorMessage('Wrong credentials');
      setIsError(true);
      setTimeout(() => { 
      setErrorMessage(null);
      setIsError(false);
      }, 5000);
    }
  }

  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
  }

  const handleSubmitNewBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog);
      setBlogs(blogs.concat(blog));
      setErrorMessage(`A new blog ${blog.title} by ${blog.author} added`);
      setTimeout(() => { 
      setErrorMessage(null);
      }, 5000);      
    } catch (error) {
      setErrorMessage(error.response.data.error);
      setIsError(true);
      setTimeout(() => {
        setErrorMessage(null);
        setIsError(false);
      }, 5000);
    }
  }

  const handleLikeClick = async (newBlog) => {
    const updatedBlog = await blogService.likeBlog(newBlog);
    const updatedBlogs = blogs.map((blog) =>
      blog.id === updatedBlog.id ? updatedBlog : blog
    );
    setBlogs(sortBlogs(updatedBlogs));
  }

  const handleRemoveOnClick = async (blogToRemve) => {
    const removedBlog = await blogService.removeBlog(blogToRemve);
    const newBlogs = blogs.filter((blog) => blog.id !== removedBlog.id);
    
    for (let i = 0; i < blogs.length; i++) console.log(blogs[i].title);

    setBlogs(newBlogs);

    for (let i = 0; i < blogs.length; i++) console.log(blogs[i].title);
  }

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
      <Notification
        message={errorMessage}
        isError={isError}
      />

      {user === null ?
        loginForm() :
        <div>
          {user.username} logged in <button onClick={handleLogout}>logout</button>
          {blogForm()}
          <BlogListForm
            blogs={blogs}
            user={user}
            likeBlogOnClick={handleLikeClick}
            removeBlogOnClick={handleRemoveOnClick}
          />
        </div>
      }
    </div>
  );
}

export default App;