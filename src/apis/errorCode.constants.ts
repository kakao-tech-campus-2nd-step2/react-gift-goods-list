const ERROR_MESSAGE = {
  400: '잘못된 요청입니다.',
  404: '페이지를 찾을 수 없습니다.',
  500: '서버 에러가 발생했습니다.',
} as const;

Object.freeze(ERROR_MESSAGE);

export default ERROR_MESSAGE;
