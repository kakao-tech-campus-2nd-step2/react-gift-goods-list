# 🚀 1단계 - API 적용하기

## 🚀 Getting Started

- ✔️ Frontend에서 비동기 데이터를 처리하는 방법에 대해 고민
- ✔️ Axios 만을 사용해서 React에서 비동기 데이터를 구현
- ✔️ Suspense, Error Boundary를 사용하지 않고 fetch State를 관리

## 📝 STEP 1 기능 목록

- [ ] <b>첨부된 `oas.yaml` 파일을 토대로 Request, Response Type을 정의</b>

- [x] <b>React Query를 사용하지 말고 axios 를 사용해서 구현</b>

- [x] <b>첨부된 `oas.yaml` 파일과 목 API URL을 사용하여 API를 구현</b>

- <b>메인 페이지 - Theme 카테고리 섹션</b>
  - [x] /api/v1/themes API를 사용하여 Section을 구현
  - [x] API는 Axios또는 React Query 등을 모두 활용해서 구현해도 좋음
- <b>메인 페이지 - 실시간 급상승 선물랭킹 섹션</b>
  - [x] `/api/v1/ranking/products` API를 사용하여 Section을 구현 (Axios 사용 가능)
  - [x] 필터 조건을 선택 하면 해당 조건에 맞게 API를 요청하여 보여지게 할 것
- <b>Theme 페이지 - header</b>
  - [x] url의 pathParams와 `/api/v1/themes` API를 사용하여 Section을 구현
  - [x] `themeKey`가 잘못 된 경우 메인 페이지로 연결
- <b>Theme 페이지 - 상품 목록 섹션</b>
  - [x] `/api/v1/themes/{themeKey}/products` API를 사용하여 상품 목록을 구현
  - [x] API 요청 시 한번에 20개의 상품 목록이 내려오도록 구현

## 📝 STEP4 답변

- **질문 1. CORS 에러는 무엇이고 언제 발생하는지 설명해주세요. 이를 해결할 수 있는 방법에 대해서도 설명해주세요.**

  - **`CORS(**Cross-Origin Resource Sharing, 교차-출처 리소스 공유)`
    - 다른 출처의 리소스 공유에 대한 허용/비허용 정책
    - 웹 어플리케이션이 **다른 출처(도메인, 포트, 프로토콜)**에 있는 리소스를 요청하면 브라우저는 보안을 위해 이를 차단한다.
    - 웹 브라우저에는 사용자의 토큰, 쿠키 등 민감한 정보가 저장됨
      - CSRF 공격(사용자의 의지와 관계 없이 공격자가 의도한 요청을 실행하도록 유도)
      - XSS 공격(공격자가 상대방의 브라우저에 스크립트가 실행되도록 하여 악의적 코드 주입)
      - ...등으로 이러한 정보를 탈취하면 심각한 보안 문제가 발생할 수 있음
      - 이를 방지하기 위해 브라우저는 다른 출처의 서버 리소스를 공유하지 않는 보안 정책인 `SOP(Same-Origin Policy)`을 따르고, 이 기준에 맞추어 CORS 정책을 적용하지 않은 경우 브라우저는 `CORS 에러`를 발생시켜 접근을 차단함
    - 에러 해결 방법
      - 서버 : 서버에서 HTTP 응답 헤더에 `Access-Control-Allow-Origin` 을 포함하여 요청을 허용할 출처를 기재
      - 클라이언트 : 프록시 서버 사용하여 CORS 정책 우회
        - 웹 애플리케이션에서 리소스로의 요청을 프록시 서버에서 전달하도록 함
        - 웹 애플리케이션이 리소스와 동일한 출처에서 요청을 보내는 것 처럼 보이게 될 것임
        - `webpack-dev-server`, `http-proxy-middleware` 등으로 개발환경에서 프록시 적용 가능

- **질문 2. 비동기 처리 방법인 callback, promise, async await에 대해 각각 장단점과 함께 설명해주세요.**
  - **Callback:**
    - **장점**: 구현이 간단함. 오래된 JavaScript 버전에서도 사용 가능
    - **단점**: 콜백 지옥(callback hell) 발생. 에러 처리와 복잡한 제어 흐름을 다루기 어려움
  - **Promise:**
    - **장점**: 콜백 지옥을 해결. then, catch, finally의 사용 ⇒ 에러 처리가 용이하고 코드 가독성 향상됨
    - **단점**: **Callback**에 비해 느릴 수 있음. 호환성 문제. 프로미스 여러 개 사용할 경우 가독성 떨어짐(`.then().then().then()`…)
  - **Async/Await:**
    - **장점**: 비동기 코드를 동기식 코드처럼 작성 가능함 ⇒ 가독성 매우 높음. Promise보다 간결한 코드. 높은 호환성
    - **단점**: Promise에 비해 느릴 수 있음. async 함수 내에서만 사용 가능함
- **질문 3. react query의 주요 특징에 대해 설명하고, queryKey는 어떤 역할을 하는지 설명해주세요.**
  - **React Query의 특징:**
    1.  **React Query는 서버 상태 관리에 특화된 라이브러리**
        - **서버 상태와 클라이언트 상태를 분리**
          - **클라이언트 상태**: UI의 일시적 상태 관리 (예: 모달 창 열림/닫힘, 폼 입력 값 등).
          - **서버 상태**: 외부 서버에서 가져온 데이터 관리 (예: 사용자 프로필 데이터, 게시물 리스트 등).
    2.  **자동 캐싱 및 자동 리페칭**
        - **자동 캐싱**: 동일한 요청 시 캐시된 데이터 사용하여 불필요한 네트워크 요청을 줄임
        - **자동 리페칭**: 특정 조건(컴포넌트 마운트 시 또는 일정 시간 간격)마다 자동으로 데이터 리페칭(데이터의 최신성 유지)
    3.  **복잡한 비동기 로직의 간소화**
        - 미들웨어 없이 **훅(`useQuery`, `useMutation`)**으로 비동기 데이터 페칭과 변이 작업 간단하게 처리 가능
    4.  **옵티미스틱 업데이트와 실시간 데이터 처리**
        - 옵티미스틱 업데이트를 통해 빠른 사용자 피드백 제공.
        - 폴링, 웹소켓 등 실시간 데이터 관리 기능
    5.  **개발자 도구 지원**
        - React Query DevTools를 통해 쿼리 상태, 캐시된 데이터, 리페칭 상태 확인 및 디버깅 가능
    6.  **커뮤니티와 생태계의 성장**
        - 많은 개발자 채택으로 리소스, 예제, 플러그인 활용 가능.
  - **queryKey의 역할:**
    - React Query는 `queryKey` 기반으로 쿼리 캐싱을 관리
      - (= `queryKey`를 캐시 식별자로 사용함)
      - 문자열 / 문자열의 배열 / 중첩된 객체(nested object)로 지정 가능
    - 쿼리의 의존성에 변화가 생기는 경우 `queryKey`를 통해 해당 데이터를 갱신 가능
