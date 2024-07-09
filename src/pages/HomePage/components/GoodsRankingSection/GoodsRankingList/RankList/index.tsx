import { ProductData } from '@/pages/HomePage/types';

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
      {filteredRankList.map((item, index) => (
        <div key={item.id} css={itemContainerStyle}>
          <RankingGoodsItem
            imageSrc={item.imageURL}
            rank={index}
            title={item.name}
            subtitle={item.brandInfo.name}
            amount={item.price.sellingPrice}
          />
        </div>
      ))}
    </Grid>
  );
};
