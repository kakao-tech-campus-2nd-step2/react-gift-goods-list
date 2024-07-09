import BaseLayout from '@/layouts/BaseLayout';

import { BannerBottom } from './components/BannerBottom';
import { BannerTop } from './components/BannerTop';
import { GoodsRankingSection } from './components/GoodsRankingSection';
import { ThemeSection } from './components/ThemeSection';

export const HomePage = () => {
  return (
    <BaseLayout>
      <BannerTop />
      <ThemeSection />
      <BannerBottom />
      <GoodsRankingSection />
    </BaseLayout>
  );
};
