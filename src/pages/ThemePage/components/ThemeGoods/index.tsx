import { ProductData } from '@/types/productType';

import { Content } from '@/components/Content';
import { GoodsItem } from '@/components/ui/GoodsItem/Default';
import { Grid } from '@/components/ui/Layout/Grid';

import { contentStyle } from './styles';

type ThemeGoodsProps = {
  products: ProductData[];
};

export const ThemeGoods = ({ products }: ThemeGoodsProps) => {
  return (
    <Content>
      <Grid
        gap={16}
        columns={{
          initial: 2,
          lg: 4,
          md: 2,
          sm: 2,
        }}
        css={contentStyle}
      >
        {products.map((product) => (
          <GoodsItem
            key={product.id}
            imageSrc={product.imageURL}
            subtitle={product.brandInfo.name}
            title={product.name}
            amount={product.price.sellingPrice}
          />
        ))}
      </Grid>
    </Content>
  );
};
