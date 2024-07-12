import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://react-gift-mock-api-userjmmm.vercel.app/',
});

export const fetchData = async (endpoint: string, params = {}) => {
  try {
    const response = await Api.get(endpoint, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};

export default Api;