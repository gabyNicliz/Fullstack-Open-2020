import React, { useState } from 'react';
import './Blog.css';
import PropTypes from 'prop-types';

const Blog = ({ blog, /*likeBlogOnCLick, removeBlogOnClick*/ }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  /*const handleLikeBlogOnClick = (event) => {
    event.preventDefault();
    likeBlogOnCLick({
      ...blog,
      user: blog.user.id,
      likes: ++blog.likes,
    });
  };*/

  /*const handleRemoveBlogOnClick = (event) => {
    event.preventDefault();

    removeBlogOnClick(blog.id);
  };*/

  return (
    <div data-cy='blog-div' style={blogStyle}>
      <div style={hideWhenVisible} className='blog-title-author'>
        {blog.title} by {blog.author} <button id='show-info' onClick={() => setVisible(!visible)}>show</button>
      </div>
      <div style={showWhenVisible} className='blog-show-all-info'>
        {blog.title} by {blog.author} <button id='hide-info' onClick={() => setVisible(!visible)}>hide</button>
        <p>{blog.url}</p>
        <p>likes: {blog.likes} <button id='like-button' /*onClick={handleLikeBlogOnClick}*/>like</button></p>
        <p>{blog.user.username}</p>
        <button id='remove-button' /*onClick={handleRemoveBlogOnClick}*/>remove</button>
      </div>
    </div>
  );
};

/*Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlogOnCLick: PropTypes.func.isRequired,
  removeBlogOnClick: PropTypes.func.isRequired,
};*/

export default Blog;
