import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import './App.css';

const loginForm = (handleLogin, handleLogout, username, password, setUsername, setPassword, user) => {
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

  return (
    <div>
      <div>
        {user.username} logged in <button onClick={handleLogout}>logout</button>
      </div>
    </div>
  );
}

const blogsForm = (handleLogout, user, blogs) => {
  return (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );
}

const addBlogForm = (handleSubmitNewBlog, newTitle, newAuthor, newURL, setNewTitle, setNewAuthor, setNewURL) => {
  return (
    <div>
      <h2>create new</h2>
      <br></br>
      <form onSubmit={handleSubmitNewBlog}>
        <div>
          title:
          <input 
            type='text'
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={newURL}
            onChange={({ target }) => setNewURL(target.value)}
          />
        </div>
        <div>
          <button type='submit'>create</button>
        </div>
      </form>
    </div>
  );
}


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
      {loginForm(handleLogin, handleLogout, username, password, setUsername, setPassword, user)}
      {user !== null && addBlogForm(handleSubmitNewBlog, newTitle, newAuthor, newURL, setNewTitle, setNewAuthor, setNewURL)}
      {user !== null && blogsForm(handleLogout, user, blogs)}
    </div>
  );
}

export default App;