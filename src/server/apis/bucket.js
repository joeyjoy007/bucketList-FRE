import axios from 'axios';

export const fetchBucket = async () => {
  return await axios.get('/bfetch?');
};

// export const loginUser = async (data)=>{
//     return await axios.post('/login',data)
//     }

// export const getUserDetail = async()=>{
//     return await axios.get('/fetch')
// }
