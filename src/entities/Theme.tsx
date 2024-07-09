export interface ThemeData {
    id: number;
    key: string;
    label: string;
    title: string;
    description?: string;
    backgroundColor?: string;
}

// /api/v1/themes response
export interface Themes {
    themes: ThemeData[];
}