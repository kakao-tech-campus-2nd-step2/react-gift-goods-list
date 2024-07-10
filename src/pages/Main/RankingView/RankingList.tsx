import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { RankingGoodsItems } from '@/components/common/GoodsItem/Ranking';
import { Grid } from '@/components/common/layouts/Grid';
import LoadingUI from '@/components/common/LoadingUI';
import type { RankedProducts } from '@/entities/Product';
import useGetData from '@/hooks/useGetData';

import type { RankType, TargetType } from './FilterType';

interface Props {
    showMoreDetail?: boolean;
    targetType: TargetType;
    rankType: RankType;
}

export default ({ showMoreDetail, targetType, rankType }: Props) => {
    const navigate = useNavigate();
    const items = useGetData<RankedProducts>(
        `ranking/products?targetType=${targetType}&rankType=${rankType}`,
    );
    useEffect(() => {
        if (items?.httpStatusCode !== 200)
            navigate(`/error/${items?.httpStatusCode}/main_rankingList`, { replace: true });
    }, [items?.httpStatusCode, navigate]);

    return (
        <Grid columns={{ initial: 2, xs: 3, sm: 3, md: 6 }} gap={20}>
            {items?.isLoading ? (
                <LoadingUI />
            ) : (
                items?.data?.products
                    .slice(0, showMoreDetail ? undefined : 6)
                    .map((item, index) => (
                        <RankingGoodsItems
                            key={item.id}
                            rankingIndex={index + 1}
                            imageSrc={item.imageURL}
                            subtitle={item.brandInfo.name}
                            title={item.name}
                            amount={item.price.sellingPrice}
                        />
                    ))
            )}
        </Grid>
    );
};
