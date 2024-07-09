// theme 카테고리 섹션
export type ThemeData = {
  id: number;
  key: string;
  label: string;
  imageURL?: string;
  title: string;
  description?: string;
  backgroundColor?: string;
};

export type GetThemesResponse = {
  themes: ThemeData[];
};

// 실시간 급상승 선물랭킹 섹션
export type RankingFilter = {
  targetType: 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
  rankType: 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';
};

export type GetProductRankingRequest = {
  targetType?: RankingFilter['targetType'];
  rankType?: RankingFilter['rankType'];
};

interface Wish {
  wishCount: number;
  isWished: boolean;
}

interface Price {
  basicPrice: number;
  discountRate: number;
  sellingPrice: number;
}

interface BrandInfo {
  id: number;
  name: string;
  imageURL: string;
}

export type ProductData = {
  id: number;
  name: string;
  imageURL: string;
  wish: Wish;
  price: Price;
  brandInfo: BrandInfo;
};

export type GetRankingResponse = {
  products: ProductData[];
};
