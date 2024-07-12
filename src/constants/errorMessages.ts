type ErrorMessagesType = {
  [key: number]: string;
  default: string;
  network: string;
};

export const ERROR_MESSAGES: ErrorMessagesType = {
  400: '잘못된 요청입니다.',
  403: '권한이 없습니다.',
  404: '찾을 수 없는 페이지입니다.',
  500: '서버 오류입니다.',
  default: '알 수 없는 오류가 발생했습니다.',
  network: '네트워크 오류가 발생했습니다.',
};
