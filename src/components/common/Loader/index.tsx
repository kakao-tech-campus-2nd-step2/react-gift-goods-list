import styled from '@emotion/styled';

//테마 카테고리
export const ThemeCategoryLoading = () => <Loader>카테고리를 불러오는 중입니다..</Loader>;
//실시간 선물 랭킹 상품 목록
export const GoodsRankingListLoading = () => <Loader>상품 목록을 불러오는 중입니다..</Loader>;
//themePage
export const ThemePageLoading = () => <Loader>테마별 상품 페이지를 불러오는 중입니다..</Loader>;

const Loader = styled.div({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  padding: '40px',
});
