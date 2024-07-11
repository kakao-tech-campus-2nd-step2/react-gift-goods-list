import styled from '@emotion/styled';
import { useState } from 'react';

import { Button } from '@/components/common/Button/Button';
import { RankingGoodsItems } from '@/components/common/GoodsItem/Ranking';
import { Grid } from '@/components/common/layouts/Grid/Grid';
import { breakpoints } from '@/styles/variants';
import type { product } from '@/types/types';
import type { ProductsListProps } from '@/types/types';

export const GoodsRankingList = ({ productsList }: ProductsListProps) => {
  const [hasMore, setHasMore] = useState(false);
  const currentGoodsList = hasMore ? productsList : productsList.slice(0, 6);

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
        {currentGoodsList.map((product: product, index: number) => (
          <RankingGoodsItems
            key={product.id}
            rankingIndex={index + 1}
            imageSrc={product.imageURL}
            title={product.name}
            amount={product.price.sellingPrice}
            subtitle={product.brandInfo.name}
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
