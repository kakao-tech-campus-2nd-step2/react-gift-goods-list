<h1> 카카테크 캠퍼스 - 프론트엔드 카카오 선물하기 편</h1>

<h3> 🚀 Getting Started</h3>

✔️ Frontend에서 비동기 데이터를 처리하는 방법에 대해 고민해요.

✔️ Axios 만을 사용해서 React에서 비동기 데이터를 구현해요.

✔️ Suspense, Error Boundary를 사용하지 않고 fetch State를 관리해봐요.

https://kakao-tech-week3-goods-list.pages.dev/

<h3>📝 STEP 1 요구사항</h3>

- [x] 첨부된 oas.yaml 파일을 토대로 Request, Response Type을 정의해요.

- [x] React Query를 사용하지 말고 axios 를 사용해서 구현해요.

- [x] 첨부된 oas.yaml 파일과 목 API URL을 사용하여 API를 구현해요.

- 메인 페이지 - Theme 카테고리 섹션

  - [x] `/api/v1/themes` API를 사용하여 Section을 구현해요.

  - [x] API는 Axios또는 React Query 등을 모두 활용해서 구현해도 좋아요.

- 메인 페이지 - 실시간 급상승 선물랭킹 섹션

  - [x] `/api/v1/ranking/products` API를 사용하여 Section을 구현해요. (Axios 사용 가능)

  - [x] 필터 조건을 선택 하면 해당 조건에 맞게 API를 요청하여 보여지게 해요.

- Theme 페이지 - header

  - [x] url의 `pathParams`와 `/api/v1/themes` API를 사용하여 Section을 구현해요.

  - [x] themeKey가 잘못 된 경우 메인 페이지로 연결해요.

- Theme 페이지 - 상품 목록 섹션

  - [x] `/api/v1/themes/{themeKey}/products` API를 사용하여 상품 목록을 구현해요.

  - [x] API 요청 시 한번에 20개의 상품 목록이 내려오도록 해요.

<h3>📝 STEP 2 요구사항</h3>

- [x] 각 API에서 Loading 상태에 대한 UI 대응하기

- [x] 데이터가 없는 경우에 대한 UI 대응하기

- [x] Http Status 에 따라 Error를 다르게 처리해요.

<h3>📝 STEP 3 요구사항</h3>

- [x] 스크롤을 내리면 추가로 데이터를 요청하게 보여지게 해요.

- [x] 1단계에서 구현한 API를 react-query 를 사용해서 구현해봐요.

  - [x] 실시간 선물랭킹 섹션

  - [x] 테마 페이지 굿즈 리스트 섹션

  - [x] 테마 카테고리 섹션

  - [x] 테마 헤더 섹션

<h3>📝 STEP 4 요구사항</h3>

- [x] 아래 질문에 대한 답변을 README에 추가하여 과제 제출을 해요.

  - [x] CORS 에러는 무엇이고 언제 발생하는 지 설명해주세요. 이를 해결할 수 있는 방법에 대해서도 설명해주세요.

    답변 : CORS 는 Cross-Origin-Resource-Sharing 의 약자이며, 웹 브라우저가 보안상의 이유로 다른 도메인에서 리소스를 요청할 때 발생하는 문제입니다. 보통, 다른 도메인으로의 요청을 보낼 때 발생합니다. 해결할 수 있는 방법으로는 서버에서 Access-Control-Allow-Origin 헤더를 설정하여 특정 도메인 또는 모든 도메인에서 리소스를 요청할 수 있도록 허용하는 방법을 사용하거나, 프록시 서버를 중간에 두어 클라이언트와 서버 사이에서 요청과 응답을 전달하는 방법이 있습니다.

  - [x] 비동기 처리 방법인 callback, promise, async await 에 대해 각각 장단점과 함께 설명해주세요.

    답변 :

    callback 함수는 어떤 함수가 완료된 후 호출되는 함수로 직관적으로 이해하기 쉽습니다. 하지만, 중첩된 콜백 함수가 많아지면 콜백 지옥 (가독성이 떨어짐) 에 빠질 수 있습니다.

    promise 객체는 체이닝 기법으로 then, catch 메서드를 이용하여 비동기 작업을 체이닝할 수 있고, 가독성이 좋아집니다. 단점으로는 디버깅이 어렵다는 점입니다.

    Async/Await 의 장점으로는 에러 처리를 try/catch 을 사용하여 에러 처리가 간편하다는 점입니다. 단점으로는 구 환경에서는 지원하지 않을 수 있다는 점이고, 내부적으로는 Promise 를 여전히 사용해, Promise 에 대한 이해가 필요합니다.

  - [x] react query의 주요 특징에 대해 설명하고, queryKey 는 어떤 역할을 하는 지 설명해주세요.

    답변 : react query 는 비동기 데이터를 효과적으로 관리할 수 있는 라이브러리입니다. 서버 상태와 클라이언트 상태를 모두 관리하는 Redux 라이브러리와 다르게, React query 는 서버에서 가져온 데이터 및 상태를 전문적으로 처리하는 라이브러리로, 서버 상태를 더 효율적으로 관리할 수 있게 해줍니다. react query 에서 queryKey 인자에는 문자열 또는 배열로 지정할 수 있는데, queryKey 를 기반으로 데이터 캐싱을 관리하며, query 가 변수에 의존하는 경우에는 해당 변수를 추가해주어야 합니다. 이번 과제에서는 대표적으로 filterOption 이 있었습니다. filterOption 에 의존하여, 이 값이 변경될 때마다 쿼리가 다시 실행됩니다.
