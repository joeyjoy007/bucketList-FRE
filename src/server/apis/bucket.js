import axios from 'axios';
import {Storage} from '../../storage/Storage';

const bucketAxios = axios.create({
  baseURL: 'http://192.168.1.6:4000',
});

bucketAxios.interceptors.request.use(
  async config => {
    config.headers.Authorization = `Bearer ${await Storage.getItem('token')}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export const createBucket = async data => {
  console.log('BUCKET DATA => ', data);
  return await bucketAxios.post('/bcreate', data);
};

export const fetchBucket = async () => {
  return await bucketAxios.get('/bfetch');
};

export const fetchBucketForUser = async id => {
  return await bucketAxios.get(`/bfetchSingleBucket/${id}`);
};

export const updateBucketForFather = async (id, data) => {
  return await bucketAxios.patch(`/updateBucket/${id}`, data);
};
