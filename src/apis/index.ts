import type { RankingFilterOption } from '@/types';
import type { Product, Theme } from '@/types/product';

import { getRanking } from './ranking/index';
import { getThemes } from './theme';

class Mock {
  public getThemes: () => Promise<Theme[]>;

  public getRanking: (data: RankingFilterOption) => Promise<Product[]>;

  constructor() {
    //theme
    this.getThemes = getThemes;

    //ranking
    this.getRanking = getRanking;
  }
}

export default new Mock();
