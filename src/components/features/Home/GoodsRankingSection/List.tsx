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
  /**
   * throwOnError: (error, query) => typeof query.state.data === 'undefined'
   * data가 undefined가 아님을 보장하기 위해 useSuspenseQuery의 throwOnError을 수정할 수 없다고 한다.
   * 여기서 useBaseQuery가 에러를 던지면 Errorboundary에서 잘는데 왜 overlay에는 uncaught에러가 뜨는거지????
   * 그냥 overlay를 끌까? iframe {display: none}
   * 다운 버전해서 useQuery를 써야하나? 많이 별론데
   */
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
