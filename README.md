# Step1

### Requirements

- `oas.yaml` 파일을 토대로 Request, Response Type 정의
- React Query를 사용하지 말고 axios를 사용해서 구현
- cjaqnehls `oas.yaml` 파일과 목 API URL을 사용하여 API구현
  - **메인 페이지 - Theme 카테고리 섹션**
    - `/api/v1/themes` API를 사용하여 Section 구현
    - API는 Axios 또는 React Query등을 모두 활용해서 구현해도 좋음
  - **메인 페이지 - 실시간 급상승 선물랭킹 섹션**
    - `/api/v1/ranking/products` API를 사용하여 Section을 구현
    - 필텅 조건을 선택하면 해당 조건에 맞게 API를 요청하여 보여지게 함
  - **Theme 페이지 - header**
    - url의 pathParams와 `/api/v1/themes` API를 사용하여 section을 구현
    - `themeKey`가 잘못 된 경우 메인 페이지로 연결
  - **Theme 페이지 - 상품 목록 섹션**
    - `/api/v1/themes/{themeKey}/products` API를 사용하여 상품 목록을 구현
    - API 요청 시 한번에 20개의 상품 목록이 내려오도록 함

# Step2

### Requirements

- 각 API에서 Loading 상태에 대한 UI대응
- 데이터가 없는 경우에 대한 UI 대응
- Http Status에 따라 Error를 다르게 처리

# Step3

### Requirements

- 스크롤을 내리면 추가로 데이터를 요청하여 보여지게 구현
- 1단계에서 구현한 API를 react-query를 사용하여 구현

# Step4

### Requirements

- 질문 1. CORS 에러는 무엇이고 언제 발생하는지 설명해주세요. 이를 해결할 수 있는 방법에 대해서도 설명해주세요.

  > **CORS** : Cross-Origin Resource Sharing, 한 도메인이 도메인 간의 요청을 가진 다른 도메인의 리소스에 액세스할 수 있게 해주는 보안 메커니즘으로 최신 브라우저에서 구현된 동일 출처 정책 때문에 등장
  > **동일 출처 정책** : 동일한 출처의 리소스에만 접근하도록 제한하는 정책(_출처란? Protocol, Host, 포트번호_)

  **해결방법**

  - 서버에서 Access-Control-Allow-Origin 헤더에 유효한 값을 포함하여 응답을 브라우저로 보냄
  - 프록시 서버 이용(_프록시 서버란? 브라우저와 서버 간의 통신을 도와주는 중계서버_)

- 질문 2. 비동기 처리 방법인 callback, promise, async await에 대해 각각 장단점과 함께 설명해주세요.
  **callback**
  : 다른 함수의 인자로 함수를 전달하여 처리할 수 있다.

  - 단점
    - 가독성 떨어짐(콜백 지옥)
    - 에러 처리가 복잡함

  **promise**
  : .then() 메소드를 이용하여 순차적으로 함수를 실행할 수 있다.

  - 장점
    - 콜백함수의 단점을 해결해줌
  - 단점
    - 처리해야할 작업이 많아지면 무한 .then()이 생김

  **async await**
  : 비동기식 코드를 동기식으로 표현하여 간단하게 나타낸 것

  - 장점
    - 콜백 지옥을 벗어날 수 있다.

- 질문 3. react query의 주요 특징에 대해 설명하고, queryKey는 어떤 역할을 하는지 설명해주세요.

  > **react query** : fetching, caching, 서버 데이터와의 동기화를 지원해주는 라이브러리

  1. 서버 상태 관리를 전문적으로 처리하는 라이브러리로 서버 상태를 효율적으로 관리할 수 있게 해줌
  2. 데이터 fetching과 caching을 자동으로 처리해줌
  3. 비동기 로직을 훨씬 간단하게 처리할 수 있는 훅(useQuery, useMutation) 제공

  **queryKey의 역할**

  - react query에서는 querykey를 기반으로 쿼리 캐싱을 관리함

