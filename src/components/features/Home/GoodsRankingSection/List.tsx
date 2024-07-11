import styled from '@emotion/styled';
import { useEffect, useState } from 'react';

import type { ProductData } from '@/api/types';
import { Button } from '@/components/common/Button';
import { RankingGoodsItems } from '@/components/common/GoodsItem/Ranking';
import { Grid } from '@/components/common/layouts/Grid';
import { ErrorMessage } from '@/components/features/Error/ErrorMessage';
import { breakpoints } from '@/styles/variants';

type Props = {
  goodsList: ProductData[];
  errorMessage: string | null;
};

export const GoodsRankingList = ({ goodsList, errorMessage }: Props) => {
  const [hasMore, setHasMore] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const currentGoodsList = hasMore ? goodsList : goodsList.slice(0, 6);

  useEffect(() => {
    if (errorMessage) {
      setMessage(errorMessage);
    } else if (goodsList.length === 0) {
      setMessage('보여줄 상품이 없어요!');
    } else {
      setMessage(null);
    }
  }, [goodsList, errorMessage]);

  if (message) {
    return <ErrorMessage message={message} />;
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
