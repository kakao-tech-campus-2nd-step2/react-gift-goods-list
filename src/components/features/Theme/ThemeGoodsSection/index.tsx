import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';

import { fetchThemeProducts } from '@/apis/fetch';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';

type Props = {
  themeKey: string;
};

interface GoodsDataArray {
  products: GoodsData[];
}

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const [products, setProducts] = useState<GoodsData[]>([]);
  const [pageNumber, setPageNumber] = useState(1);

  let currentStatus;

  const {
    data = {
      products: [],
    },
    isError,
    isLoading,
  } = useQuery<GoodsDataArray>({
    queryKey: ['themeProducts', themeKey, pageNumber],
    queryFn: () => fetchThemeProducts(themeKey, pageNumber),
  });

  useEffect(() => {
    if (data && data.products.length > 0) {
      setProducts((prevProducts) => [...prevProducts, ...data.products]);
    }
  }, [data]);

  useEffect(() => {
    const currentRef = ref.current;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setPageNumber((prev) => prev + 1);
          }
        });
      },
      { root: null, threshold: 0.8 },
    );

    if (data.products.length === 0) {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      return;
    }

    if (!isLoading && currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, isLoading, data.products.length]);

  if (isLoading) currentStatus = <StatusDiv>로딩중...</StatusDiv>;
  else if (isError) currentStatus = <StatusDiv>에러에러에러</StatusDiv>;
  else if (products.length === 0) currentStatus = <StatusDiv>상품이 없어요.</StatusDiv>;

  return (
    <Wrapper>
      <Container>
        {currentStatus}
        <Grid
          columns={{
            initial: 2,
            md: 4,
          }}
          gap={16}
        >
          {products.map(({ id, imageURL, name, price, brandInfo }) => (
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
      <div ref={ref} style={{ width: '100%', height: '200px' }} />
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

const StatusDiv = styled.div`
  width: 100%;
  text-align: center;
  padding: 40px 16px 60px;
`;
