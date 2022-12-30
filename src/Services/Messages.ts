import { Message } from '../Types/Message';
import axiosInstance from './axios';

const Messages = {
  getMessages: async (id: string) => {
    const response = await axiosInstance.get(`/rooms/${id}/messages`);
    return response.data as Message[];
  },
};

export default Messages;
