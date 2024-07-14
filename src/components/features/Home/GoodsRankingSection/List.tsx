import styled from '@emotion/styled';
import { useState } from 'react';

import { Button } from '@/components/common/Button';
import { RankingGoodsItems } from '@/components/common/GoodsItem/Ranking';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';

type Props = {
  goodsList: GoodsData[];
  isLoading: boolean;
  error: string | null;
};

export const GoodsRankingList = ({ goodsList, isLoading, error }: Props) => {
  const [hasMore, setHasMore] = useState(false);

  const currentGoodsList = hasMore ? goodsList : goodsList.slice(0, 6);

  if (isLoading) {
    return <Loading>Loading...</Loading>;
  }

  if (error) {
    return <Error>{error}</Error>;
  }

  if (goodsList.length === 0) {
    return <NoData>보여줄 상품이 없어요!</NoData>;
  }

  return (
    <Wrapper>
      <Grid
        columns={{
          initial: 3,
          sm: 4,
          md: 6,
        }}
        gap={16}
      >
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
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 20px 0 30px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 0 60px;
  }
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-top: 30px;
`;

const Loading = styled.div`
  text-align: center;
  font-size: 18px;
`;

const Error = styled.div`
  color: red;
  text-align: center;
  font-size: 18px;
`;

const NoData = styled.div`
  text-align: center;
  font-size: 18px;
  padding: 20px 0;
`;
