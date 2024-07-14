import { Suspense } from 'react';

import { Spacing } from '@/components/common/layouts/Spacing';
import { GoodsRankingListLoading, ThemeCategoryLoading } from '@/components/common/Loader';
import RetryErrorBoundary from '@/components/common/RetryErrorBoundary';
import { AiDiscoveryBanner } from '@/components/features/Home/AiDiscoveryBanner';
import { GoodsRankingSection } from '@/components/features/Home/GoodsRankingSection';
import { SelectFriendsBanner } from '@/components/features/Home/SelectFriendsBanner';
import { ThemeCategorySection } from '@/components/features/Home/ThemeCategorySection';

export const HomePage = () => {
  return (
    <>
      <SelectFriendsBanner />
      <RetryErrorBoundary>
        <Suspense fallback={<ThemeCategoryLoading />}>
          <ThemeCategorySection />
        </Suspense>
      </RetryErrorBoundary>
      <AiDiscoveryBanner />
      <Spacing
        height={{
          initial: 40,
          sm: 80,
          md: 120,
        }}
      />
      <RetryErrorBoundary>
        <Suspense fallback={<GoodsRankingListLoading />}>
          <GoodsRankingSection />
        </Suspense>
      </RetryErrorBoundary>
    </>
  );
};
