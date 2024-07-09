
/*common types*/

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
	description: string;
	backgroundColor: string;
}


export interface ProductDetailData extends ProductData {
	isAccessableProductPage: boolean;
	review: {
		averageRating: number;
		totalReviewCount: number;
	};
	productDescription: {
		images: string[];
	};
	productDetailInfo: {
		announcements: {
		displayOrder: number;
		name: string;
		value: string;
	}[];
	terms: {
		displayOrder: number;
		title: string;
		description: string;
	}[];
	};
}

export interface MessageCardTemplateData {
	id: number;
	defaultTextMessage: string;
	thumbURL: string;
	imageURL: string;
}

export interface MyAccountInfoData {
	id: number;
	name: string;
	profileImageURL: string;
	point: number;
}

export interface ProductOrderRequestBody {
	productId: number;
	productOptionId: number;
	productQuantity: number;
	messageCardTemplateId: number;
	messageCardTextMessage: string;
	senderId: number;
	receiverId: number;
	hasCashReceipt: boolean;
	cashReceiptType?: 'PERSONAL' | 'BUSINESS';
	cashReceiptNumber?: string;
}

/* response types */

export interface GetRankingProductsResponse {
	products: ProductData[];
}

export interface GetThemesResponse {
	themes: ThemeData[];
}

export interface GetThemeProductsResponse {
	products: ProductData[];
	nextPageToken?: string;
	pageInfo: {
		totalResults: number;
		resultsPerPage: number;
	};
}

export interface GetProductDetailResponse {
	product: ProductDetailData;
}

export interface GetProductOptionsResponse {
	options: any;
	// 재귀적인 옵션 객체?
}

export interface GetMessageCardTemplatesResponse {
	templates: MessageCardTemplateData[];
}

export interface GetMyAccountInfoResponse {
	accountInfo: MyAccountInfoData;
}

export interface GetMyAccountWishProductsResponse {
	products: ProductData[];
	nextPageToken?: string;
}
