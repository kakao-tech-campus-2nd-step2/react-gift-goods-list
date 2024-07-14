export interface ProductData {
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
}

export interface ThemeData {
    id: number;
    key: string;
    label: string;
    title: string;
    description?: string;
    imageURL: string;
    backgroundColor?: string;
}

export interface MessageCardTemplateData {
    id: number;
    defaultTextMessage: string;
    thumbURL: string;
    imageURL: string;
}
