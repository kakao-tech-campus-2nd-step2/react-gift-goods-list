interface ProductData {
    id: number;
    name: string;
    image: string;
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