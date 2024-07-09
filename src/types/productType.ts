type Wish = {
  wishCount: number;
  isWished: boolean;
};

type Price = {
  basicPrice: number;
  discountRate: number;
  sellingPrice: number;
};

type BrandInfo = {
  id: number;
  name: string;
  imageURL: string;
};

export type ProductData = {
  id: number;
  name: string;
  imageURL: string;
  wish: Wish;
  price: Price;
  brandInfo: BrandInfo;
};

export type RankingFilter = {
  targetType: 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
  rankType: 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';
};

export type GetProductRankingRequest = {
  targetType?: RankingFilter['targetType'];
  rankType?: RankingFilter['rankType'];
};

export type GetProductRankingResponse = {
  products: ProductData[];
};

export type GetProductsRequest = {
  pageToken?: string;
  maxResults?: number;
};

export type GetProductsResponse = {
  products: ProductData[];
  nextPageToken?: string | null;
  pageInfo?: {
    totalResults: number;
    resultsPerPage: number;
  };
};
