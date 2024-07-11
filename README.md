## step1 요구사항

1. API 타입 정의

- [o] OAS 파일을 참조하여 Request 및 Response 타입 정의

2. Axios API 구현

- [ｏ] 각 API 경로별로 함수 구현

3. Main Page

- [o] 테마 카테고리 섹션 : /api/v1/themes API 활용
- [ｏ] 실시간 급상승 선물랭킹 섹션 : /api/v1/ranking/products 활용
- [ｏ] 필터 조건을 선택하면 해당 조건에 맞게 api 보임

4. Theme Page

- [ｏ] Header : url의 themekey 사용
- [ｏ] url의 pathParams와 /api/vi/themes API를 사용
- [ｏ] themeKey가 잘못된 경우 메인 페이지로
- [ｏ] 요청시 한번에 20개의 상품 목록이 내려오도록 구현

## step2 요구사항

- [o] 각 API에서 Loading 상태에 대한 UI 대응
- [o] 각 데이터가 없는 경우에 대한 UI 대응
- [o] HTTP status에 따라 Error 다르게 처리

## step3 요구사항

- [] 스크롤을 내리면 추가로 데이터 요청
- [o] API를 react-query로 구현
