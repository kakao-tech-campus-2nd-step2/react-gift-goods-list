import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://react-gift-mock-api-userjmmm.vercel.app/',
});

export const fetchData = async (endpoint: string, params = {}) => {
  try {
    const response = await Api.get(endpoint, { params });
    return response.data;
  } catch (error: any) {
      if (axios.isAxiosError(error)) {
        const { status, data } = error.response || {};
        const errorMessage = data?.description || '알 수 없는 오류가 발생했어요.';
        throw new Error(JSON.stringify({ status, message: errorMessage }));
      }
  }
};

export default Api;