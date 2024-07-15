import styled from '@emotion/styled';

import { RankingFilterOption } from '@/types';

type Props = {
  label: string;
  value: RankingFilterOption['rankType'];
  selected: boolean;
  onClick: (value: RankingFilterOption['rankType']) => void;
};

export const RankTypeButton = ({ label, value, selected, onClick }: Props) => {
  return (
    <StyledRankTypeButton value={value} selected={selected} onClick={() => onClick(value)}>
      {label}
    </StyledRankTypeButton>
  );
};

const StyledRankTypeButton = styled.button<Pick<Props, 'selected'>>`
  padding: 13px 20px;
  font-size: 16px;
  line-height: 16px;
  color: ${({ selected }) => (selected ? '#4684e9' : 'rgba(70, 132, 233, 0.7)')};
  font-weight: ${({ selected }) => (selected ? 700 : 400)};
  transition:
    color 200ms,
    font-weight 200ms;

  &:focus {
    outline: none;
  }
`;
