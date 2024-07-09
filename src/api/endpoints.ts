const BASE_URL = 'https://react-gift-mock-api-00306.vercel.app';

export const ENDPOINTS = {
  THEMES: `${BASE_URL}/api/v1/themes`,
  RANKING_PRODUCTS: `${BASE_URL}/api/v1/ranking/products`,
  THEME_PRODUCTS: (themeKey: string) => `${BASE_URL}/api/v1/themes/${themeKey}/products`,
  PRODUCT_DETAILS: (productId: string) => `${BASE_URL}/api/v1/products/${productId}/detail`,
  PRODUCT_OPTIONS: (productId: string) => `${BASE_URL}/api/v1/products/${productId}/options`,
  MESSAGE_CARD_TEMPLATES: `${BASE_URL}/api/v1/message-card/templates`,
  MY_ACCOUNT_INFO: `${BASE_URL}/api/v1/my-account/info`,
  MY_WISH_PRODUCTS: `${BASE_URL}/api/v1/my-account/wish/products`,
  MY_ACCOUNT_POINT: `${BASE_URL}/api/v1/my-account/point`,
  ORDER: `${BASE_URL}/api/v1/order`,
};
