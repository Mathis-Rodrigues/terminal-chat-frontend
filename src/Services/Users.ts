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
  getUser: async (id: string) => {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data as any;
  },
};

export default Users;
