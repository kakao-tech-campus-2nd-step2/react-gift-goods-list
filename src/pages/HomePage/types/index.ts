import { ProductData } from '@/types/productType';

export type RankingFilter = {
  targetType: 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
  rankType: 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';
};

export type GetProductRankingRequest = {
  targetType?: RankingFilter['targetType'];
  rankType?: RankingFilter['rankType'];
};

export type GetRankingResponse = {
  products: ProductData[];
};
