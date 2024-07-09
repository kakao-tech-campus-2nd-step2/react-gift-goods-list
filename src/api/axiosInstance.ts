import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://react-gift-goods-list-hyeonchae-3tvy0jopv.vercel.app',
  headers: {
    'Content-Type': 'application/json'
  },
});

export default axiosInstance