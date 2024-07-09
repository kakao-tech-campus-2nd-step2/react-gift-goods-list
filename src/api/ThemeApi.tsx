import axios from 'axios';

const BASE_URL = 'https://react-gift-mock-api-harugi7.vercel.app/';

export const themeApi = async (endpoint: string) => {
  try {
    const response = await axios.get(`${BASE_URL}${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};
