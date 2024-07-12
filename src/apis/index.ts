import type { RankingFilterOption } from '@/types';
import type { Product, ProductWithInfo, Theme } from '@/types/product';

import type { GetThemesParams } from './product';
import { getProductWithTheme } from './product';
import { getRanking } from './ranking/index';
import { getThemes } from './theme';

class Mock {
  public getThemes: () => Promise<Theme[]>;

  public getRanking: (data: RankingFilterOption) => Promise<Product[]>;

  public getProductWithTheme: (item: GetThemesParams) => Promise<ProductWithInfo>;

  constructor() {
    //theme
    this.getThemes = getThemes;

    //ranking
    this.getRanking = getRanking;

    //product
    this.getProductWithTheme = getProductWithTheme;
  }
}

export default new Mock();
