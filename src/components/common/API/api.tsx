import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://react-gift-mock-api-userjmmm.vercel.app/',
});

export default Api;