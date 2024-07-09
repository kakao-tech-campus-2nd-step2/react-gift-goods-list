import type { ThemeData } from '@/types';

import { getThemes } from './theme';

class Mock {
  public getThemes: () => Promise<ThemeData[]>;

  constructor() {
    //theme
    this.getThemes = getThemes;
  }
}

export default new Mock();
