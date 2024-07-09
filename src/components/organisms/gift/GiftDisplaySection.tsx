import GoodsItem from '@components/molecules/goodsItem/GoodsItem';
import { useRef } from 'react';
import ResponsiveGrid from '@components/atoms/grid/responsive/ResponsiveGrid';
import { generateRandomId } from '@/utils';
import { ProductData } from '@/dto';

interface GiftDisplaySectionProps {
  products: ProductData[];
  indexed?: boolean,
  maxColumns: number,
  minColumns: number,
}

function GiftDisplaySection({
  products, indexed, maxColumns, minColumns,
}: GiftDisplaySectionProps) {
  const sectionRandomId = useRef(generateRandomId());

  return (
    <ResponsiveGrid gap={16} columnsDefault={maxColumns} columnsSm={minColumns}>
      {products.map((product, i) => {
        const key = `${sectionRandomId.current}-gift-${i}`;

        return (
          <GoodsItem
            imageSrc={product.imageURL}
            subtitle={product.brandInfo.name}
            title={product.name}
            amount={product.price.sellingPrice}
            rankingIndex={indexed ? i + 1 : undefined}
            key={key}
          />
        );
      })}
    </ResponsiveGrid>
  );
}

export default GiftDisplaySection;
