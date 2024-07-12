export type ThemeData = {
  id: number;
  key: string;
  label: string;
  title: string;
  description?: string;
  backgroundColor: string;
};

export type RankingFilterOption = {
  targetType: 'ALL' | 'FEMALE' | 'MALE' | 'TEEN';
  rankType: 'MANY_WISH' | 'MANY_RECEIVE' | 'MANY_WISH_RECEIVE';
};

export type GoodsData = {
  id: number;
  name: string;
  imageURL: string;
  wish: {
    wishCount: number;
    isWished: boolean;
  };
  price: {
    basicPrice: number;
    discountRate: number;
    sellingPrice: number;
  };
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
};

//ThemeCategorySection
export type Theme = {
  id: number;
  key: string;
  label: string;
  imageURL: string;
};
export type ThemeProps = {
  label: string;
  imageURL: string;
};

// GoodsRankingSection
export type product = {
  id: number;
  imageURL: string;
  name: string;
  price: {
    sellingPrice: number;
  };
  brandInfo: {
    name: string;
  };
};

export type ProductsListProps = {
  productsList: product[];
};
