

export type ThemeData = { // /api/v1/themes
  id: number;
  key: string;
  label: string;
  imageUrl: string;
  title: string;
  description?: string;
  backgroundColor: string;
};

export type RankingFilterOption = {
  targetType: 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
  rankType: 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';
};

export type GoodsData = { // /api/v1/ranking/products && /api/v1/themes/{themeKey}/products
  id: number;
  name: string;
  imageURL: string;
  wish: {
    isWished: boolean;
    wishCount: number;
  };
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
};


export type ProductsData = {

}