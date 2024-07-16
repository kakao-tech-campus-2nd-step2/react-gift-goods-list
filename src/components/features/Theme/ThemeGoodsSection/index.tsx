import styled from '@emotion/styled';
import { useInfiniteQuery } from '@tanstack/react-query';
import { useCallback, useEffect } from 'react';

import { ApiService } from '@/api';
import type {
  GetThemeProductsParameters,
  GetThemeProductsResponse,
  ProductData,
} from '@/api/types';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { ErrorMessage } from '@/components/features/Error/ErrorMessage';
import { Loading } from '@/components/features/Loading/Loading';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { breakpoints } from '@/styles/variants';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const fetchThemeProductsPage = async ({ pageParam = 0 }): Promise<GetThemeProductsResponse> => {
    const params: GetThemeProductsParameters = {
      themeKey,
      pageToken: pageParam.toString(),
    };
    return ApiService.fetchThemeProducts(params);
  };

  const { data, error, fetchNextPage, hasNextPage, status } = useInfiniteQuery({
    queryKey: ['themeKey', themeKey],
    queryFn: fetchThemeProductsPage,
    getNextPageParam: (lastPage) =>
      lastPage.nextPageToken ? parseInt(lastPage.nextPageToken, 10) : undefined,
    initialPageParam: 0,
  });

  const goodsList: ProductData[] = data?.pages.flatMap((page) => page.products) ?? [];

  const { isIntersecting, setRef } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '0px',
  });

  const handleFetchNextPage = useCallback(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, hasNextPage, fetchNextPage]);

  useEffect(() => {
    handleFetchNextPage();
  }, [handleFetchNextPage]);

  if (status === 'pending') return <Loading message="로딩 중..." />;
  if (status === 'error') return <ErrorMessage message={(error as Error).message} />;

  return (
    <Wrapper>
      <Container>
        <Grid
          columns={{
            initial: 2,
            md: 4,
          }}
          gap={16}
        >
          {goodsList.map(({ id, imageURL, name, price, brandInfo }) => (
            <DefaultGoodsItems
              key={id}
              imageSrc={imageURL}
              title={name}
              amount={price.sellingPrice}
              subtitle={brandInfo.name}
            />
          ))}
        </Grid>
        {hasNextPage && <LoadingTrigger ref={setRef} />}
      </Container>
      {isLoading && <Loading message="로딩 중..." />}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;

const LoadingTrigger = styled.div`
  width: 100%;
  height: 20px;
`;
