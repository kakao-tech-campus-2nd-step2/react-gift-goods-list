# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편 Week3

[🔗 link](https://edu.nextstep.camp/s/hazAC9xa)

## ✏ 기능 목록

### STEP1

- [x] 메인페이지 API 연결
  - [x] Theme 카테고리 섹션 API 연결 : /api/v1/themes API 사용.
  - [x] 실시간 급상승 선물랭킹 섹션 API 연결 : /api/v1/ranking/products API 사용.
    - [x] 필터 조건을 선택하면 해당 조건에 맞게 API를 요청해서 보여지게 함.
- [x] Theme 페이지 API 연결
  - [x] Header API 연결 : url의 pathParams와 /api/v1/themes API 사용.
    - [x] themeKey가 잘못된 경우 메인페이지로 연결.
  - [x] 상품목록 섹션 API 연결 : /api/v1/themes/{themeKey}/products API 연결
    - [x] API 요청 시 한 번에 20개 상품 보여지도록 함.

### STEP2

- [x] 메인페이지 ThemeCategorySection 에러처리
- [x] 메인페이지 실시간 급상승 Section 에러처리
- [x] Theme페이지 헤더부분 에러처리
- [x] Tehme페이지 상품부분 에러처리

### STEP3

- [x] 스크롤 내리면 추가로 데이터 요청
- [ ] 1단계 API를 react-query를 사용해서 구현

### STEP4

- 질문 1. CORS 에러는 무엇이고 언제 발생하는지 설명해주세요. 이를 해결할 수 있는 방법에 대해서도 설명해주세요.
  CORS 에러란 웹페이지가 다른 도메인의 자원에 접근하려고 할 때 발생하는 보안 조치이다. 서버 응답 헤더에 Access-Control-Allow-Origin을 설정하여 특정 출처 혹은 모든 출처로부터의 요청을 허용하거나, 프록시서버를 사용하여 우회하는 등의 방법이 있다.
- 질문 2. 비동기 처리 방법인 callback, promise, async await에 대해 각각 장단점과 함께 설명해주세요.
  callback : 간단하고 가장 기초적인 방법이지만, 콜백 지옥으로 코드의 가독성과 유지보수성이 떨어질 수 있다.
  promise : 콜백지옥을 해결하는 방법으로, 연속적인 비동기 작업을 체인으로 연결하여 가독성이 높아지지만 복잡한 비동기 흐름을 관리하기 위해서는 추가적인 라이브러리가 필요할 수 있다.
  async/awiat : 비동기코드 작성에 있어 가독성이 높지만, 최종적으로 Promise를 반환하는 함수에서만 사용할 수 있다.
- 질문 3. react query의 주요 특징에 대해 설명하고, queryKey는 어떤 역할을 하는지 설명해주세요.
  react query는 데이터를 효율적으로 동기화하고 fetching하여 코드 수를 감소시키고, data fetching 방식을 규격화한다. queryKey는 react query에서 데이터를 식별하는데 사용되는 키로, 이 키를 통해 캐싱된 데이터에 접근할 수 있다.
