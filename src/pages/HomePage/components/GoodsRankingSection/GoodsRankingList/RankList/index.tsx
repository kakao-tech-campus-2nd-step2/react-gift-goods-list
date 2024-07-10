import { ProductData } from '@/types/productType';

import { RankingGoodsItem } from '@/components/ui/GoodsItem/Ranking';
import { Grid } from '@/components/ui/Layout/Grid';

import { itemContainerStyle } from './styles';

type RankListProps = {
  filteredRankList: ProductData[];
};

export const RankList = ({ filteredRankList }: RankListProps) => {
  return (
    <Grid
      columns={{
        initial: 3,
        lg: 6,
        md: 4,
        sm: 3,
      }}
      placeItems="start"
    >
      {filteredRankList.map(
        ({ id, imageURL, name, brandInfo, price }, index) => (
          <div key={id} css={itemContainerStyle}>
            <RankingGoodsItem
              imageSrc={imageURL}
              rank={index + 1}
              title={name}
              subtitle={brandInfo.name}
              amount={price.sellingPrice}
            />
          </div>
        )
      )}
    </Grid>
  );
};
