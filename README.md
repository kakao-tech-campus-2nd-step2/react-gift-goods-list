# 카카오 테크 캠퍼스 - 프론트엔드 카카오 선물하기 편

[🔗 link](https://edu.nextstep.camp/s/hazAC9xa/ls/WAz8qraH)

---

## Week 3

### Step 1

- [x] 첨부된 oas.yaml 파일을 토대로 Request, Response Type 정의
- [x] React Query를 사용하지 말고 axios를 사용해서 구현
- [x] 첨부된 oas.yaml 파일과 목 API URL을 사용하여 API 구현
- 메인 페이지 - Theme 카테고리 섹션
  - [x] /api/v1/themes API를 사용하여 Section 구현
  - [x] API는 Axios또는 React Query 등을 모두 활용해서 구현해도 ok
- 메인 페이지 - 실시간 급상승 선물랭킹 섹션
  - [x] /api/v1/ranking/products API를 사용하여 Section 구현 (Axios 사용 가능)
  - [x] 필터 조건을 선택 하면 해당 조건에 맞게 API를 요청하여 보여지게 하기
- Theme 페이지 - header
  - [x] url의 pathParams와 /api/v1/themes API를 사용하여 Section 구현
  - [x] themeKey가 잘못 된 경우 메인 페이지로 연결
- Theme 페이지 - 상품 목록 섹션
  - [x] /api/v1/themes/{themeKey}/products API를 사용하여 상품 목록 구현
  - [x] API 요청 시 한번에 20개의 상품 목록이 내려오도록 하기

### Step 2

- [x] 각 API에서 Loading 상태에 대한 UI 대응 하기
- [x] 데이터가 없는 경우에 대한 UI 대응 하기
- [x] Http Status에 따라 Error를 다르게 처리하기

### Step 3

스크롤을 내리면 추가로 데이터를 요청하여 보여지게 하기
1단계에서 구현한 API를 react-query를 사용해서 구현하기

### Step4

- 질문 1. CORS 에러는 무엇이고 언제 발생하는지 설명해주세요. 이를 해결할 수 있는 방법에 대해서도 설명해주세요.
  - CORS (Cross-Origin Resource Sharing): 웹 애플리케이션이 다른 출처(origin)에서 리소스를 요청할 때 발생할 수 있는 보안 메커니즘
  - 웹 브라우저는 기본적으로 스크립트에서 로드된 리소스가 해당 스크립트와 동일한 출처에서 온 것인지를 확인하며, 출처가 다를 경우 보안 상의 이유로 리소스 접근을 차단할 수 있음
  - CORS 에러 발생 조건
    - 다른 도메인, 프로토콜, 포트에서 리소스를 요청할 때
    - 서버 측에서 CORS 정책을 설정하지 않은 경우
  - 해결 방법
    1. 서버 측 CORS 설정
      - 서버에서는 CORS를 허용하도록 설정해야 함. 이는 서버의 HTTP 응답 헤더에 Access-Control-Allow-Origin 등의 CORS 관련 헤더를 포함하여 클라이언트 요청을 허용하는 방법
      - 예를 들어, 모든 origin에서의 요청을 허용하려면 Access-Control-Allow-Origin: * 헤더를 설정할 수 있음
    2. 프록시 서버 사용
      - 클라이언트와 서버 사이에 중개 역할을 하는 프록시 서버를 사용하여 CORS 정책을 우회할 수 있음
      - 예를 들어, 클라이언트에서 요청을 보내는 대신 프록시 서버에 요청을 보내고, 프록시 서버가 해당 요청을 대신 서버에 보내는 방식
    3. CORS 브라우저 확장 프로그램 사용
      - 개발 중인 경우, CORS 문제를 우회하기 위해 브라우저 확장 프로그램을 사용할 수 있음
      - 예를 들어, Chrome의 "Allow CORS: Access-Control-Allow-Origin" 등의 확장 프로그램을 사용할 수 있음
    4. 서버 측 API 호출 방법 변경
      - 서버에서 제공하는 API가 CORS를 허용하지 않는 경우, 서버 측 API 호출 방법을 변경하여 CORS 정책에 따라 요청을 보내야 할 수 있음
- 질문 2. 비동기 처리 방법인 callback, promise, async await에 대해 각각 장단점과 함께 설명해주세요.
  - Callback
    - 장점: 구현이 간단하고, 비동기 처리를 위한 기본적인 방법으로 사용 가능.
    - 단점: 콜백 헬(callback hell)이 발생할 수 있으며, 에러 처리가 번거로울 수 있고 가독성이 떨어질 수 있음.
  - Promise
    - 장점: 콜백 헬을 해결하고, 비동기 작업의 순차적 흐름을 보장함.
    - 단점: Promise 체이닝으로 인해 중첩된 로직이 복잡해질 수 있고, 예외 처리에 신경을 써야 함.
  - Async/Await:
    - 장점: 비동기 코드를 동기식으로 작성할 수 있어 가독성이 좋고, 에러 처리가 쉬움.
    - 단점: Promise를 기반으로 하기 때문에 Promise의 단점을 일부 상속받을 수 있음. 또한, 순차적인 실행을 보장하기 위해 추가적인 코드가 필요할 수 있음.
- 질문 3. react query의 주요 특징에 대해 설명하고, queryKey는 어떤 역할을 하는지 설명해주세요.
  - React Query의 주요 특징
    - 간편한 데이터 관리: 서버 데이터를 가져오고 캐시하며, 상태 관리를 자동으로 처리하는 데 중점을 둠
    - 자동 캐싱 및 리프레시 관리: 데이터 요청의 캐시를 자동으로 관리하고, 필요할 때 새로고침(refetch) 기능을 제공하여 최신 데이터를 유지
    - 인터셉터 및 갱신 정책: HTTP 요청의 인터셉터를 사용하여 데이터 변형 및 추가 로직을 구현할 수 있으며, 갱신 정책을 통해 데이터 캐싱 및 리프레시 동작을 세밀하게 조정할 수 있음
    - 타입스크립트 지원: 타입스크립트와의 완벽한 통합을 지원하여 타입 안정성을 보장
  - queryKey의 역할
    - queryKey는 React Query에서 각 쿼리를 고유하게 식별하는 데 사용되는 키
    - 배열 형태로 제공되며, 배열 요소들은 쿼리의 종류와 파라미터를 나타냄
    - 예를 들어, useQuery(['userData', userId], fetchUserData)에서 ['userData', userId]는 fetchUserData 함수가 호출될 때 마다 고유한 쿼리로 사용됨
    - queryKey를 기반으로 React Query는 각 쿼리의 데이터를 캐싱하고 관리하며, 같은 queryKey로 요청이 중복되면 캐시된 데이터를 반환
