import styled from '@emotion/styled';
import type { AxiosError } from 'axios';
import { useState } from 'react';

import { Button } from '@/components/common/Button';
import { RankingGoodsItems } from '@/components/common/GoodsItem/Ranking';
import { Grid } from '@/components/common/layouts/Grid';
import { Spinner } from '@/components/common/Spinner';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';
import { handleError } from '@/utils/errorHandler';

type Props = {
  goodsList: GoodsData[];
  loading: boolean;
  error: AxiosError | null;
};

export const GoodsRankingList = ({ goodsList, loading, error }: Props) => {
  const [hasMore, setHasMore] = useState(false);

  const currentGoodsList = hasMore ? goodsList : goodsList.slice(0, 6);

  if (loading) {
    return (
      <Wrapper>
        <Spinner />
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      {error !== null ? (
        <div>{handleError(error)}</div>
      ) : goodsList.length === 0 ? (
        <div>보여줄 상품이 없어요!</div>
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
              onClick={() => {
                setHasMore((prev) => !prev);
              }}
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
  width: 100%;
  padding: 20px 0 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
