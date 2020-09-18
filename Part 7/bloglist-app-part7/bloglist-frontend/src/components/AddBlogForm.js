import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogsReducer';
import { showMessage } from '../reducers/notificationReducer';

const BlogForm = (props) => {
  const [newTitle, setNewTitle] = useState('');
  const [newAuthor, setNewAuthor] = useState('');
  const [newURL, setNewURL] = useState('');

  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();
    const newBlog = {
      title: newTitle,
      author: newAuthor,
      url: newURL,
    };

    dispatch(createBlog(newBlog));
    dispatch(showMessage(`A new blog ${newBlog.title} by ${newBlog.author} added`, 5));
    setNewTitle('');
    setNewAuthor('');
    setNewURL('');
  };

  return (
    <div>
      <h2>create new</h2>
      <br></br>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            id='title'
            type='text'
            value={newTitle}
            onChange={({ target }) => setNewTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type='text'
            value={newAuthor}
            onChange={({ target }) => setNewAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type='text'
            value={newURL}
            onChange={({ target }) => setNewURL(target.value)}
          />
        </div>
        <div>
          <button type='submit' id='submit-blog-button'>create</button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;