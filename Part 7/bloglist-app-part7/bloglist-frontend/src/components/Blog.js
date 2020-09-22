import React from 'react';
import './Blog.css';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { likeBlog, removeBlog } from '../reducers/blogsReducer';
import { showMessage } from '../reducers/notificationReducer';

const Blog = ({ blogs }) => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const blog = blogs.find((b) => b.id ===id);

  if (!blog) return null;

  const handleLike = (event) => {
    event.preventDefault();
    dispatch(likeBlog(blog));
    dispatch(showMessage(`Liked ${blog.title} by ${blog.author}`, 5));
  };

  const handleRemove = (event) => {
    event.preventDefault();
    dispatch(removeBlog(blog.id));
    dispatch(showMessage(`Removed ${blog.title} by ${blog.author}`, 5));
  };

  return (
    <div data-cy='blog-div'>
      <h2>{blog.title} by {blog.author}</h2>
      <p>{blog.url}</p>
      <p>likes: {blog.likes} <button id='like-button' onClick={handleLike}>like</button></p>
      <p>{blog.user.username}</p>
    </div>
  );
};

/*Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlogOnCLick: PropTypes.func.isRequired,
  removeBlogOnClick: PropTypes.func.isRequired,
};*/

export default Blog;
