import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://react-kakao-gift-mock-api.vercel.app/api/v1',
});

export default apiClient;
