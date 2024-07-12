import styled from '@emotion/styled';
import { useState } from 'react';

import { Button } from '@/components/common/Button';
import { RankingGoodsItems } from '@/components/common/GoodsItem/RankingGoodsItem';
import { Grid } from '@/components/common/layouts/Grid';
import { ErrorMessageContainer } from '@/styles';
import { GoodsData } from '@/types';

type Props = {
  isError: boolean;
  goodsList: GoodsData[];
};

export const GoodsRankingList = ({ isError, goodsList }: Props) => {
  const [hasMore, setHasMore] = useState(false);

  if (isError) {
    return (
      <ErrorMessageContainer>데이터를 불러오는 중에 문제가 발생했습니다.</ErrorMessageContainer>
    );
  } else if (goodsList.length === 0) {
    return <ErrorMessageContainer>보여줄 상품이 없어요!</ErrorMessageContainer>;
  }

  const currentGoodsList = hasMore ? goodsList : goodsList.slice(0, 6);

  return (
    <StyledGoodsRankingList>
      <Grid columns={3} gap={16}>
        {currentGoodsList.map(({ id, imageURL, name, price, brandInfo }, index) => (
          <RankingGoodsItems
            key={id}
            rankingIndex={index + 1}
            imageSrc={imageURL}
            title={name}
            amount={price.sellingPrice}
            subtitle={brandInfo.name}
          />
        ))}
      </Grid>
      <ButtonWrapper>
        <Button
          theme="outline"
          style={{ maxWidth: '480px' }}
          onClick={() => {
            setHasMore((prev) => !prev);
          }}
        >
          {hasMore ? '접기' : '더보기'}
        </Button>
      </ButtonWrapper>
    </StyledGoodsRankingList>
  );
};

const StyledGoodsRankingList = styled.div`
  padding: 20px 0 30px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 30px;
`;
