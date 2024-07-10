# 🚀 1단계 - API 적용하기

## 🚀 Getting Started

- ✔️ Frontend에서 비동기 데이터를 처리하는 방법에 대해 고민
- ✔️ Axios 만을 사용해서 React에서 비동기 데이터를 구현
- ✔️ Suspense, Error Boundary를 사용하지 않고 fetch State를 관리

## 📝 기능 목록

- [ ] <b>첨부된 `oas.yaml` 파일을 토대로 Request, Response Type을 정의</b>

- [ ] <b>React Query를 사용하지 말고 axios 를 사용해서 구현</b>

- [ ] <b>첨부된 `oas.yaml` 파일과 목 API URL을 사용하여 API를 구현</b>

- <b>메인 페이지 - Theme 카테고리 섹션</b>
  - [ ] /api/v1/themes API를 사용하여 Section을 구현
  - [ ] API는 Axios또는 React Query 등을 모두 활용해서 구현해도 좋음
- <b>메인 페이지 - 실시간 급상승 선물랭킹 섹션</b>
  - [ ] `/api/v1/ranking/products` API를 사용하여 Section을 구현 (Axios 사용 가능)
  - [ ] 필터 조건을 선택 하면 해당 조건에 맞게 API를 요청하여 보여지게 할 것
- <b>Theme 페이지 - header</b>
  - [ ] url의 pathParams와 `/api/v1/themes` API를 사용하여 Section을 구현
  - [ ] `themeKey`가 잘못 된 경우 메인 페이지로 연결
- <b>Theme 페이지 - 상품 목록 섹션</b>
  - [ ] `/api/v1/themes/{themeKey}/products` API를 사용하여 상품 목록을 구현
  - [ ] API 요청 시 한번에 20개의 상품 목록이 내려오도록 구현
