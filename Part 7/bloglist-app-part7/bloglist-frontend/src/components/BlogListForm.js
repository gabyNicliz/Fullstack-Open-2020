import React from 'react';
import Blog from './Blog';

const BlogListForm = ({ blogs, likeBlogOnClick, removeBlogOnClick }) => {
  return (
    <div>
      {blogs.map((blog) =>
        <Blog
          key={blog.id}
          blog={blog}
          likeBlogOnCLick={likeBlogOnClick}
          removeBlogOnClick={removeBlogOnClick}
        />)
      }
    </div>
  );
};

export default BlogListForm;