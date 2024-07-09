interface wishData {
  isWished: boolean;
  wishCount: number;
}

interface priceData {
  basicPrice: number;
  sellingPrice: number;
  discountRate: number;
}

interface brandInfoData {
  id: number;
  name: string;
  imageURL: string;
}

interface Product {
  id: number;
  name: string;
  imageURL: string;
  wish: wishData;
  price: priceData;
  brandInfo: brandInfoData;
}

export interface ProductData {
  products: Product[];
}
