import { Spacing } from '@/components/common/layouts/Spacing/Spacing';
import { AiDiscoveryBanner } from '@/components/features/Home/AiDiscoveryBanner/AiDiscoveryBanner';
import { GoodsRankingSection } from '@/components/features/Home/GoodsRankingSection/GoodsRankingSection';
import { SelectFriendsBanner } from '@/components/features/Home/SelectFriendsBanner/SelectFriendsBanner';
import { ThemeCategorySection } from '@/components/features/Home/ThemeCategorySection/ThemeCategorySection';

export const HomePage = () => {
  return (
    <>
      <SelectFriendsBanner />
      <ThemeCategorySection />
      <AiDiscoveryBanner />
      <Spacing
        height={{
          initial: 40,
          sm: 80,
          md: 120,
        }}
      />
      <GoodsRankingSection />
    </>
  );
};
