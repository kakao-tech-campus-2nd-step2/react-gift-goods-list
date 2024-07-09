# 3주차 상품리스트 구현  - api
## step1 📝구현사항
+ 첨부된 oas.yaml 파일을 토대로 Request, Response Type을 정의하기
+ axios 라이브러리 설치
* 메인페이지 - theme
    * /api/v1/themes API를 사용하여 Section을 구현
    * API는 Axios또는 React Query 등을 모두 활용해서 구현 가능
* 메인 페이지 - 실시간 급상승 선물랭킹
    * /api/v1/ranking/products API를 사용하여 Section을 구현
    * 필터 조건을 선택 하면 해당 조건에 맞게 API를 요청하여 보여지게 해야함
* Theme 페이지 - header
    * url의 pathParams와 /api/v1/themes API를 사용하여 Section을 구현
    * themeKey가 잘못 된 경우 메인 페이지로 연결
* Theme 페이지 - 상품 목록 섹션
    * /api/v1/themes/{themeKey}/products API를 사용하여 상품 목록을 구현
    *API 요청 시 한번에 20개의 상품 목록이 내려오게 구현
