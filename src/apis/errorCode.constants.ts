const ERROR_MESSATE = {
  400: '잘못된 요청입니다.',
  404: '페이지를 찾을 수 없습니다.',
  500: '서버 에러가 발생했습니다.',
} as const;

Object.freeze(ERROR_MESSATE);

export default ERROR_MESSATE;
