import axios from 'axios';

import type { RankingFilterOption } from '@/types/types';
import { url } from '@/utils/url/url';

export const fetchData = async (path: string, params?: RankingFilterOption) => {
  try {
    const response = await axios.get(`${url}${path}`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching themes:', error);
  }
};
