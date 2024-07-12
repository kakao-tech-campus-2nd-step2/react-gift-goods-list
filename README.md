### Step1 과제 요구 사항

- [] 첨부된 oas.yaml 파일을 토대로 Request, Response Type을 정의해요.

- [] React Query를 사용하지 말고 axios 를 사용해서 구현해요.

- [] 첨부된 oas.yaml 파일과 목 API URL을 사용하여 API를 구현해요.

+ 메인 페이지 - Theme 카테고리 섹션

- [] /api/v1/themes API를 사용하여 Section을 구현해요.

- [] API는 Axios또는 React Query 등을 모두 활용해서 구현해도 좋아요.

+ 메인 페이지 - 실시간 급상승 선물랭킹 섹션

- [] /api/v1/ranking/products API를 사용하여 Section을 구현해요. (Axios 사용 가능)

- [] 필터 조건을 선택 하면 해당 조건에 맞게 API를 요청하여 보여지게 해요.

+ Theme 페이지 - header

- [] url의 pathParams와 /api/v1/themes API를 사용하여 Section을 구현해요.

- [] themeKey가 잘못 된 경우 메인 페이지로 연결해요.

+ Theme 페이지 - 상품 목록 섹션

- [] /api/v1/themes/{themeKey}/products API를 사용하여 상품 목록을 구현해요.

- [] API 요청 시 한번에 20개의 상품 목록이 내려오도록 해요.
