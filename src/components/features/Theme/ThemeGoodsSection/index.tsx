import styled from '@emotion/styled';
import { useMemo } from 'react';

import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { GoodsData } from '@/types';
import useFetch from '@/utils/api';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const params = useMemo(() => ({ maxResults: 20 }), []);
  const { isLoading, isError, data } = useFetch<{ products: GoodsData[] }>(
    `/api/v1/themes/${themeKey}/products`,
    params,
  );

  const renderContent = () => {
    if (isLoading) {
      return <Description>로딩 중</Description>;
    }
    if (isError) {
      return <Description>에러가 발생했습니다.</Description>;
    }
    if (data && data.products.length > 0) {
      return (
        <Container>
          <Grid
            columns={{
              initial: 2,
              md: 4,
            }}
            gap={16}
          >
            {data.products.map(({ id, imageURL, name, price, brandInfo }) => (
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
      );
    }
    return <Description>상품이 없어요.</Description>;
  };

  return <Wrapper>{renderContent()}</Wrapper>;
};

const Wrapper = styled.section`
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;

const Description = styled.div`
  width: 100%;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;
