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

export const fetchBucket = async () => {
  return await bucketAxios.get('/bfetch');
};

// export const loginUser = async (data)=>{
//     return await axios.post('/login',data)
//     }

// export const getUserDetail = async()=>{
//     return await axios.get('/fetch')
// }
