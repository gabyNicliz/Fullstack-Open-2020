import React, { useState } from 'react';
import './Blog.css';

const Blog = ({ blog, user, likeBlogOnCLick, removeBlogOnClick }) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? 'none' : '' };
  const showWhenVisible = { display: visible ? '' : 'none' };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikeBlogOnClick = (event) => {
    event.preventDefault();
    likeBlogOnCLick({
      ...blog,
      user: user.id,
      likes: ++blog.likes,
    });
  }

  const handleRemoveBlogOnClick = (event) => {
    event.preventDefault();
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      removeBlogOnClick(blog);
    }
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        {blog.title} by {blog.author} <button onClick={() => setVisible(!visible)}>show</button>
      </div>
      <div style={showWhenVisible}>
        {blog.title} by {blog.author} <button onClick={() => setVisible(!visible)}>hide</button>
        <p>{blog.url}</p>
        <p>likes: {blog.likes} <button onClick={handleLikeBlogOnClick}>like</button></p>
        <p>{user.username}</p>
        <button onClick={handleRemoveBlogOnClick}>remove</button>
      </div>
    </div>
  );
}

export default Blog
