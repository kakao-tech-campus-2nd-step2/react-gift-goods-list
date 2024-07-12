import React from 'react';
import styled from '@emotion/styled';
import { Grid, Button, GoodsItem, StatusHanlder } from '@components/common';
import useToggle from '@hooks/useToggle';
import useFetch from '@hooks/useFetch';
import { useFilter } from '@context/filter/useFilter';
import { getRankingProducts } from '@apis/ranking';
import { RankingProductsResponse } from '@/types/responseTypes';
import { TargetType, WishType } from '../Filter/constants';

const INITIAL_DISPLAY_COUNT = 6;
const GRID_GAP = 14;
const GRID_COLUMNS = 6;

export default function RankingList() {
  const [showAll, toggleShowAll] = useToggle(false);
  const { selectedTarget, selectedWish } = useFilter();
  const { isLoading, isError, data, error } = useFetch<
    RankingProductsResponse,
    { targetType: TargetType; rankType: WishType }
  >(getRankingProducts, { targetType: selectedTarget, rankType: selectedWish });

  const displayedProducts = showAll ? data?.products : data?.products.slice(0, INITIAL_DISPLAY_COUNT);
  const isEmpty = !data || data?.products.length === 0;

  return (
    <RankingListContainer>
      <StatusHanlder isLoading={isLoading} isError={isError} isEmpty={isEmpty} error={error}>
        <Grid gap={GRID_GAP} columns={GRID_COLUMNS}>
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
      </StatusHanlder>
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