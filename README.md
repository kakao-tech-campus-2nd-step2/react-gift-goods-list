# 기능 목록

## step 1

- oas.yaml 파일과 목 API URL을 사용해서 API 구현하기
  ### 메인 페이지
  - [ ] Theme 카테고리 섹션: `/api/v1/themes` API를 사용하여 Section 구현
  - [ ] 실시간 급상승 선물랭킹 섹션 : `api/v1/ranking/products` API를 사용하여 Section 구현
  ### Theme 페이지
  - [ ] header : url의 pathParams와 `/api/v1/themes` API를 사용하여 Section을 구현
  - [ ] 상품 목록 섹션 : `/api/v1/themes/{themeKey}/products` API를 사용하여 상품 목록을 구현. API 요청 시 한번에 *20개의 상품 목록*이 내려오도록 한다.

## step 2

- [ ] 각 API에서 Loading 상태에 대한 UI 대응
- [ ] 데이터가 없는 경우에 대한 UI 대응
- [ ] Http Status에 따라 Error를 다르게 처리

## step 3

- [ ] 스크롤을 내리면 추가로 데이터를 요청하여 보여지게 한다.
- [ ] 1단계에서 구현한 API를 react-query를 사용해서 구현
