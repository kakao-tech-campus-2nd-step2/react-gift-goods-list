import type { APIError } from '@/api/types';

export const handleApiError = (error: APIError): string => {
  return error.message || '알 수 없는 오류가 발생했습니다.';
};
