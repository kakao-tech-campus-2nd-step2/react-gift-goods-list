### 1단계 기능 요구사항

- React-Query를 사용하지 말고 axios를 사용해서 구현
- 첨부된 **`oas.yaml`** 파일과 mock API URL을 사용하여 API 구현

- [x] 첨부된 **`oas.yaml`** 파일을 토대로 Request, Response Type 정의
- 메인 페이지 - Theme 카테고리 섹션
  - [x] **`/api/v1/themes`** API를 사용하여 Section을 구현
- 메인 페이지 - 실시간 급상승 선물랭킹 섹션
  - [x] **`/api/v1/ranking/products`** API를 사용하여 Section 구현
  - [x] 필터 조건을 선택하면 해당 조건에 맞게 API 요청
- Theme 페이지 - header
  - [x] url의 pathParams와 **`/api/v1/themes`** API를 사용하여 Section 구현
  - [x] **`themeKey`**가 잘못된 경우, 메인 페이지로 연결
- Theme 페이지 - 상품 목록 섹션
  - [x] **`/api/v1/themes/{themeKey}/products`** API를 사용하여 상품 목록 구현
  - [x] API 요청 시, 한 번에 20개의 상품 목록이 내려오도록 구현
