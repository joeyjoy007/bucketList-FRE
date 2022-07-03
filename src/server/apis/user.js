import axios from 'axios';

export const createUser = async data => {
  return await axios.post('/create', data);
};

export const loginUser = async data => {
  return await axios.post('/login', data);
};

export const getUserDetail = async () => {
  return await axios.get('/fetch');
};

export const fetchSingleUser = async id => {
  return await axios.get(`/fetchSingleUser/${id}`);
};
