# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편

## Week 3. 1단계 - API 적용하기

### 구현해야 할 기능 목록

- 첨부된 oas.yaml 파일을 토대로 Request, Response Type을 정의해요.
- React Query를 사용하지 말고 axios 를 사용해서 구현해요.
- 첨부된 oas.yaml 파일과 목 API URL을 사용하여 API를 구현해요.

`메인 페이지 - Theme 카테고리 섹션`

    - /api/v1/themes API를 사용하여 Section을 구현해요.
    - API는 Axios또는 React Query 등을 모두 활용해서 구현해도 좋아요.

`메인 페이지 - 실시간 급상승 선물랭킹 섹션`

    - /api/v1/ranking/products API를 사용하여 Section을 구현해요. (Axios 사용 가능)
    - 필터 조건을 선택 하면 해당 조건에 맞게 API를 요청하여 보여지게 해요.

`Theme 페이지 - header`

    - url의 pathParams와 /api/v1/themes API를 사용하여 Section을 구현해요.
    - themeKey가 잘못 된 경우 메인 페이지로 연결해요.

`Theme 페이지 - 상품 목록 섹션`

    - /api/v1/themes/{themeKey}/products API를 사용하여 상품 목록을 구현해요.
    - API 요청 시 한번에 20개의 상품 목록이 내려오도록 해요.

## Week 3. 2단계 - Error, Loading Status 핸들링 하기

### 구현해야 할 기능 목록

- 각 API에서 Loading 상태에 대한 UI 대응을 해요.
- 데이터가 없는 경우에 대한 UI 대응을 해요.
- Http Status에 따라 Error를 다르게 처리해요.

## Week 3. 3단계 - 테마 별 선물 추천 API에 페이지네이션 구현하기 & React Query 사용해보기

### 구현해야 할 기능 목록

- 스크롤을 내리면 추가로 데이터를 요청하여 보여지게 해요.
- 1단계에서 구현한 API를 react-query를 사용해서 구현해봐요.

## Week 3. 4단계 - 질문의 답변을 README에 작성

질문 1. CORS 에러는 무엇이고 언제 발생하는지 설명해주세요. 이를 해결할 수 있는 방법에 대해서도 설명해주세요.

- CORS는 한 도메인 또는 Origin의 웹 페이지가 다른 도메인을 가진 리소스에 액세스 할 수 있게 하는 보안 메커니즘이다. CORS는 서버와 클라이언트가 정해진 헤더를 통해 서로 요청이나 응답에 반응할지 결정하는 방식으로 CORS라는 이름으로 표준화 되었다. CORS는 최신 브라우저에서 구현된 동일 출처 정책(same-origin policy) 때문에 등장했다.
- CORS 에러는 웹 페이지가 자신의 도메인이 아닌 다른 도메인의 리소스를 요청할 때, 서버가 CORS 요청을 처리할 수 있도록 적절한 헤더를 설정하지 않았을 때 발생할 수 있다.
- CORS 에러를 해결하기 위해 서버에서 CORS 요청을 허용하도록 응답 헤더에 Access-Control-Allow-Origin 헤더를 추가하거나 프록시 서버를 사용할 수 있다.

질문 2. 비동기 처리 방법인 callback, promise, async await에 대해 각각 장단점과 함께 설명해주세요.

- callback: 간단한 비동기 작업에는 사용하기 쉽고 직관적이지만, 콜백 지옥이 발생할 수 있다.
- promise: 비동기 작업을 체인으로 연결할 수 있어 가독성이 비교적 좋지만, 복잡한 비동기 작업에서는 체인이 길어질 수 있다.
- async await: 비동기 코드를 동기식 코드처럼 작성할 수 있다. 구형 브라우저에서는 지원되지 않아 transpiling이 필요할 수 있다.

질문 3. react query의 주요 특징에 대해 설명하고, queryKey는 어떤 역할을 하는지 설명해주세요.

- React Query는 캐싱을 통해 애플리케이션의 속도를 향상시키고, 동일한 데이터에 대한 중복 요청을 제거한다. 또, 오래된 데이터의 상태를 파악하여 업데이트를 지원하고 비동기 과정을 선언적으로 관리할 수 있다.
- queryKey는 각 쿼리를 고유하게 식별하는 키로, 동일한 queryKey를 가진 쿼리는 같은 데이터를 공유한다. queryKey를 사용하여 데이터를 캐싱하고 필요에 따라 해당 키를 기준으로 데이터를 refetch한다.
