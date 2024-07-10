import styled from '@emotion/styled';
import { useState } from 'react';

import { RankTypeButton } from './RankTypeButton';
import { TargetTypeButton } from './TargetTypeButton';

export const GoodsRankingFilter = () => {
  const [selectedTarget, setSelectedTarget] = useState('ALL');
  const [selectedRank, setSelectedRank] = useState('MANY_WISH');
  const rankTypes = [
    { label: '받고 싶어한', value: 'MANY_WISH' },
    { label: '많이 선물한', value: 'MANY_RECEIVED' },
    { label: '위시로 받은', value: 'MANY_WISH_RECEIVED' },
  ];

  return (
    <StyledGoodsRankingFilter>
      <TargetTypeContainer>
        {['ALL', 'FEMALE', 'MALE', 'TEEN'].map((item) => (
          <TargetTypeButton
            key={item}
            value={item as 'ALL' | 'FEMALE' | 'MALE' | 'TEEN'}
            selected={selectedTarget === item}
            onClick={() => setSelectedTarget(item as 'ALL' | 'FEMALE' | 'MALE' | 'TEEN')}
          />
        ))}
      </TargetTypeContainer>
      <div
        style={{
          width: '100%',
          backgroundColor: 'inherit',
          height: '16px',
        }}
      />
      <RankTypeContainer>
        {rankTypes.map((rank) => (
          <RankTypeButton
            key={rank.value}
            label={rank.label}
            value={rank.value as 'MANY_WISH' | 'MANY_RECEIVED' | 'MANY_WISH_RECEIVED'}
            selected={selectedRank === rank.value}
            onClick={() =>
              setSelectedRank(rank.value as 'MANY_WISH' | 'MANY_RECEIVED' | 'MANY_WISH_RECEIVED')
            }
          />
        ))}
      </RankTypeContainer>
    </StyledGoodsRankingFilter>
  );
};

const StyledGoodsRankingFilter = styled.div`
  width: 100%;
  padding: 20px 0 7px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TargetTypeContainer = styled.div`
  display: flex;
`;

const RankTypeContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  border: 1px solid rgba(70, 132, 233, 0.1);
  background-color: #e6f1ff;
  border-radius: 8px;
`;
