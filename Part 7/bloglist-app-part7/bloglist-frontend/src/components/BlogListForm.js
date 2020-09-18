import React from 'react';
import { useSelector } from 'react-redux';
import Blog from './Blog';

const BlogListForm = (props) => {
  const blogs = useSelector(state => state.blogs);
  console.log(blogs);

  return (
    <div>
      {blogs.map((blog) =>
        <Blog
          key={blog.id}
          blog={blog}
          //likeBlogOnCLick={likeBlogOnClick}
          //removeBlogOnClick={removeBlogOnClick}
        />)
      }
    </div>
  );
};

export default BlogListForm;