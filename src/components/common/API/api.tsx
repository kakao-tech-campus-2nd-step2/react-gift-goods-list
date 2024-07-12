import axios from 'axios';

const Api = axios.create({
  baseURL: 'https://react-gift-mock-api-userjmmm.vercel.app/',
});

export const fetchData = async (endpoint: string, params = {}) => {
  try {
    const response = await Api.get(endpoint, { params });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) { // axios는 자동으로 JSON 변환해줌
      const code = error.response?.status?.toString() || 'UNKNOWN_ERROR';
      const description = error.response?.data?.description || '알 수 없는 오류가 발생했어요.';
      throw Object.assign(new Error(), {code, description });
    }
  }
};

export default Api;