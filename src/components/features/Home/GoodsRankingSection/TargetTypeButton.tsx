import styled from '@emotion/styled';

import { RankingFilterOption } from '@/types/index';

type Props = {
  value: RankingFilterOption['targetType'];
  selected: boolean;
  onClick: (target: RankingFilterOption['targetType']) => void;
};

export const TargetTypeButton = ({ value, selected, onClick }: Props) => {
  const getTargetIcon = (targetValue: RankingFilterOption['targetType']) => {
    switch (targetValue) {
      case 'FEMALE':
        return '👩🏻‍🦳';
      case 'MALE':
        return '👨🏻‍🦳';
      case 'TEEN':
        return '👦🏻';
      default:
        return 'ALL';
    }
  };

  const getTargetText = (targetValue: RankingFilterOption['targetType']) => {
    switch (targetValue) {
      case 'FEMALE':
        return '여성이';
      case 'MALE':
        return '남성이';
      case 'TEEN':
        return '청소년이';
      default:
        return '전체';
    }
  };

  return (
    <StyledTargetTypeButton onClick={() => onClick(value)}>
      <Icon selected={selected}>{getTargetIcon(value)}</Icon>
      <Text selected={selected}>{getTargetText(value)}</Text>
    </StyledTargetTypeButton>
  );
};

const StyledTargetTypeButton = styled.button`
  width: 100%;
  min-width: 58px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & + & {
    padding-left: 16px;
  }

  &:focus {
    outline: none;
  }
`;

const Icon = styled.div<Pick<Props, 'selected'>>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 44px;
  height: 44px;
  border-radius: 16px;
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  background-color: ${({ selected }) => (selected ? '#4684e9' : '#e6f1ff')};
  transition: background-color 200ms;
`;
const Text = styled.p<Pick<Props, 'selected'>>`
  padding: 5px 0;
  font-size: 14px;
  line-height: 16px;
  color: ${({ selected }) => (selected ? '#4684e9' : '#666')};
  font-weight: ${({ selected }) => (selected ? 700 : 400)};
  transition:
    color 200ms,
    font-weight 200ms;
`;
