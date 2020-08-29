import React from 'react';
import Blog from './Blog';

const BlogListForm = ({ blogs, user, likeBlogOnClick, removeBlogOnClick }) => {
  return (
    <div>
      {blogs.map((blog) =>
        <Blog 
          key={blog.id}
          blog={blog}
          user={user}
          likeBlogOnCLick={likeBlogOnClick}
          removeBlogOnClick={removeBlogOnClick}
        />
      )}
    </div>
  );
}

export default BlogListForm;