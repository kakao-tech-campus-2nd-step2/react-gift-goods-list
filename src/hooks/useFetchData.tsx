import type { AxiosError, AxiosResponse } from 'axios';
import axios from 'axios';
import { useState } from 'react';

interface FetchDataResult<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

type ApiCall<T, P> = (params: P) => Promise<AxiosResponse<T>>;

const useFetchData = <T, P>(apiCall: ApiCall<T, P>): [(params: P) => void, FetchDataResult<T>] => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async (params: P) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiCall(params);
      setData(response.data);
    } catch (err: unknown) {
      handleFetchError(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFetchError = (err: unknown) => {
    if (axios.isAxiosError(err)) {
      const axiosError = err as AxiosError<unknown, unknown>;
      if (axiosError.response) {
        switch (axiosError.response.status) {
          case 400:
            setError('잘못된 요청입니다.');
            break;
          case 401:
            setError('인증이 필요합니다.');
            break;
          case 403:
            setError('접근이 금지되었습니다.');
            break;
          case 404:
            setError('요청하신 리소스를 찾을 수 없습니다.');
            break;
          case 500:
            setError('서버에 오류가 발생했습니다.');
            break;
          default:
            setError(`오류가 발생했습니다: ${axiosError.response.status}`);
        }
      } else if (axiosError.request) {
        setError('서버로부터 응답이 없습니다.');
      } else {
        setError(`요청 오류: ${axiosError.message}`);
      }
    } else if (err instanceof Error) {
      setError(`알 수 없는 오류: ${err.message}`);
    } else {
      setError(`알 수 없는 오류가 발생했습니다.`);
    }
  };

  return [fetchData, { data, isLoading, error }];
};

export default useFetchData;
