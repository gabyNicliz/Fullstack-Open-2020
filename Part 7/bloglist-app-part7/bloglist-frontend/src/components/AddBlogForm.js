/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch } from 'react-redux';
import { createBlog } from '../reducers/blogsReducer';
import { showMessage } from '../reducers/notificationReducer';
import { useField } from '../hooks/index';

const BlogForm = (props) => {
  const { reset: resetTitle, ...title } = useField('text');
  const { reset: resetAuthor, ...author } = useField('text');
  const { reset: resetURL, ...url } = useField('text');

  const dispatch = useDispatch();

  const addBlog = (event) => {
    event.preventDefault();
    dispatch(createBlog({
      title: title.value,
      author: author.value,
      url: url.value,
    }));
    dispatch(showMessage(`A new blog ${title.value} by ${author.value} added`, 5));
    resetTitle();
    resetAuthor();
    resetURL();
  };

  return (
    <div>
      <h2>create new</h2>
      <br></br>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input id='title' { ...title } />
        </div>
        <div>
          author:
          <input id='author' { ...author } />
        </div>
        <div>
          url:
          <input id='url' { ...url } />
        </div>
        <div>
          <button type='submit' id='submit-blog-button'>create</button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;