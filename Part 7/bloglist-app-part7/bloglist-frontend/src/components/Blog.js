import React, { useState } from 'react';
import './Blog.css';

const Blog = ({ blog, handleLikeClick, handleRemoveClick }) => {
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

  return (
    <div data-cy='blog-div' style={blogStyle}>
      <div style={hideWhenVisible} className='blog-title-author'>
        {blog.title} by {blog.author} <button id='show-info' onClick={() => setVisible(!visible)}>show</button>
      </div>
      <div style={showWhenVisible} className='blog-show-all-info'>
        {blog.title} by {blog.author} <button id='hide-info' onClick={() => setVisible(!visible)}>hide</button>
        <p>{blog.url}</p>
        <p>likes: {blog.likes} <button id='like-button' onClick={handleLikeClick}>like</button></p>
        <p>{blog.user.username}</p>
        <button id='remove-button' onClick={handleRemoveClick}>remove</button>
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
