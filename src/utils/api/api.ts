import axios from 'axios';

import type { RankingFilterOption } from '@/types/types';
import { url } from '@/utils/url/url';

export const fetchData = async (path: string, params?: RankingFilterOption) => {
  try {
    const response = await axios.get(`${url}${path}`, { params });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      switch (error.response?.status) {
        case 400:
          throw new Error('400 error 잘못된 요청입니다.');
        case 401:
          throw new Error('401 error 인증이 필요합니다.');
        case 404:
          throw new Error('404 error 데이터를 찾을 수 없습니다.');
        case 500:
          throw new Error('500 error 서버에 문제가 발생했습니다.');
        default:
          throw new Error('error 알 수 없는 오류가 발생했습니다.');
      }
    }
  }
};
