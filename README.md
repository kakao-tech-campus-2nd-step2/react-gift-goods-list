## step1 요구사항

1. API 타입 정의

- [o] OAS 파일을 참조하여 Request 및 Response 타입 정의

2. Axios API 구현

- [] 각 API 경로별로 함수 구현

3. Main Page

- [o] 테마 카테고리 섹션 : /api/v1/themes API 활용
- [] 실시간 급상승 선물랭킹 섹션 : /api/v1/ranking/products 활용
- [] 필터 조건을 선택하면 해당 조건에 맞게 api 보임

4. Theme Page

- [] Header : url의 themekey 사용
- [] url의 pathParams와 /api/vi/themes API를 사용
- [] themeKey가 잘못된 경우 메인 페이지로
- [] 요청시 한번에 20개의 상품 목록이 내려오도록 구현
