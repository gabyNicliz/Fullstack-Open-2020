import React, { useState, useEffect } from 'react';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import BlogListForm from './components/BlogListForm';
import LoginForm from './components/LoginForm';
import AddBlogForm from './components/AddBlogForm';
import './App.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newURL, setNewURL] = useState('');
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    );  
  }, []);

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

  const handleSubmitNewBlog = async (event) => {
    event.preventDefault();
    try {
      const newBlog = await blogService.create({
        title: newTitle,
        author: newAuthor,
        url: newURL,
      });
      setBlogs([...blogs, newBlog]);
      setErrorMessage(`A new blog ${newBlog.title} by ${newBlog.author} added`);
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
    setNewTitle('');
    setNewAuthor('');
    setNewURL('');
  }

  return (
    <div className='App'>
      <h2>blogs</h2>
      <Notification
        message={errorMessage}
        isError={isError}
      />
      <LoginForm
         handleLogin={handleLogin}
         handleLogout={handleLogout}
         username={username}
         password={password}
         setUsername={setUsername}
         setPassword={setPassword}
         user={user}
      />
      {user !== null && (
        <>
          <AddBlogForm
            handleSubmitNewBlog={handleSubmitNewBlog}
            newTitle={newTitle}
            newAuthor={newAuthor}
            newURL={newURL}
            setNewTitle={setNewTitle}
            setNewAuthor={setNewAuthor}
            setNewURL={setNewURL}
          />
          <BlogListForm blogs={blogs} />
        </>
      )}
    </div>
  );
}

export default App;