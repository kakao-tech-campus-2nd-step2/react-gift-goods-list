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
