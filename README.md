### How to Start
    npm i
    npm run start

### Step 1
- [x] 본인만의 기준으로 일관된 코드를 작성해주세요.
- [x] 첨부된 `oas.yaml` 파일을 토대로 Request, ResponseType을 정의해요.
- [x] React Query를 사용하지 말고 axios를 사용해서 구현해요.
- [x] 메인 페이지 - Theme 카테고리 섹션
- [x] `/api/v1/themes` API를 사용하여 Section을 구현해요.
- [x] API는 Axios 또는 React Query 등을 모두 활용해서 구현해도 좋아요.
- [x] 메인 페이지 - 실시간 급상승 선물행킹 섹션
- [x] `api/v1/ranking/products` API를 사용하여 Section을 구현해요. (Axios 사용가능)
- [x] 필터 조건을 선택 하면 해당 조건에 맞게 API를 요청하여 보여지게 해요.
- [x] Theme 페이지 - header
- [x] url의 pathParams와 `api/v1/themes` API를 사용하여 Section을 구현해요.
- [x] `themeKey`가 잘못 된 경우 메인 페이지로 연결해요.
- [x] Theme 페이지 - 상품 목록 섹션
- [x] `/api/v1/themes/{themeKey}/products`API를 사용하여 상품 목록을 구현해요.
- [x] API 요청 시 한번에 20개의 상품 목록이 내려오도록 해요.