import axios from 'axios';

const token = localStorage.getItem('token');

axios.defaults.baseURL = 'https://terminal-chat-backend-production.up.railway.app';

if (token) {
  axios.defaults.headers.common.Authorization = `Bearer ${token}`;
}

const Users = {
  createUser: async (data) => {
    const response = await axios.post('/users/', data);
    return response.data;
  },
  login: async (data) => {
    const response = await axios.post('/login/', data);
    return response.data;
  },
};

export default Users;
