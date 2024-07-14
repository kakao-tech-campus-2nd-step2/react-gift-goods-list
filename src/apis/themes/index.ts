import { ThemesResponse } from '@/types/responseTypes';
import axiosInstance from '../instance';
import { THEME_PATHS } from './path';

export const getThemes = async (): Promise<ThemesResponse> => {
    const res = await axiosInstance.get<ThemesResponse>(THEME_PATHS.THEMES);
    return res.data;
};