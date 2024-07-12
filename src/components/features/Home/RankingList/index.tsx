import React from 'react';
import styled from '@emotion/styled';
import { Grid, Button, GoodsItem, Spinner, ErrorMessage } from '@components/common';
import useToggle from '@hooks/useToggle';
import useFetch from '@hooks/useFetch';
import { useFilter } from '@context/filter/useFilter';
import { getRankingProducts } from '@apis/ranking';
import { RankingProductsResponse } from '@/types/responseTypes';
import { TargetType, WishType } from '../Filter/constants';
import { RANKING_LIST } from './constants';

export default function RankingList() {
  const [showAll, toggleShowAll] = useToggle(false);
  const { selectedTarget, selectedWish } = useFilter();
  const { isLoading, isError, data } = useFetch<
    RankingProductsResponse,
    { targetType: TargetType; rankType: WishType }
  >(getRankingProducts, { targetType: selectedTarget, rankType: selectedWish });

  const displayedProducts = showAll ? data?.products : data?.products.slice(0, RANKING_LIST.INITIAL_DISPLAY_COUNT);

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage message={RANKING_LIST.ERROR_MESSAGE} />;
  if (data?.products.length === 0) return <NoProductsMessage>{RANKING_LIST.NO_PRODUCTS_MESSAGE}</NoProductsMessage>;

  return (
    <RankingListContainer>
      <Grid gap={RANKING_LIST.GRID_GAP} columns={RANKING_LIST.GRID_COLUMNS}>
        {displayedProducts?.map((product, index) => (
          <GoodsItem
            key={product.id}
            subtitle={product.brandInfo.name}
            imageSrc={product.imageURL}
            title={product.name}
            amount={product.price.basicPrice}
            rankingIndex={index + 1}
          />
        ))}
      </Grid>
      <ButtonContainer>
        <Button size="large" theme="primary" onClick={toggleShowAll}>
          {showAll ? '접기' : '더보기'}
        </Button>
      </ButtonContainer>
    </RankingListContainer>
  );
}

const RankingListContainer = styled.div`
  padding-top: 40px;
  padding-bottom: 60px;
`;

const ButtonContainer = styled.div`
  padding-top: 30px;
  width: 480px;
  margin: 0 auto;
`;

const NoProductsMessage = styled.div`
  padding: 20px;
  text-align: center;
`;
