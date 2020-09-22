import React from 'react';
import './Blog.css';
import Comment from './Comment';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { likeBlog, removeBlog, addComment } from '../reducers/blogsReducer';
import { showMessage } from '../reducers/notificationReducer';
import { useField } from '../hooks/index';

const Blog = ({ blogs }) => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const blog = blogs.find((b) => b.id ===id);
  const { reset: resetContent, ...content } = useField('text');

  if (!blog) return null;

  const handleLike = (event) => {
    event.preventDefault();
    dispatch(likeBlog(blog));
    dispatch(showMessage(`Liked ${blog.title} by ${blog.author}`, 5));
  };

  const handleAddComment = (event) => {
    event.preventDefault();
    dispatch(addComment(blog.id, content.value));
    dispatch(showMessage(`comment ${content.value} added`, 5));
    resetContent();
  };

  const handleRemove = (event) => {
    event.preventDefault();
    dispatch(removeBlog(blog.id));
    dispatch(showMessage(`Removed ${blog.title} by ${blog.author}`, 5));
  };

  return (
    <div data-cy='blog-div'>
      <h2>{blog.title} by {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>likes: {blog.likes} <button id='like-button' onClick={handleLike}>like</button></p>
      <p>{blog.user.username}</p>
      <br></br>
      <h3>comments</h3>
      <br></br>
      <form onSubmit={handleAddComment}>
        <input { ...content } />
        <button type='submit'>add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment) =>
          <Comment key={comment.id} comment={comment} />
        )}
      </ul>
    </div>
  );
};

/*Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  likeBlogOnCLick: PropTypes.func.isRequired,
  removeBlogOnClick: PropTypes.func.isRequired,
};*/

export default Blog;
