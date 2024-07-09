import axios from 'axios';

export const instantAxios = axios.create({
  baseURL: 'https://react-gift-mock-api-hyo2.vercel.app/api/',
});
