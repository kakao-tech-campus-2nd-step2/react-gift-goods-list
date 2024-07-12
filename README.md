# 요구사항

## Step1

- 첨부된 oas.yaml 파일을 토대로 Request, Response Type을 정의
- React Query를 사용하지 말고 axiou를 사용해서 구현
- 첨부된 oas.yaml 파일과 목 API URL을 사용하여 API를 구현

### 메인 페이지 - Themes 카테고리 섹션

- /api/vi/thmes API를 사용하여 Section을 구현
- API는 Axios 또는 React Query 등을 모두 활용해서 구현해도 가능

### 메인 페이지 - 실시간 급상승 선물생킹 섹션

- /api/v1/ranking/products API를 사용하여 Section을 구현
- 필터 조건을 선택하면 해당 조건에 맞게 API를 요청하여 보여지게 하기

### Theme 페이지 - header

- url의 pathParams와 /api/v1/themes API를 사용하여 Section을 구현
- themeKey 가 잘못 된 경우 메인 페이지로 연결

### Theme 페이지 - 상품 목록 섹션

- /api/v1/themes/{themeKey}/products API를 사용하여 상품 목록을 구현
- API 요청 시 한번에 20개의 상품 목록이 내려오도록

---

## Step2

- 각API에서 Loading 상태에 대한 UI 대응
- 데이터가 없는 경우에 대한 UI 대응
- Http Status 에 따라 Error를 다르게 처리

---

### step3

- 스크롤을 내리면 추가로 데이터를 요청하여 보여지게 하기
- 1단계에서 구현한 API를 react-query를 사용해서 구현
