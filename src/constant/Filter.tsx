export const TARGET_FILTER_ITEMS = [
  { name: 'ALL', icon: 'ALL', text: '전체' },
  { name: 'FEMALE', icon: '👩🏻', text: '여성이' },
  { name: 'MALE', icon: '👨🏻', text: '남성이' },
  { name: 'TEEN', icon: '👦🏻', text: '청소년이' },
] as const;

export const RANK_FILTER_ITEMS = [
  { name: 'MANY_WISH', text: '받고 싶어한' },
  { name: 'MANY_RECEIVE', text: '많이 선물한' },
  { name: 'MANY_WISH_RECEIVE', text: '위시로 받은' },
] as const;
