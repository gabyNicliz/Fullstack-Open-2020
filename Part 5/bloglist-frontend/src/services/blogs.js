import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
}

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios
    .post(baseUrl, newObject, config);
  return response.data;
}

const likeBlog = async (objToUpdate) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios
    .put(`${baseUrl}/${objToUpdate.id}`, objToUpdate, config);
  return response.data;
}

const removeBlog = async (objToRemove) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios
    .delete(`${baseUrl}/${objToRemove.id}`, config);
  return response.data;
}

export default {
  getAll,
  create,
  setToken,
  likeBlog,
  removeBlog,
}