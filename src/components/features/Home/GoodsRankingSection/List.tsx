import styled from '@emotion/styled';
import { useReducer } from 'react';

import { Button } from '@/components/common/Button';
import { RankingGoodsItems } from '@/components/common/GoodsItem/Ranking';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';

type Props = {
  goodsList: GoodsData[];
};

function hasMoreReducer(state: boolean, action: { type: 'TOGGLE' }): boolean {
  switch (action.type) {
    case 'TOGGLE':
      return !state;
    default:
      return state;
  }
}

export const GoodsRankingList = ({ goodsList }: Props) => {
  const [hasMore, toggleHasMore] = useReducer(hasMoreReducer, false);

  const currentGoodsList = hasMore ? goodsList : goodsList.slice(0, 6);

  return (
    <Wrapper>
      {goodsList.length === 0 ? (
        <p>데이터가 없습니다. 🥲</p>
      ) : (
        <>
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
              onClick={() => toggleHasMore({ type: 'TOGGLE' })}
            >
              {hasMore ? '접기' : '더보기'}
            </Button>
          </ButtonWrapper>
        </>
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
