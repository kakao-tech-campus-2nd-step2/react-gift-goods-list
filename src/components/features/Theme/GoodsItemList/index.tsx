import React from 'react';
import styled from '@emotion/styled';
import { GoodsItem, Grid, CenteredContainer, StatusHandler } from '@components/common';
import { useParams } from 'react-router-dom';
import useGoodsItemListQuery from '@hooks/useGoodsItemListQuery';
import useInfiniteScroll from '@hooks/useInfiniteScroll';

const GRID_GAP = 14;
const GRID_COLUMNS = 4;
const MAX_RESULTS = 20;

export default function GoodsItemList() {
  const { themeKey } = useParams<{ themeKey: string }>();
  const stringThemeKey = themeKey as string;
  const { products, isLoading, isError, error, fetchNextPage, isFetchingNextPage, hasNextPage } = useGoodsItemListQuery(
    { themeKey: stringThemeKey, rowsPerPage: MAX_RESULTS },
  );
  const ref = useInfiniteScroll({ fetchNextPage, hasNextPage, isFetchingNextPage });

  const isEmpty = products.length === 0;

  return (
    <GoodsItemListContainer>
      <CenteredContainer maxWidth="md">
        <StatusHandler
          isLoading={isLoading}
          isError={isError}
          isEmpty={isEmpty}
          error={error}
          isFetchingNextPage={isFetchingNextPage}
        >
          <Grid gap={GRID_GAP} columns={GRID_COLUMNS}>
            {products.map((product) => (
              <GoodsItem
                key={product.id}
                imageSrc={product.imageURL}
                amount={product.price.basicPrice}
                subtitle={product.brandInfo.name}
                title={product.name}
              />
            ))}
            {hasNextPage && <div ref={ref} />}
          </Grid>
        </StatusHandler>
      </CenteredContainer>
    </GoodsItemListContainer>
  );
}

const GoodsItemListContainer = styled.section`
  padding-top: 40px;
  padding-bottom: 360px;
`;
