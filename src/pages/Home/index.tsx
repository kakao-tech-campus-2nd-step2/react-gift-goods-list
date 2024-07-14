import { Spacing } from '@/components/common/layouts/Spacing';
import { AiDiscoveryBanner } from '@/components/features/Home/AiDiscoveryBanner';
import { RankingSection } from '@/components/features/Home/RankingSection';
import { SelectFriendsBanner } from '@/components/features/Home/SelectFriendsBanner';
import { ThemeCategorySection } from '@/components/features/Home/ThemeCategorySection';

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
      <RankingSection />
    </>
  );
};
