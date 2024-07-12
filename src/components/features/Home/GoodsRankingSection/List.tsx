import styled from '@emotion/styled';
import { useState } from 'react';

import { Button } from '@/components/common/Button';
import { RankingGoodsItems } from '@/components/common/GoodsItem/Ranking';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';

type Props = {
  goodsList: GoodsData[];
};

export const GoodsRankingList = ({ goodsList }: Props) => {
  const [hasMore, setHasMore] = useState(false);

  // 더보기 버튼을 표시할 아이템 개수
  const displayCount = 6;

  // 현재 보여줄 아이템 리스트
  const currentGoodsList = hasMore ? goodsList : goodsList.slice(0, displayCount);

  // 더보기 버튼을 표시할 조건
  const showMoreButton = goodsList.length > displayCount;

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
      {showMoreButton && (
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
      )}
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
