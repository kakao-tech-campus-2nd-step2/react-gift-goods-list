const API = {
  BASE_URL: process.env.REACT_APP_API_URL,
  THEMES: '/themes',
  RANKING: '/ranking/products',
  THEMES_DETAIL: (themeKey: string) => `/themes/${themeKey}/products`,
};

Object.freeze(API);

export default API;
