import blogService from '../services/blogs';

const sortBlogs = (blogs) => blogs.sort((a, b) => b.likes - a.likes);

const blogsReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return [ ...state, action.data ];
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