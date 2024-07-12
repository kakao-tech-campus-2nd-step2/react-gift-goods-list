import styled from '@emotion/styled';
import { useEffect, useRef } from 'react';
import { useInfiniteQuery } from 'react-query';

import { fetchData } from '@/components/api';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import Loading from '@/components/common/Loading/Loading';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';

type Props = {
  themeKey: string;
};

const generateRandomId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

const fetchThemeData = async ({ pageParam = '' }: { pageParam?: string }, themeKey: string) => {
  const maxResults = 20;
  const queryParams: Record<string, string | number> = pageParam
    ? { maxResults, pageToken: pageParam }
    : { maxResults };

  const data = await fetchData(`/api/v1/themes/${themeKey}/products`, queryParams);
  return {
    products: data.products.map((product: GoodsData) => ({
      ...product,
      id: generateRandomId(),
    })),
    nextPageToken: data.nextPageToken || null,
  };
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const { data, isLoading, isFetching, isError, fetchNextPage, hasNextPage } = useInfiniteQuery(
    ['themeGoods', themeKey],
    ({ pageParam }) => fetchThemeData({ pageParam }, themeKey),
    {
      getNextPageParam: (lastPage) => lastPage.nextPageToken,
    },
  );

  useEffect(() => {
    if (!hasNextPage || isFetching) return;
    const currentLoadMoreRef = loadMoreRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      {
        threshold: 1.0,
      },
    );
    if (currentLoadMoreRef) {
      observer.observe(currentLoadMoreRef);
    }
    return () => {
      if (currentLoadMoreRef) {
        observer.unobserve(currentLoadMoreRef);
      }
    };
  }, [hasNextPage, isFetching, fetchNextPage]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      );
    }

    if (isError) {
      return <NoItemsMessage>Error fetching data</NoItemsMessage>;
    }

    if (!data || data.pages[0].products.length === 0) {
      return <NoItemsMessage>상품이 없어요.</NoItemsMessage>;
    }

    const allProducts = data.pages.flatMap((page) => page.products);

    return (
      <Grid
        columns={{
          initial: 2,
          md: 4,
        }}
        gap={16}
      >
        {allProducts.map((goods) => (
          <DefaultGoodsItems
            key={goods.id}
            imageSrc={goods.imageURL}
            title={goods.name}
            amount={goods.price.sellingPrice}
            subtitle={goods.brandInfo.name}
          />
        ))}
      </Grid>
    );
  };

  const renderContent = () => {
    if (loading) {
      return (
        <LoadingWrapper>
          <Loading />
        </LoadingWrapper>
      );
    }

    if (currentGoods.length === 0) {
      return <NoItemsMessage>상품이 없어요.</NoItemsMessage>;
    }

    return (
      <Grid
        columns={{
          initial: 2,
          md: 4,
        }}
        gap={16}
      >
        {currentGoods.map((goods) => (
          <DefaultGoodsItems
            key={goods.id}
            imageSrc={goods.imageURL}
            title={goods.name}
            amount={goods.price.sellingPrice}
            subtitle={goods.brandInfo.name}
          />
        ))}
      </Grid>
    );
  };

  return (
    <Wrapper>
      <Container>
        {renderContent()}
        <div ref={loadMoreRef} />
      </Container>
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

const LoadingWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const NoItemsMessage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  color: #666;
  margin-top: 20px;
`;
