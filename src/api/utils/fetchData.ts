import axios, { AxiosResponse } from 'axios';

export const fetchData = async <T>(url: string, params?: object): Promise<T> => {
  try {
    const response: AxiosResponse<T> = await axios.get(url, { params });

    if (!response.data) {
      throw new Error('유효하지 않은 response입니다.');
    }

    return response.data;
  } catch (error) {
    console.error(`다음 url로부터 데이터 fetching에 실패하였습니다. ${url}:`, error);
    throw new Error('Failed to fetch data');
  }
};
