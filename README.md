## 3주차 질문

### 1. CORS 에러는 무엇이고 언제 발생하는지 설명해주세요. 이를 해결할 수 있는 방법에 대해서도 설명해주세요.

CORS(Cross Origin Resource Sharing)는 교차-출처 리소스 공유로 말할 수 있는데 서로 다른 도메인간에 자원을 공유하는 것을 의미하는데 기본적으로 브라우저는 차단되어있다.
URL 구조에는 출처인 protocal, host, 포트번호가 있는데 이 출처를 비교하는 로직이 서버에서 구현되는 것이 아니라 브라우저단에서 이루어져서 cors 정책을 위반하는 리소스를 요청해도 일단 정상적으로 응답하고 브라우저가 이 응답을 분석해서 CORS 위반이라고 생각하면 응답을 버리게되면서 발생!

- 클라이언트에서 해결
  가장 간단한 방법은 Proxy 패턴을 이용해서 클라이언트 웹 페이지에서 직접 하는 것이 아니라 페이지에서 클라이언트 서버로 보내고 여기서 다시 백엔드 서버로 요청을 보내도록 한다. 서버끼리 통신할때는 CORS 정책이 적용되지 않기 때문!

- 서버에서 해결

1. @CrossOrigin 어노테이션 사용하기
2. CorsFilter 사용하기

### 2. 비동기 처리 방법인 callback, promise, async await에 대해 각각 장단점과 함께 설명해주세요.

- Callback
  다른 함수가 실행을 끝낸 뒤 실행(call back)되는 함수(나중에 호출되는 함수)를 말한다.
  장점 : 자바스크립트는 싱글스레드를 사용하는데 멈춤을 방지해준다.
  단점 : 에러/예외처리 어려움, 중첩으로 인한 복잡도 증가

- Promise
  싱글스레드인 자바스크립트에서 비동기 처리를 위해 사용한 callback 함수의 단점을 해결하기 위해 프로미스 객체를 언어적 차원으로 지원
  장점 : 콜백함수에 비해 가독성이 좋고 비동기 처리를 동기적으로 보이게하며 순서파악에 용이
  단점 : 콜백지옥과 같은 맥락으로 then을 연쇄적으로 호출하면 코드가 복잡해지고 가독성이 떨어진다.

  - Async & await
    기존의 비동기 처리방식인 콜백함수의 단점을 보완하기위한 프로미스의 단점을 해결하기위한 최신 문법
    장점 : 동기코드처럼 보이게 작성해 가독성을 높일 수 있고 사용 방법이 굉장히 간단하다.

### 3. react query의 주요 특징에 대해 설명하고, queryKey는 어떤 역할을 하는지 설명해주세요.

React Query는 데이터 Fetching, 동기화, 서버 데이터 업데이트 등을쉽게 도와주는 라이브러리
특징은 동일한 데이터에 대한 중복 요청 제거, 오래된 데이터 상태파악 후 updating을 지원, 리액트 훅과 유사한 인터페이스 제공 등이 있다.
queryKey는 useQuery마다 부여되는 고유한 키 값
문자열로 사용되기도하고 배열의 형태로 사용될 수도 있으며 이것을 통해 다른 곳에서도 해당 쿼리의 결과를 꺼내올 수 있다.

# 요구사항

## Step1

- 첨부된 oas.yaml 파일을 토대로 Request, Response Type을 정의
- React Query를 사용하지 말고 axiou를 사용해서 구현
- 첨부된 oas.yaml 파일과 목 API URL을 사용하여 API를 구현

### 메인 페이지 - Themes 카테고리 섹션

- /api/vi/thmes API를 사용하여 Section을 구현
- API는 Axios 또는 React Query 등을 모두 활용해서 구현해도 가능

### 메인 페이지 - 실시간 급상승 선물생킹 섹션

- /api/v1/ranking/products API를 사용하여 Section을 구현
- 필터 조건을 선택하면 해당 조건에 맞게 API를 요청하여 보여지게 하기

### Theme 페이지 - header

- url의 pathParams와 /api/v1/themes API를 사용하여 Section을 구현
- themeKey 가 잘못 된 경우 메인 페이지로 연결

### Theme 페이지 - 상품 목록 섹션

- /api/v1/themes/{themeKey}/products API를 사용하여 상품 목록을 구현
- API 요청 시 한번에 20개의 상품 목록이 내려오도록

---

## Step2

- 각API에서 Loading 상태에 대한 UI 대응
- 데이터가 없는 경우에 대한 UI 대응
- Http Status 에 따라 Error를 다르게 처리

---

## step3

- 스크롤을 내리면 추가로 데이터를 요청하여 보여지게 하기
- 1단계에서 구현한 API를 react-query를 사용해서 구현
