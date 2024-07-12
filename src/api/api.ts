import axios from 'axios';

const instance = axios.create({
  baseURL: "https://react-gift-mock-api-joshuadesu.vercel.app/",
});

export default instance;