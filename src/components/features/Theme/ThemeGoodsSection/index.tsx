import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import useProduct from '@/hooks/querys/useProduct';
import { breakpoints } from '@/styles/variants';
import type { Product } from '@/types/product';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const [product, setProduct] = useState<Product[] | null>(null);
  const { data, fetchNextPage, hasNextPage, error, isLoading } = useProduct(themeKey);
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, data, hasNextPage]);

  useEffect(() => {
    if (!data) return;
    const products = data.pages.flatMap((page) => page.products);
    setProduct(products);
  }, [data]);

  return (
    <Wrapper>
      <Container>
        <Grid
          columns={{
            initial: 2,
            md: 4,
          }}
          gap={16}
        >
          {isLoading && <div>Loading...</div>}
          {Boolean(error) && <div>{(error as Error).toString()}</div>}
          {data && product?.length === 0 && <div>데이터가 없습니다. 🥲</div>}
          {product?.map(({ id, imageURL, name, price, brandInfo }) => (
            <DefaultGoodsItems
              key={id}
              imageSrc={imageURL}
              title={name}
              amount={price.sellingPrice}
              subtitle={brandInfo.name}
            />
          ))}
        </Grid>
      </Container>
      <div ref={ref} />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;
