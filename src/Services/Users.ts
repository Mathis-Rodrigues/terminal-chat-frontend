import axiosInstance from './axios';

const Users = {
  createUser: async (data: any) => {
    const response = await axiosInstance.post('/users/', data);
    return response.data;
  },
  login: async (data: any) => {
    const response = await axiosInstance.post('/login/', data);
    return response.data;
  },
};

export default Users;
