import { fetchInstance } from './instance';

export const getThemes = async () => {
  try {
    const response = await fetchInstance.get('/v1/themes');
    return response.data;
  } catch (error) {
    console.error('Error fetching themes: ', error);
    throw error;
  }
};
