import axios from 'axios';

const baseURL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000';

export const fetchThemes = async () => {
  const response = await axios.get(`${baseURL}/api/v1/themes`);
  return response.data;
};
