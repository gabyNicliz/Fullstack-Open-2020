/* eslint-disable no-unused-vars */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './Blog';
import { likeBlog, removeBlog } from '../reducers/blogsReducer';
import { showMessage } from '../reducers/notificationReducer';

const BlogListForm = (props) => {
  const blogs = useSelector(state => state.blogs);
  const dispatch = useDispatch();

  console.log(blogs);

  const handleLike = (blog) => {
    dispatch(likeBlog(blog));
    dispatch(showMessage(`Liked ${blog.title} by ${blog.author}`, 5));
  };

  const handleRemoveBlog = (blog) => {
    dispatch(removeBlog(blog.id));
    dispatch(showMessage(`Removed ${blog.title} by ${blog.author}`, 5));
  };

  return (
    <div>
      {blogs.map((blog) =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLikeClick={() => handleLike(blog)}
          handleRemoveClick={() => handleRemoveBlog(blog)}
        />)
      }
    </div>
  );
};

export default BlogListForm;