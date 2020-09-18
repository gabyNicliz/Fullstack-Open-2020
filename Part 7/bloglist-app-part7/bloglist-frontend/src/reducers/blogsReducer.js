/* eslint-disable no-case-declarations */
import blogService from '../services/blogs';

const sortBlogs = (blogs) => blogs.sort((a, b) => b.likes - a.likes);

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [ ...state, action.data ];
    case 'LIKE':
      const id = action.data.id;
      const blogToLike = state.find((b) => b.id === id);
      const likedBlog = {
        ...blogToLike,
        likes: ++blogToLike.likes,
      };

      return sortBlogs(state
        .map((blog) => blog.id === id ? likedBlog : blog));
    case 'REMOVE_BLOG':
      return state.filter((b) => b.id !== action.data.id);
    case 'INIT_BLOGS':
      return action.data;
    default:
      return state;
  }
};

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog);
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    });
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const blogToLike = {
      ...blog,
      likes: blog.likes + 1,
    };
    const likedBlog = await blogService.likeBlog(blogToLike);
    dispatch({
      type: 'LIKE',
      data: { id: likedBlog.id },
    });
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    await blogService.removeBlog(id);
    dispatch({
      type: 'REMOVE_BLOG',
      data: { id },
    });
  };
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    });
  };
};

export default blogsReducer;