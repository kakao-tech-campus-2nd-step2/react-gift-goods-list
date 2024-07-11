declare namespace Home {
    /**
     * ProductData
     */
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

    export interface ProductData {
        id: number;
        name: string;
        imageURL: string;
        wish: Wish;
        price: Price;
        brandInfo: BrandInfo;
    }

    /**
     * ProductDetailData
     */
    type Review = {
        averageRating: number;
        totalReviewCount: number;
    };

    type ProductDescription = {
        images: string[];
    };

    type Announcement = {
        displayOrder: number;
        name: string;
        value: string;
    };

    type Terms = {
        displayOrder: number;
        title: string;
        description: string;
    };

    export interface ProductDetailData extends ProductData {
        isAccessableProductPage: boolean;
        review: Review;
        productDescription: ProductDescription;
        productDetailInfo: {
            announcements: Announcement[];
            terms: Terms[];
        };
    }

    /**
     * ProductOrderRequestBody
     */

    type CashReceiptType = 'PERSONAL' | 'BUSINESS';

    export interface ProductOrderRequestBody {
        productId: number;
        productOptionId: number;
        productQuantity: number;
        messageCardTemplateId: number;
        messageCardTextMessage: string;
        senderId: number;
        receiverId: number;
        hasCashReceipt: boolean;
        cashReceiptType?: CashReceiptType;
        cashReceiptNumber?: string;
    }

    /**
     * Response
     */
    export interface ProductDetailResponse extends ProductDetailData {}

    export interface RankingProductsResponse {
        products: ProductData[];
    }
}