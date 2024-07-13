import styled from '@emotion/styled';
import type { InfiniteData } from 'react-query';

import { fetchThemeProducts } from '@/api/theme';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { InfiniteWrapper } from '@/components/common/InfiniteWrapper';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';
import type { ProductData, ThemeProductResponse } from '@/types';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  return (
    <InfiniteWrapper<ThemeProductResponse>
      queryKey={['themeProducts', themeKey]}
      queryFn={({ pageParam = 0 }) => fetchThemeProducts(themeKey, 20, pageParam)}
    >
      {(data: InfiniteData<ThemeProductResponse>) => (
        <Wrapper>
          <Container>
            {data.pages.length === 0 ||
            (data.pages.length === 1 && data.pages[0].products.length === 0) ? (
              <Message>상품이 없어요.</Message>
            ) : (
              data.pages.map((page, pageIndex) => (
                <Grid
                  key={pageIndex}
                  columns={{
                    initial: 2,
                    md: 4,
                  }}
                  gap={16}
                >
                  {page.products.map(({ id, imageURL, name, price, brandInfo }: ProductData) => (
                    <DefaultGoodsItems
                      key={id}
                      imageSrc={imageURL}
                      title={name}
                      amount={price.sellingPrice}
                      subtitle={brandInfo.name}
                    />
                  ))}
                </Grid>
              ))
            )}
          </Container>
        </Wrapper>
      )}
    </InfiniteWrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
  padding: 28px 16px 180px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 40px 16px 360px;
  }
`;

const Message = styled.p`
  width: 100%;
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
`;
