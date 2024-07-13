import { InfiniteData } from '@tanstack/react-query';
import ProductSkeletonGrid
  from '@components/molecules/skeleton/ProductSkeletonGrid';
import GiftDisplaySection from '@components/organisms/gift/GiftDisplaySection';
import { useRef } from 'react';
import FetchStatusBoundary
  from '@components/atoms/container/FetchStatusBoundary';
import { ThemeProductsResponse } from '@/types/response';
import { generateRandomId } from '@/utils';
import { FetchStatusType } from '@/types';

interface ThemeProductDisplaySectionProps {
  productResponse?: InfiniteData<ThemeProductsResponse>;
  fetchStatus: FetchStatusType;
  isFetchingNextPage: boolean;
}

function ThemeProductDisplaySection({
  productResponse,
  fetchStatus,
  isFetchingNextPage,
}: ThemeProductDisplaySectionProps) {
  const productDisplayId = useRef(generateRandomId());

  return (
    <>
      <FetchStatusBoundary
        fetchStatus={fetchStatus}
        loadingComponent={
          <ProductSkeletonGrid columnsDefault={4} itemCount={8} columnsSm={2} />
        }
      >
        {productResponse?.pages?.map((page, index) => {
          const key = `${productDisplayId}-${index}`;

          return (
            <GiftDisplaySection
              products={page.products}
              maxColumns={4}
              minColumns={2}
              key={key}
            />
          );
        })}
      </FetchStatusBoundary>
      {isFetchingNextPage ? (
        <ProductSkeletonGrid columnsDefault={4} itemCount={4} columnsSm={2} />
      ) : null}
    </>
  );
}

export default ThemeProductDisplaySection;
