/* @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import { Button } from '@/components/common/Button';
import { GoodsItem } from '@/components/common/GoodsItem';
import { Container } from '@/components/common/Layout/Container';
import { Grid } from '@/components/common/Layout/Grid';
import type { Product } from '@/services/types';

interface FilteredListProps {
  filterdList: Product[];
}
export const FilteredList = ({ filterdList }: FilteredListProps) => {
  const [more, setMore] = useState(false);
  const visibleItems = more ? filterdList : filterdList.slice(0, 6);

  return (
    <ListWrapper>
      <Container flexDirection="column" justifyContent="center" alignItems="center" maxWidth="1024px">
        <Grid
          columns={{ init: 3, xs: 3, sm: 4, md: 6 }}
          gap={20}
          css={css`
            padding: 50px 0px;
          `}
        >
          {visibleItems.map((item, index) => (
            <GoodsItem
              key={item.id}
              imageSrc={item.imageURL}
              subtitle={item.brandInfo.name}
              title={item.name}
              amount={item.price.basicPrice}
              rankingIndex={index + 1}
            />
          ))}
        </Grid>
        {filterdList.length > 6 && (
          <Button
            themetype="outline"
            onClick={() => setMore(!more)}
            css={css`
              max-width: 500px;
              max-height: 60px;
            `}
          >
            {more ? '접기' : '더보기'}
          </Button>
        )}
      </Container>
    </ListWrapper>
  );
};
const ListWrapper = styled.div`
  width: 100%;
`;
