import { Room } from '../Types/Room';
import axiosInstance from './axios';

type CreatedRoom = Omit<Room, '_id' | 'participants'>;

const Rooms = {
  getRooms: async () => {
    const response = await axiosInstance.get('/rooms');
    return response.data as Room[];
  },
  createRoom: async (room: CreatedRoom) => {
    const response = await axiosInstance.post('/rooms', room);
    console.log(response);
    return response.data as Room;
  },
  checkRoomPassword: async (id: string, password: string) => {
    const response = await axiosInstance.post(`/rooms/${id}/password?password=${password}`);
    return response.data;
  },
};

export default Rooms;
