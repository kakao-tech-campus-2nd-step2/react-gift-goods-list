import styled from '@emotion/styled';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getRankingProducts } from '@/apis/products/products';
import { Button } from '@/components/common/Button';
import { RankingGoodsItems } from '@/components/common/GoodsItem/Ranking';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { RankingFilterOption } from '@/types';

type Props = {
  filterOption: RankingFilterOption;
};

export const GoodsRankingList = ({ filterOption }: Props) => {
  const { data } = useSuspenseQuery({
    queryKey: ['goodsRanking', filterOption],
    queryFn: () => getRankingProducts(filterOption),
  });
  const [hasMore, setHasMore] = useState(false);
  const products: Home.ProductData[] = data?.products ?? [];

  const currentGoodsList = hasMore ? products : products.slice(0, 6);

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

// export default GoodsRankingList;
