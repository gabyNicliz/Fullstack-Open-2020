const blogsRouter = require('express').Router();
const mongoose = require('mongoose');
const Blog = require('../models/blog');

mongoose.set('useFindAndModify', false);

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post('/', async (request, response) => {
  const { body } = request;

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  });

  if (blog.title === undefined && blog.url === undefined) {
    response.status(400).end();
    return;
  }

  if (blog.likes === undefined) {
    blog.likes = 0;
  }

  const savedBlog = await blog.save();
  response.status(200).json(savedBlog.toJSON());
});

blogsRouter.put('/:id', async (request, response, next) => {
  // eslint-disable-next-line prefer-destructuring
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true });
    response.json(updatedBlog.toJSON());
  } catch (error) { next(error); }
});

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id);
  response.status(204).end();
});

module.exports = blogsRouter;
