import type { Theme } from '@/types/product';

import { getThemes } from './theme';

class Mock {
  public getThemes: () => Promise<Theme[]>;

  constructor() {
    //theme
    this.getThemes = getThemes;
  }
}

export default new Mock();
