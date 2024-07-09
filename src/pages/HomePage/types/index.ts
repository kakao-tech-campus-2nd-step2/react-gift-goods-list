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
