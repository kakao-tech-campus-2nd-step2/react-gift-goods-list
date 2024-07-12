import type { AxiosError } from 'axios';
import axios from 'axios';

import type {
  GoodsData,
  ProductsResponse,
  RankingFilterOption,
  RankingResponse,
  ThemesResponse,
} from '@/types';

// Axios 인스턴스 생성
export const api = axios.create({
  baseURL: 'https://react-gift-mock-api-ychy61.vercel.app',
});

// HTTP GET 요청 함수 정의
const getRequest = async <T>(url: string, params?: object): Promise<T> => {
  try {
    const response = await api.get<T>(url, { params });
    return response.data;
  } catch (error) {
    // handleRequestError 함수에서 setError 호출하지 않고 바로 throw error 처리
    throw error;
  }
};

// HTTP 요청 오류 처리 함수
const handleRequestError = (error: AxiosError, setError: (error: string | null) => void) => {
  if (error.response) {
    // 서버에서 응답이 도달했지만 HTTP 상태 코드가 에러인 경우
    const status = error.response.status;
    const data = error.response.data;

    if (status === 404) {
      console.error('요청한 데이터를 찾을 수 없습니다:', data);
      setError('요청한 데이터를 찾을 수 없습니다.');
    } else if (status === 401) {
      console.error('인증되지 않은 요청입니다:', data);
      setError('인증되지 않은 요청입니다.');
    } else {
      console.error(`서버에서 오류가 발생했습니다 (상태 코드 ${status}):`, data);
      setError(`서버에서 오류가 발생했습니다 (상태 코드 ${status}).`);
    }
  } else if (error.request) {
    // 요청이 서버에 도달하지 않은 경우
    console.error('서버에서 응답을 받지 못했습니다:', error.request);
    setError('서버에서 응답을 받지 못했습니다.');
  } else {
    // 요청을 설정하는 과정에서 오류가 발생한 경우
    console.error('요청 설정 중 오류가 발생했습니다:', error.message);
    setError('요청 설정 중 오류가 발생했습니다.');
  }
};

// 랭킹 상품 목록 가져오기
export const fetchRankingProducts = async (
  filterOption: RankingFilterOption,
  setError: (error: string | null) => void, // setError 함수 추가
): Promise<RankingResponse | null> => {
  try {
    const response = await getRequest<RankingResponse>('/api/v1/ranking/products', {
      params: {
        targetType: filterOption.targetType,
        rankType: filterOption.rankType,
      },
    });
    setError(null); // 에러 상태 초기화
    return response;
  } catch (error) {
    handleRequestError(error as AxiosError, setError); // handleRequestError 함수 호출
    return null; // 에러가 발생했을 경우 null 반환
  }
};

// 특정 테마의 상품 목록 가져오기
export const fetchThemeProducts = async (
  themeKey: string,
  setError: (error: string | null) => void, // setError 함수 추가
  pageSize = 20,
): Promise<GoodsData[]> => {
  try {
    const response = await getRequest<ProductsResponse>(`/api/v1/themes/${themeKey}/products`, {
      params: {
        pageSize,
      },
    });
    setError(null); // 에러 상태 초기화
    return response.products;
  } catch (error) {
    handleRequestError(error as AxiosError, setError); // handleRequestError 함수 호출
    throw error; // 에러를 다시 throw하여 상위 호출자에게 전파
  }
};

// 모든 테마 목록 가져오기
export const fetchThemes = async (
  setError: (error: string | null) => void, // setError 함수 추가
): Promise<ThemesResponse['themes']> => {
  try {
    const response = await getRequest<ThemesResponse>('/api/v1/themes');
    setError(null); // 에러 상태 초기화
    return response.themes;
  } catch (error) {
    handleRequestError(error as AxiosError, setError); // handleRequestError 함수 호출
    throw error; // 에러를 다시 throw하여 상위 호출자에게 전파
  }
};
