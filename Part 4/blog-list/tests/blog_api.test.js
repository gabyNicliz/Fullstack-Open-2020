const mongoose = require('mongoose');
const supertest = require('supertest');
const helper = require('./blog_helper');
const app = require('../app');

const api = supertest(app);

const Blog = require('../models/blog');

mongoose.set('useFindAndModify', false);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs
    .map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
});

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs');

  expect(response.body.length).toBe(helper.initialBlogs.length);
});

test("verify if blog identifier is called 'id'", async () => {
  const response = await api.get('/api/blogs');

  response.body.forEach((blog) => {
    expect(blog.id).toBeDefined();
  });
});

test('a valid blog can be added', async () => {
  const testBlog = {
    title: 'test title',
    author: 'test author',
    url: 'test url',
    likes: 1,
  };

  await api
    .post('/api/blogs')
    .send(testBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((blog) => blog.title);
  expect(titles).toContain('test title');
});

test('if "likes" property is missing, default value is zero', async () => {
  const newBlog = {
    title: 'new title',
    author: 'new author',
    url: 'new url',
  };

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1);

  const likes = blogsAtEnd.map((b) => b.likes);
  expect(likes).not.toContain(likes);
});

test('blog without title and url is not added', async () => {
  const newBlog = {
    author: 'new author',
    likes: 0,
  };

  await api.post('/api/blogs').send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length);
});

test('update a blog', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToUpdate = blogsAtStart[0];

  blogToUpdate.likes = 42;

  await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(blogToUpdate)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  const likes = blogsAtEnd.map((blog) => blog.likes);

  expect(likes).not.toContain(undefined);
});

test('delete a single blog', async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToDelete = blogsAtStart[0];

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  const titles = blogsAtEnd.map((blog) => blog.title);

  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length - 1);
  expect(titles).not.toContain(blogToDelete.title);
});

afterAll(() => {
  mongoose.connection.close();
});
