declare namespace Theme {
    /**
     * ThemeData
     */
    export type ThemeData = {
        id: number;
        key: string;
        label: string;
        title: string;
        description?: string;
        backgroundColor: string;
        imageURL?: string;
    };

    /**
     * Request
     */
    export interface GetThemeProductsType {
        themeKey: string;
        pageToken?: string;
        maxResults?: number;
    }

    /**
     * ThemesResponse
     */
    export interface ThemesResponse {
        themes: ThemeData[];
    }

    /**
     * ThemeProductsResponse
     */
    export type PageInfo = {
        totalResults: number;
        resultsPerPage: number;
    };

    export interface ThemeProductsResponse {
        products: Home.ProductData[];
        nextPageToken: string | null;
        pageInfo: PageInfo;
    }
}