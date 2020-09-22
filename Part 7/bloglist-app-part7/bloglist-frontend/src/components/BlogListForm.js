/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Blog from './Blog';
import { likeBlog, removeBlog } from '../reducers/blogsReducer';
import { showMessage } from '../reducers/notificationReducer';

const BlogListForm = ({ blogs }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  return (
    <div>
      {blogs.map((blog) =>
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </div>
      )
      }
    </div>
  );
};

export default BlogListForm;