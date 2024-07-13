import styled from '@emotion/styled';

import { useThemeProducts } from '@/api/theme';
import { DefaultGoodsItems } from '@/components/common/GoodsItem/Default';
import { Container } from '@/components/common/layouts/Container';
import { Grid } from '@/components/common/layouts/Grid';
import { breakpoints } from '@/styles/variants';

type Props = {
  themeKey: string;
};

export const ThemeGoodsSection = ({ themeKey }: Props) => {
  const { data: products, error, isLoading } = useThemeProducts(themeKey);

  if (isLoading) return <MessageDiv>로딩 중...</MessageDiv>;
  if (error) return <MessageDiv color="red">상품을 불러오는 중 오류가 발생했습니다.</MessageDiv>;
  if (!products) return <MessageDiv>상품이 없습니다</MessageDiv>;
  if (products.products.length === 0) return <MessageDiv>상품이 없습니다</MessageDiv>;

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
          {products.products.map(({ id, imageURL, name, price, brandInfo }) => (
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

const MessageDiv = styled.div<{ color?: string }>`
  text-align: center;
  padding: 20px;
  font-size: 18px;
  color: ${({ color }) => color || '#666'};
`;
