export interface ProductData {
    id: number;
    name: string;
    imageURL: string;
    wish: {
        wishCount: number;
        isWished: boolean;
    }
    price: {
        basicPrice: number;
        discountRate: number;
        sellingPrice: number;
    }
    brandInfo: {
        id: number;
        name: string;
        imageURL: string;
    }
}

export interface RankedProducts {
    products: ProductData[];
}

export interface Products {
    products: ProductData[];
    nextPageToken: string;
    pageInfo: {
        totalResults: number;
        resultsPerPage: number;
    }
}