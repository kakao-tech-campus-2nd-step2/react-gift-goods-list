import styled from '@emotion/styled';

import type { Rank } from '.';
import type { IItem } from './Item';

import { RANK_FILTER_ITEMS } from '@/constant/Filter';

interface IRankFilter {
  rankValue: Rank;
  onRankChange: (type: Rank) => void;
}

export const RankFilter = ({ rankValue, onRankChange }: IRankFilter) => {
  return (
    <List>
      {RANK_FILTER_ITEMS.map((item) => (
        <Item key={item.text} name={item.name} rankValue={rankValue} onClick={() => onRankChange(item.name)}>
          {item.text}
        </Item>
      ))}
    </List>
  );
};
const List = styled.div`
  width: 100%;

  display: flex;
  flex-direction: row;
  justify-content: center;

  background-color: rgb(230, 241, 255);
  border-radius: 10px;
  border: 1px solid rgba(70, 132, 233, 0.1);
`;

const Item = styled.div<Pick<IItem, 'name' | 'rankValue'>>`
  font-size: 22px;
  padding: 20px 30px;
  font-weight: ${(props) => (props.rankValue === props.name ? 'bold' : '400')};
  color: ${(props) => (props.rankValue === props.name ? '#4684E9' : 'rgba(70, 132, 233, 0.7)')};
  cursor: pointer;
  transition:
    color 0.2s,
    font-weight 0.2s;

  @media screen and (max-width: 768px) {
    font-size: 16px;
    padding: 14px 30px;
  }
`;
