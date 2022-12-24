import { useEffect } from 'react';
import axiosInstance from '../Services/axios';

export default function useToken() {
  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }, []);
}
