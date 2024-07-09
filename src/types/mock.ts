import axios from 'axios';

import type { GoodsData, ThemeData } from '.';

export const fetchThemeData = async (): Promise<ThemeData[]> => {
  try {
    const response = await axios.get('https://kakao-tech-campus-mock-server.vercel.app/api/v1/themes');
    return response.data.themes;
  } catch (error) {
    console.error('Failed to fetch theme data:', error);
    return [];
  }
};

export const ThemeMockList: ThemeData[] = [];

export const GoodsMockData: GoodsData = {
  id: 123,
  name: 'BBQ 양념치킨+크림치즈볼+콜라1.25L',
  imageURL:
    'https://st.kakaocdn.net/product/gift/product/20231030175450_53e90ee9708f45ffa45b3f7b4bc01c7c.jpg',
  wish: {
    wishCount: 201,
    isWished: false,
  },
  price: {
    basicPrice: 29000,
    discountRate: 0,
    sellingPrice: 29000,
  },
  brandInfo: {
    id: 2088,
    name: 'BBQ',
    imageURL:
      'https://st.kakaocdn.net/product/gift/gift_brand/20220216170226_38ba26d8eedf450683200d6730757204.png',
  },
};

export const GoodsMockList: GoodsData[] = Array.from({ length: 21 }, () => GoodsMockData);
