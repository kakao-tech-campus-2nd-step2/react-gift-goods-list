import useFetchProducts from '@hooks/useFetchProducts';
import { useCallback, useState } from 'react';
import Container from '@components/atoms/container/Container';
import GiftDisplaySection from '@components/organisms/gift/GiftDisplaySection';
import { MAX_CONTENT_WIDTH } from '@styles/size';
import TargetFilterArea from '@components/organisms/main/ranking/TargetFilterArea';
import RankFilterArea from '@components/organisms/main/ranking/RankFilterArea';
import Button from '@components/atoms/button/Button';
import {
  RankingSectionTitle, RankingSectionTitleContainer,
} from '@components/organisms/main/ranking/RankingSection.styles';
import FetchStatusBoundary
  from '@components/atoms/container/FetchStatusBoundary';
import { TargetFilter, RankFilter } from '@/types';

function RankingSection() {
  const [targetFilter, setTargetFilter] = useState<TargetFilter>('ALL');
  const [rankFilter, setRankFilter] = useState<RankFilter>('MANY_WISH');
  const [isFolded, setIsFolded] = useState(true);

  const { products, fetchStatus } = useFetchProducts({ targetFilter, rankFilter });

  const DISPLAY_COUNT_WHEN_FOLDED = 6;

  const isButtonEnabled = useCallback(
    () => products.length >= DISPLAY_COUNT_WHEN_FOLDED,
    [products],
  );

  return (
    <Container elementSize="full-width" justifyContent="center">
      <Container
        elementSize="full-width"
        maxWidth={MAX_CONTENT_WIDTH}
        padding="0 16px 80px"
        flexDirection="column"
      >
        <RankingSectionTitleContainer>
          <RankingSectionTitle>
            실시간 급상승 선물랭킹
          </RankingSectionTitle>
        </RankingSectionTitleContainer>
        <TargetFilterArea currentFilter={targetFilter} setTargetFilter={setTargetFilter} />
        <RankFilterArea
          currentFilter={rankFilter}
          setPopularityFilter={setRankFilter}
        />
        <Container padding="40px 0 20px">
          <FetchStatusBoundary fetchStatus={fetchStatus}>
            <GiftDisplaySection
              products={isFolded ? products.slice(0, DISPLAY_COUNT_WHEN_FOLDED) : products}
              maxColumns={6}
              minColumns={3}
              indexed
            />
          </FetchStatusBoundary>
        </Container>
        <Container elementSize="full-width" justifyContent="center">
          <Container elementSize="full-width" maxWidth="480px">
            {
              isButtonEnabled()
                ? (
                  <Button
                    theme="lightGray"
                    elementSize={{ width: '100%', height: '60px' }}
                    text={isFolded ? '더보기' : '접기'}
                    onClick={() => {
                      setIsFolded(!isFolded);
                    }}
                  />
                )
                : null
            }
          </Container>
        </Container>
      </Container>
    </Container>
  );
}

export default RankingSection;
