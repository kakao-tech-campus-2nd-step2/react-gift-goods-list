import styled from '@emotion/styled';
import { useInfiniteQuery } from 'react-query';

import { fetchThemeProducts } from '@/api/api';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { GoodsData, InfiniteQueryResponse } from '@/types';


interface ThemeGoodsSectionProps {
  themeKey: string;
}

export const ThemeGoodsSection = ({ themeKey }: ThemeGoodsSectionProps) => {
  const {
    data,
    isLoading,
    isError,
    error,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery<InfiniteQueryResponse, Error>(
    ['themeProducts', themeKey],
    ({ pageParam = '' }) => fetchThemeProducts(themeKey, pageParam, 20), 
    {
      getNextPageParam: (lastPage) => lastPage.nextPageToken ?? undefined,
    }
  );

  if (isLoading) {
    return <LoadingMessage>Loading products...</LoadingMessage>;
  }

  if (isError) {
    return <ErrorMessage>Error: {error?.message}</ErrorMessage>;
  }

  const handleScroll = (event: React.UIEvent<HTMLElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight * 1.2 && hasNextPage) {
      fetchNextPage();
    }
  };

  return (
    <Wrapper onScroll={handleScroll}>
      <Container>
        <Grid columns={{ initial: 2, md: 4 }} gap={16}>
          {data?.pages.map((page) =>
            page.products.map((product: GoodsData) => (
              <DefaultGoodsItems
                key={product.id}
                imageSrc={product.imageURL}
                title={product.name}
                amount={product.price.sellingPrice}
                subtitle={product.brandInfo.name}
              />
            ))
          )}
        </Grid>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  overflow-y: auto;
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 16px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 20px;
  font-size: 16px;
`;